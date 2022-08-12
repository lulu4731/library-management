import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadCompany = createAsyncThunk(
    "company/loadCompany",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/company`
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

export const addCompany = createAsyncThunk(
    "company/addCompany",
    async (company) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/company`, company
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

export const updateCompany = createAsyncThunk(
    "company/updateCompany",
    async (data) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/company/${data.id_publishing_company}`, data.company
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
const company = createSlice({
    name: 'company',
    initialState: {
        company: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCompany.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.company = action.payload.data
                }
            })
            .addCase(addCompany.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.company.unshift(action.payload.data)
                }
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.company = state.company.map((item) =>
                        item.id_publishing_company === action.payload.data.id_publishing_company
                            ? action.payload.data
                            : item
                    )
                }
            })

    }
})

const companyReducer = company.reducer

export const companySelector = (state) => state.companyReducer.company

export default companyReducer