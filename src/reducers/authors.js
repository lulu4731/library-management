import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadAuthors = createAsyncThunk(
    "authors/loadAuthors",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/author`
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

export const addAuthors = createAsyncThunk(
    "authors/addAuthors",
    async (author) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/author`, author
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

export const updateAuthors = createAsyncThunk(
    "authors/updateAuthors",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/author/${data.id_author}`, data.author
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
const authors = createSlice({
    name: 'authors',
    initialState: {
        authors: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAuthors.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.authors = action.payload.data
                }
            })
            .addCase(addAuthors.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.authors.unshift(action.payload.data)
                }
            })
            .addCase(updateAuthors.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.authors = state.authors.map((item) =>
                        item.id_author === action.payload.data.id_author
                            ? action.payload.data
                            : item
                    )
                }
            })

    }
})

const authorsReducer = authors.reducer


export const authorsSelector = (state) => state.authorsReducer.authors


export default authorsReducer