import axios from "axios"
import * as types from '.././contains/type'

export const loginUser = async (loginForm) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v0/librarian/login",
            loginForm
        )
        if (response.status === 200) {
            localStorage.setItem(
                types.LOCAL_STORAGE_TOKEN_NAME,
                response.data.accessToken
            )
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const registerUser = async (registerForm) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/v0/readers/register",
            registerForm
        )
        if (response.status === 201) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const changePassword = async (newPass) => {
    try {
        const response = await axios.put(
            `http://localhost:8000/api/v0/librarian/change/password`,
            newPass
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const forgetPassword = async (email) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/librarian/forget/password`,
            email
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const forgetPasswordChange = async (new_pass) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/librarian/forget/change`,
            new_pass
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const searchDS = async (keyword) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v0/search?k=${keyword}`,
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const paymentBorrow = async (borrow) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/payment`,
            borrow
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const paymentBorrowLibrarian = async (borrow) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/payment/librarian`,
            borrow
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const paymentLostBook = async (borrow) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/payment/lost-book`,
            borrow
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}

export const addNotification = async (notification) => {
    try {
        const response = await axios.post(
            `http://localhost:8000/api/v0/notification`,
            notification
        )
        if (response.status === 201) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
}