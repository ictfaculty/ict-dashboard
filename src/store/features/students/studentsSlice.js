import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { func } from "prop-types"


const initialState = {
    isLoading: false,
    studentsList: [],
    subjectsList: [],
}

const api = 'http://localhost:3000/students'
const apiSubject = 'http://localhost:3000/subjects'

//getStudents
export const getStudents = createAsyncThunk(
    "students/getStudents",
    async () => {
        try {
            // const accessToken = localStorage.getItem("accessToken")
            // const headers = {
            //     "Authorization": `Bearer ${accessToken}`,
            //     "Content-Type": "multipart/form-data"
            // };
            // const response = await axios.get(`${api}/news`, { headers })
            const response = await axios.get(api)
            // console.log(response.data);
            const data = response
            // if (response.status == '401') {
            //     refreshToken()
            // }
            return data
        } catch (error) {
            console.error(error);
        }
    }
)

//getSubjects
export const getSubjects = createAsyncThunk(
    "students/getSubjects",
    async () => {
        try {
            
            const response = await axios.get(apiSubject)
            const data = response
            
            return data
        } catch (error) {
            console.error(error);
        }
    }
)






export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: ({
        setCurrentNews: (state, action) => {
            state.newsObj = action.payload;
        },
    }),
    extraReducers: (builder) => {
        // getProducts
        builder.addCase(getStudents.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getStudents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.studentsList = action.payload.data
        });
        builder.addCase(getStudents.rejected, (state) => {
            state.isLoading = false;
        });

        // getSubjects
        builder.addCase(getSubjects.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getSubjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.subjectsList = action.payload.data
        });
        builder.addCase(getSubjects.rejected, (state) => {
            state.isLoading = false;
        });

    },
})

export const { setCurrentNews } = studentsSlice.actions



