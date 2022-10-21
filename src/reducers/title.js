import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadTitle = createAsyncThunk(
    "title/loadTitle",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/ds`
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

export const addTitle = createAsyncThunk(
    "title/addTitle",
    async (title) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/ds`, title
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

export const updateTitle = createAsyncThunk(
    "title/updateTitle",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/ds/${data.isbn}`, data.ds
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

export const deleteTitle = createAsyncThunk(
    "title/deleteTitle",
    async (isbn) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v0/ds/${isbn}`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, isbn }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const addLoveTitle = createAsyncThunk(
    "title/addLoveTitle",
    async (isbn) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/love/${isbn}`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, isbn }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const deleteLoveTitle = createAsyncThunk(
    "title/deleteLoveTitle",
    async (isbn) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v0/love/${isbn}`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, isbn }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

const titles = createSlice({
    name: 'title',
    initialState: {
        titles: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = action.payload.data
                }
            })
            .addCase(addTitle.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.titles.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = state.titles.map((item) =>
                        item.isbn === action.payload.data.isbn
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = state.titles.filter(item => item.isbn !== action.payload.isbn)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addLoveTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = state.titles.map((item) =>
                        item.isbn === action.payload.isbn
                            ? { ...item, love_status: true }
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteLoveTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = state.titles.map((item) =>
                        item.isbn === action.payload.isbn
                            ? { ...item, love_status: false }
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const titlesReducer = titles.reducer


export const titlesSelector = (state) => state.titlesReducer.titles


export default titlesReducer