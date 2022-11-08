import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toastError, toastSuccess } from "../toast/toast";

export const loadCategory = createAsyncThunk(
    "category/loadCategory",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/category`
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

export const searchCategory = createAsyncThunk(
    "category/searchCategory",
    async (keyword) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/category/search?k=${keyword}`
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

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (category) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/category`, category
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

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/category/${data.id_category}`, data.category
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

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id_category) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v0/category/${id_category}`
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_category }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)
const category = createSlice({
    name: 'category',
    initialState: {
        category: [],
        categorySelect: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(searchCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.category = action.payload.data
                }
            })
            // .addCase(searchCategory.fulfilled, (state, action) => {
            //     if (action.payload.status === 200) {
            //         state.category = action.payload.data
            //     }
            // })
            .addCase(addCategory.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.category.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.category = state.category.map((item) =>
                        item.id_category === action.payload.data.id_category
                            ? action.payload.data
                            : item
                    )
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.category = state.category.filter(item => item.id_category !== action.payload.id_category)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    }
})

const categoryReducer = category.reducer

export const categorySelector = (state) => state.categoryReducer.category

export default categoryReducer