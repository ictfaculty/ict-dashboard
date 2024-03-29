import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { newsSlice } from "./features/news/newsSlice";
import { adsSlice } from "./features/ads/adsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        news: newsSlice.reducer,
        ads: adsSlice.reducer,
    }
})