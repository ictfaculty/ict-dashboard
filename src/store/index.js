import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { newsSlice } from "./features/news/newsSlice";
import { adsSlice } from "./features/ads/adsSlice";
import { studentsSlice } from "./features/students/studentsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        news: newsSlice.reducer,
        ads: adsSlice.reducer,
        students: studentsSlice.reducer,
    }
})