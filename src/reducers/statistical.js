import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loadStatisticalDS = createAsyncThunk(
    "statistical/loadStatisticalDS",
    async (date) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/statistical/tk`, date
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

export const loadStatisticalReaders = createAsyncThunk(
    "statistical/loadStatisticalReaders",
    async (date) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/statistical/readers`, date
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

export const loadStatisticalBookByDay = createAsyncThunk(
    "statistical/loadStatisticalBookByDay",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/statistical/ds/day`
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

export const loadStatisticalReadersByDay = createAsyncThunk(
    "statistical/loadStatisticalReadersByDay",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/statistical/readers/day`
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

export const loadStatisticalReadersExpired = createAsyncThunk(
    "statistical/loadStatisticalReadersExpired",
    async (date) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/statistical/readers/expired`, date
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

export const loadStatisticalTopBookWeek = createAsyncThunk(
    "statistical/loadStatisticalTopBookWeek",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/statistical/top-book-week`
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

export const loadStatisticalTopBookMonth = createAsyncThunk(
    "statistical/loadStatisticalTopBookMonth",
    async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/statistical/top-book-month`
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

const statistical = createSlice({
    name: 'statistical',
    initialState: {
        statisticalDS: [],
        statisticalReaders: [],
        statisticalDsDay: {},
        statisticalReadersDay: 0,
        statisticalReaderExpired: [],
        statisticalTopBookWeek: {},
        statisticalTopBookMonth: {},
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadStatisticalDS.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalDS = action.payload.data
                }
            })
            .addCase(loadStatisticalReaders.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalReaders = action.payload.data
                }
            })
            .addCase(loadStatisticalReadersByDay.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalReadersDay = action.payload.data
                }
            })
            .addCase(loadStatisticalBookByDay.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalDsDay = action.payload.data
                }
            })
            .addCase(loadStatisticalReadersExpired.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalReaderExpired = action.payload.data
                }
            })
            .addCase(loadStatisticalTopBookWeek.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalTopBookWeek = action.payload.data
                }
            })
            .addCase(loadStatisticalTopBookMonth.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.statisticalTopBookMonth = action.payload.data
                }
            })
    }
})

const statisticalReducer = statistical.reducer


export const statisticalDsSelector = (state) => state.statisticalReducer.statisticalDS
export const statisticalReadersSelector = (state) => state.statisticalReducer.statisticalReaders
export const statisticalReadersDaySelector = (state) => state.statisticalReducer.statisticalReadersDay
export const statisticalDsDaySelector = (state) => state.statisticalReducer.statisticalDsDay
export const statisticalReaderExpiredSelector = (state) => state.statisticalReducer.statisticalReaderExpired
export const statisticalTopBookWeekSelector = (state) => state.statisticalReducer.statisticalTopBookWeek
export const statisticalTopBookMonthSelector = (state) => state.statisticalReducer.statisticalTopBookMonth



export default statisticalReducer