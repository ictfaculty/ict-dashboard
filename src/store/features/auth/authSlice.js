import { createSlice } from "@reduxjs/toolkit"

const api = 'http://192.168.43.145:8080'

// const isAuthed = Boolean(localStorage.getItem('accessToken'))

const initialState = {
    isAuth: false,
    loading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: ({
        changeLoading: (state, { payload }) => {
            state.loading = payload
        },
        setIsAuth: (state, { payload }) => {
            state.isAuth = payload
        },
        setMessage: (state, { payload }) => {
            state.message = payload
        }
    })
})

export const { changeLoading, setIsAuth, setMessage } = authSlice.actions

export const handleLogin = (bodyJson, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(changeLoading(true))
            // const bodyJson = {
            //     email: 'eve.holt@reqres.in',
            //     password: 'cityslicka',
            // }

            const response = await fetch(api + '/auth/login', {
                method: 'POST',
                body: JSON.stringify(bodyJson),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseJson = await response.json();
            if (response.ok) {
                // If authentication is successful
                localStorage.setItem("accessToken", responseJson.data.access_token);
                dispatch(setIsAuth(true));
                navigate("/dashboard");
            } else {
                console.log(responseJson.message)
                dispatch(setMessage(responseJson.message))
                // If authentication fails
                localStorage.removeItem("accessToken");
                dispatch(setIsAuth(false));
                navigate("/login");
            }

            dispatch(changeLoading(false));
            console.log(responseJson);
        } catch (e) {
            dispatch(changeLoading(false))
            console.log(e)
        }
    }
}