import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    newsList: []
}

const api = 'http://77.95.1.235:8585'

//getNews
export const getNews = createAsyncThunk(
    "news/getNews",
    async () => {
        try {
            const response = await axios.get(`${api}/news`)
            const data = response.data.data
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

//addNews
export const addNews = createAsyncThunk(
    "news/addNews",
    async (news, { dispatch }) => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const headers = {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            };
            const response = await axios.post(`${api}/news`, news, { headers });
            dispatch(getNews());
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
)

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: ({

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

export const { } = newsSlice.actions



