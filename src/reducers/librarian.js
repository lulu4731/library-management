import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import * as types from '../contains/type'
import { toastError, toastSuccess } from "../toast/toast";
import { updateReaders } from "./readers";
import { renewalBook } from "./borrow";
import store from "../store";

export const checkLogin = createAsyncThunk('librarian/check', async () => {
    try {
        if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[types.LOCAL_STORAGE_TOKEN_NAME])
        }
        const response = await axios.get(
            "http://localhost:8000/api/v0/librarian/information"
        )
        if (response.status === 200) {
            return { ...response.data, isAuthenticated: true }
        }
    } catch (error) {
        localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        if (error.response.data) return { ...error.response.data, isAuthenticated: false }
        else return { message: error.message }
    }
})

export const loadLibrarian = createAsyncThunk(
    "librarian/loadLibrarian",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/librarian`
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

export const searchLibrarian = createAsyncThunk(
    "librarian/searchLibrarian",
    async (keyword) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/librarian/search?k=${keyword}`
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

export const updateLibrarianStatus = createAsyncThunk(
    "librarian/updateLibrarianStatus",
    async (id_librarian) => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/v0/librarian/${id_librarian}`
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

export const addLibrarian = createAsyncThunk(
    "librarian/addLibrarian",
    async (librarian) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/librarian`, librarian
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

export const updateLibrarian = createAsyncThunk(
    "librarian/updateLibrarian",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/librarian/${data.id_librarian}`, data.librarian
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

// export const deleteReaders = createAsyncThunk(
//     "readers/deleteReaders",
//     async (id_readers) => {
//         try {
//             const response = await axios.delete(
//                 `http://localhost:8000/api/v0/readers/${id_readers}`
//             )
//             if (response.status === 200) {
//                 return await { ...response.data, status: response.status, id_readers: id_readers }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )

const librarian = createSlice({
    name: 'librarian',
    initialState: {
        librarian: {
            borrow: []
        },
        isAuthenticated: false,
        librarians: []
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
            .addCase(searchLibrarian.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.librarians = action.payload.data
                }
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.librarian = action.payload.data
                state.isAuthenticated = action.payload.isAuthenticated
            })
            .addCase(addLibrarian.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.librarians.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateLibrarianStatus.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.librarians = state.librarians.map((item) =>
                        item.id_librarian === action.payload.data.id_librarian
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateLibrarian.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.librarians = state.librarians.map((item) =>
                        item.id_librarian === action.payload.data.id_librarian
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateReaders.fulfilled, (state, action) => {
                // console.log(store.getState().librarianReducer)
                if (action.payload.status === 200) {
                    // console.log(action.payload.data)
                    state.librarian = { ...state.librarian, ...action.payload.data }
                    state.librarian.borrow = state.librarian.borrow.map(item => (
                        {
                            ...item,
                            reader: JSON.stringify({
                                value: action.payload.data.id_readers,
                                label: action.payload.data.first_name + " " + action.payload.data.last_name + '(' + action.payload.data.email + ')'
                            })
                        }
                    ))


                    // toastSuccess(action.payload.message)
                } else {
                    // toastError(action.payload.message)
                }
            })
            .addCase(renewalBook.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // console.log(state.borrows)
                    state.librarian.borrow = state.librarian.borrow.map((item) => {
                        // console.log(item)
                        if (item.id_borrow === action.payload.id_borrow) {
                            let temps = JSON.parse(item.books)
                            let books = temps.map((item) =>
                                item.id_book === action.payload.data.id_book
                                    ? action.payload.data
                                    : item
                            )
                            item.books = JSON.stringify(books)
                            return item
                        } else {
                            return item
                        }
                    })
                    // toastSuccess(action.payload.message)
                } else {
                    // toastError(action.payload.message)
                }
            })
    }
})

const librarianReducer = librarian.reducer

export const librarianSelector = (state) => state.librarianReducer.librarian
export const librariansSelector = (state) => state.librarianReducer.librarians
export const isAuthenticatedSelector = (state) => state.librarianReducer.isAuthenticated
export const { setSignIn, setLogout } = librarian.actions

export default librarianReducer