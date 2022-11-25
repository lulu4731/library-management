import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadNotification = createAsyncThunk(
    "notifications/loadNotification",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/notification/list`
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
export const changeStatusNotification = createAsyncThunk(
    "notifications/changeStatusNotification",
    async (id_notification) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/notification/${id_notification}/read`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_notification }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const readAllNotification = createAsyncThunk(
    "notifications/readAllNotification",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/notification/read_all`
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

const notifications = createSlice({
    name: 'notifications',
    initialState: {
        notifications: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadNotification.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.notifications = action.payload.data
                }
            })
            .addCase(changeStatusNotification.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.notifications = state.notifications.filter((item) =>
                        item.id_notification !== action.payload.id_notification
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(readAllNotification.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.notifications = []
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const notificationsReducer = notifications.reducer


export const notificationsSelector = (state) => state.notificationsReducer.notifications

export default notificationsReducer