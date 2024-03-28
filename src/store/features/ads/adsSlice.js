import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    adsList: [],
    adsObj: {}
}

const api = 'http://77.95.1.235:8585'

function refreshToken(navigate) {
    async (dispatch) => {
        try {
            const refresh = localStorage.getItem("refreshToken")
            const headers = {
                "Content-Type": "multipart/application/json"
            };
            const response = await axios.post(`${api}/auth/refresh`,
                { token: refresh }
            )
            if (response.status == '200') {
                dispatch(getAds())
            } else {
                navigate("/login")
            }

        } catch (error) {
            console.error(error);
        }
    }
}

//getAds
export const getAds = createAsyncThunk(
    "ads/getAds",
    async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };
            const response = await axios.get(`${api}/ads`, { headers })
            const data = response.data.data
            if (response.status == '401') {
                refreshToken()
            }

            return data
        } catch (error) {
            console.error(error);
        }
    }
)

//addAds
export const addAds = createAsyncThunk(
    "ads/addAds",
    async (ads, { dispatch }) => {
        try {
            // console.log(import.meta.url.VITE_BASE_URL);
            const accessToken = localStorage.getItem("accessToken")
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };
            const response = await axios.post(`${api}/ads`, ads, { headers });
            dispatch(getAds());
            if (response.status == '401') {
                refreshToken()
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

//deleteAds
export const deleteAds = createAsyncThunk(
    "news/deleteNews",
    async (adsId, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
            };
            const response = await axios.delete(`${api}/ads/${adsId}`, { headers });
            dispatch(getAds()); // Refresh news list after deletion
            if (response.status === 401) {
                refreshToken();
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

//editAds
export const editAds = createAsyncThunk(
    "news/editAds",
    async ({ data, id }, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
            };
            const response = await axios.put(`${api}/ads/${id}`, data, { headers });
            dispatch(getNews());
            if (response.status === 401) {
                refreshToken();
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: ({
        setCurrentAds: (state, action) => {
            state.adsObj = action.payload;
        },
    }),
    extraReducers: (builder) => {
        // getProducts
        builder.addCase(getAds.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAds.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adsList = action.payload
        });
        builder.addCase(getAds.rejected, (state) => {
            state.isLoading = false;
        });

    },
})

export const { setCurrentAds } = adsSlice.actions