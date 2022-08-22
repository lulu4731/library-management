import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadBooks = createAsyncThunk(
    "books/loadBooks",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/book`
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

export const updateBooks = createAsyncThunk(
    "books/updateBooks",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book/${data.id_book}`, { position: data.position }
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

const books = createSlice({
    name: 'books',
    initialState: {
        books: [],
        toggle: false,
        hovered: 1
    },
    reducers: {
        setToggle(state) {
            state.toggle = !state.toggle
        },
        setHovered(state, action) {
            state.hovered = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadBooks.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.books = action.payload.data
                }
            })
            .addCase(updateBooks.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.books = state.books.map((item) =>
                        item.id_book === action.payload.data.id_book
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

const booksReducer = books.reducer


export const booksSelector = (state) => state.booksReducer.books
export const toggleSelector = state => state.booksReducer.toggle
export const hoveredSelector = state => state.booksReducer.hovered
export const { setToggle, setHovered } = books.actions


export default booksReducer