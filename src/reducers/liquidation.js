import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadLiquidations = createAsyncThunk(
    "liquidations/loadLiquidations",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/liquidation`
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

export const loadBookLiquidations = createAsyncThunk(
    "liquidations/loadBookLiquidations",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/liquidation/book`
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

export const addLiquidations = createAsyncThunk(
    "liquidations/addLiquidations",
    async (liquidation) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/liquidation`, liquidation
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

export const updateLiquidations = createAsyncThunk(
    "liquidations/updateLiquidations",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/liquidation/${data.id_liquidation}`, { books: data.books }
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
const liquidations = createSlice({
    name: 'liquidations',
    initialState: {
        liquidations: [],
        bookLiquidation: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadLiquidations.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.liquidations = action.payload.data
                }
            })
            .addCase(loadBookLiquidations.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.bookLiquidation = action.payload.data
                }
            })
            .addCase(addLiquidations.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.liquidations.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateLiquidations.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.liquidations = state.liquidations.map((item) =>
                        item.id_liquidation === action.payload.data.id_liquidation
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

const liquidationsReducer = liquidations.reducer


export const liquidationsSelector = (state) => state.liquidationsReducer.liquidations
export const bookLiquidationsSelector = (state) => state.liquidationsReducer.bookLiquidation


export default liquidationsReducer