import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

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
const category = createSlice({
    name: 'category',
    initialState: {
        category: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCategory.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.category = action.payload.data
                }
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.category.unshift(action.payload.data)
                }
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                console.log(action.payload.data)
                if (action.payload.status === 200) {
                    state.category = state.category.map((item) =>
                        item.id_category === action.payload.data.id_category
                            ? action.payload.data
                            : item
                    )
                }
            })

    }
})

const categoryReducer = category.reducer

export const categorySelector = (state) => state.categoryReducer.category

export default categoryReducer