import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadReceipt = createAsyncThunk(
    "receipt/loadReceipt",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/receipt`
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

export const searchReceipt = createAsyncThunk(
    "receipt/searchReceipt",
    async (keyword) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/receipt/search?k=${keyword}`
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

export const addReceipt = createAsyncThunk(
    "receipt/addReceipt",
    async (receipt) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/receipt`, { data: receipt }
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

export const updateReceipt = createAsyncThunk(
    "receipt/updateReceipt",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/receipt/${data.id_receipt}`, data
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
const receipts = createSlice({
    name: 'receipt',
    initialState: {
        receipts: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(searchReceipt.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.receipts = action.payload.data
                }
            })
            .addCase(addReceipt.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.receipts.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateReceipt.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.receipts = state.receipts.map((item) =>
                        item.id_receipt === action.payload.data.id_receipt
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const receiptsReducer = receipts.reducer


export const receiptsSelector = (state) => state.receiptsReducer.receipts


export default receiptsReducer