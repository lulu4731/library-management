import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import * as types from '../contains/type'
import { toastError, toastSuccess } from "../toast/toast";

export const loadFeedback = createAsyncThunk(
    "feedback/loadFeedback",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/feedback/all`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

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

export const updateStatusFeedback = createAsyncThunk(
    "feedback/updateStatusFeedback",
    async (id_feedback) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/feedback/${id_feedback}/read`, feedback
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_feedback }
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
        feedback: []
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
            .addCase(loadFeedback.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.feedback = action.payload.data
                }
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateStatusFeedback.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.feedback = state.feedback.map(item => {
                        if (item.id_feedback === action.payload.id_feedback) {
                            item.status = 1
                            return item
                        }
                        return item
                    })
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const feedbackReducer = feedback.reducer

export const feedbackSelector = (state) => state.feedbackReducer.feedback

export default feedbackReducer