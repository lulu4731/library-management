import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadReaders = createAsyncThunk(
    "readers/loadFReaders",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/readers`
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

export const addReaders = createAsyncThunk(
    "readers/addReaders",
    async (reader) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/readers`, reader
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

export const updateReaders = createAsyncThunk(
    "readers/updateReaders",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/readers/${data.id_readers}`, data.reader
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

export const deleteReaders = createAsyncThunk(
    "readers/deleteReaders",
    async (id_readers) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v0/readers/${id_readers}`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_readers: id_readers }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)
const readers = createSlice({
    name: 'readers',
    initialState: {
        readers: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadReaders.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.readers = action.payload.data
                }
            })
            .addCase(addReaders.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.readers.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateReaders.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.readers = state.readers.map((item) =>
                        item.id_readers === action.payload.data.id_readers
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteReaders.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.readers = state.readers.filter(item => item.id_readers !== action.payload.id_readers)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const readersReducer = readers.reducer


export const readersSelector = (state) => state.readersReducer.readers


export default readersReducer