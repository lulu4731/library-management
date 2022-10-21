import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import * as types from '../contains/type'
import { toastError, toastSuccess } from "../toast/toast";

export const addFeedback = createAsyncThunk(
    "feedback/addFeedback",
    async (feedback) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/feedback`, feedback
            )
            if (response.status === 201) {
                return await { ...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const feedback = createSlice({
    name: 'feedback',
    initialState: {
    },
    reducers: {
        setSignIn(state) {
            state.isAuthenticated = true
        },
        setLogout(state) {
            localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            state.librarian = {}
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFeedback.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    toastSuccess(action.payload.message)
                }
            })
    }
})

const feedbackReducer = feedback.reducer

export default feedbackReducer