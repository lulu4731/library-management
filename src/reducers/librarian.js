import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken";
import * as types from '../contains/type'

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

const librarian = createSlice({
    name: 'librarian',
    initialState: {
        librarian: {},
        isAuthenticated: false
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
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.librarian = action.payload.data
                state.isAuthenticated = action.payload.isAuthenticated
            })
    }
})

const librarianReducer = librarian.reducer

export const librarianSelector = (state) => state.librarianReducer.librarian
export const isAuthenticatedSelector = (state) => state.librarianReducer.isAuthenticated
export const { setSignIn, setLogout } = librarian.actions

export default librarianReducer