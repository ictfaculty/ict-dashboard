import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    newsList: []
}

const api = 'http://192.168.43.145:8080'

//getNews
export const getNews = createAsyncThunk(
    "news/getNews",
    async () =>{
        try {
            const data = await axios.get(`${api}/news`)
            return data
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

export const {} = newsSlice.actions



