import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { func } from "prop-types"


const initialState = {
    isLoading: false,
    newsList: [],
    newsObj: {},
}

const api = 'http://77.95.1.235:8585'

//getNews
export const getNews = createAsyncThunk(
    "news/getNews",
    async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };
            const response = await axios.get(`${api}/news`, { headers })
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
                dispatch(getNews())
            } else {
                navigate("/login")
            }

        } catch (error) {
            console.error(error);
        }
    }
}


//addNews
export const addNews = createAsyncThunk(
    "news/addNews",
    async (news, { dispatch }) => {
        try {
            // console.log(import.meta.url.VITE_BASE_URL);
            const accessToken = localStorage.getItem("accessToken")
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };
            const response = await axios.post(`${api}/news`, news, { headers });
            dispatch(getNews());
            if (response.status == '401') {
                refreshToken()
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

//deleteNews
export const deleteNews = createAsyncThunk(
    "news/deleteNews",
    async (newsId, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
            };
            const response = await axios.delete(`${api}/news/${newsId}`, { headers });
            dispatch(getNews()); // Refresh news list after deletion
            if (response.status === 401) {
                refreshToken();
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

//changeActive-status
export const changeActivity = createAsyncThunk(
    "news/changeActivity",
    async (newsId, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
            };
            const response = await axios.put(`${api}/news/change-activity/${newsId}`, {}, { headers });
            dispatch(getNews()); // Refresh news list after deletion
            if (response.status === 401) {
                refreshToken();
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

//editNews
export const editNews = createAsyncThunk(
    "news/editNews",
    async ({ formData, id }, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                // "Content-Type": "multipart/form-data" // This is usually not needed as the browser will set it with the correct boundary
            };
            const response = await axios.put(`${api}/news/${id}`, formData, { headers });
            dispatch(getNews()); // Refresh news list after updating
            if (response.status === 401) {
                refreshToken();
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);


export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: ({
        setCurrentNews: (state, action) => {
            state.newsObj = action.payload;
        },
    }),
    extraReducers: (builder) => {
        // getProducts
        builder.addCase(getNews.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getNews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newsList = action.payload
        });
        builder.addCase(getNews.rejected, (state) => {
            state.isLoading = false;
        });

    },
})

export const { setCurrentNews } = newsSlice.actions



