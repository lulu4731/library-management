import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadBorrows = createAsyncThunk(
    "borrows/loadBorrows",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/book_borrow`
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

export const searchBorrows = createAsyncThunk(
    "borrows/searchBorrows",
    async (data) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/book_borrow/search?k=${data.keyword}&c=${data.status}`
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

export const loadDsBorrows = createAsyncThunk(
    "borrows/loadDsBorrows",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/book_borrow/ds`
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

export const addBorrows = createAsyncThunk(
    "borrows/addBorrows",
    async (borrow) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/book_borrow`, borrow
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

export const updateBorrows = createAsyncThunk(
    "borrows/updateBorrows",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/${borrow.id_borrow}`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const returnBook = createAsyncThunk(
    "borrows/returnBook",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/return-book`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const lostBook = createAsyncThunk(
    "borrows/lostBook",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/lost-book`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const returnBookAll = createAsyncThunk(
    "borrows/returnBookAll",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/return-book/all`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const renewalBook = createAsyncThunk(
    "borrows/renewalBook",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/renewal`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const pendingBook = createAsyncThunk(
    "borrows/pendingBook",
    async (borrow) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/book_borrow/pending`, borrow
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_borrow: borrow.id_borrow }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

// export const addBorrowsReader = createAsyncThunk(
//     "borrows/addBorrowsReader",
//     async (borrow) => {
//         try {
//             const response = await axios.post(
//                 `http://localhost:8000/api/v0/book_borrow/reader`, borrow
//             )
//             if (response.status === 201) {
//                 return await { ...response.data, status: response.status }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )

const borrows = createSlice({
    name: 'borrows',
    initialState: {
        borrows: [],
        dsBorrow: [],
        borrowsReaders: []
    },
    reducers: {
        setDsBorrow(state, action) {
            state.dsBorrow = state.dsBorrow.filter((item) => item.value !== action.payload)
        },
        setDsPay(state, action) {
            state.dsBorrow.unshift(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBorrows.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.borrows = action.payload.data
                }
            })
            .addCase(loadDsBorrows.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.dsBorrow = action.payload.data
                }
            })
            .addCase(addBorrows.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.borrows.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            // .addCase(addBorrowsReader.fulfilled, (state, action) => {
            //     if (action.payload.status === 201) {
            //         state.borrowsReaders.unshift(action.payload.data)
            //         toastSuccess(action.payload.message)
            //     } else {
            //         toastError(action.payload.message)
            //         // console.log(action.payload.data)
            //     }
            // })
            .addCase(returnBook.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // console.log(state.borrows)
                    state.borrows = state.borrows.map((item) => {
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
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(lostBook.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // console.log(state.borrows)
                    state.borrows = state.borrows.map((item) => {
                        // console.log(item)
                        if (item.id_borrow === action.payload.id_borrow) {
                            let temps = JSON.parse(item.books)
                            let books = temps.map((item) =>
                                item.id_book === action.payload.data.id_book
                                    ? action.payload.data
                                    : item
                            )
                            item.books = JSON.stringify(books)
                            item.total_price_lost = action.payload.total_price_lost
                            return item
                        } else {
                            return item
                        }
                    })
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(returnBookAll.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // console.log(state.borrows)
                    state.borrows = state.borrows.map((item) => {
                        // console.log(item)
                        if (item.id_borrow === action.payload.id_borrow) {
                            item.books = action.payload.data
                            return item
                        } else {
                            return item
                        }
                    })
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(pendingBook.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.borrows = state.borrows.map((item) => {
                        if (item.id_borrow === action.payload.id_borrow) {
                            item.books = action.payload.data.books
                            item['librarian'] = action.payload.data.librarian
                            return item
                        } else {
                            return item
                        }
                    })
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateBorrows.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.borrows = state.borrows.map((item) => {
                        // console.log(item)
                        if (item.id_borrow === action.payload.id_borrow) {
                            return action.payload.data
                        } else {
                            return item
                        }
                    })
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(renewalBook.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    // console.log(state.borrows)
                    state.borrows = state.borrows.map((item) => {
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
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const borrowsReducer = borrows.reducer

export const borrowsSelector = (state) => state.borrowsReducer.borrows
export const dsBorrowsSelector = (state) => state.borrowsReducer.dsBorrow

export const { setDsBorrow, setDsPay } = borrows.actions

export default borrowsReducer