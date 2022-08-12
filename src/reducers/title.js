import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

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
                }
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.titles = state.titles.map((item) =>
                        item.isbn === action.payload.data.isbn
                            ? action.payload.data
                            : item
                    )
                }
            })

    }
})

const titlesReducer = titles.reducer


export const titlesSelector = (state) => state.titlesReducer.titles


export default titlesReducer