import { configureStore } from "@reduxjs/toolkit"
import readersReducer from "../reducers/readers"
import authorsReducer from "../reducers/authors"
import categoryReducer from "../reducers/category"
import companyReducer from "../reducers/company"
import titlesReducer from "../reducers/title"
import receiptsReducer from "../reducers/receipt"
import booksReducer from "../reducers/book"
import borrowsReducer from "../reducers/borrow"
import librarianReducer from "../reducers/librarian"
import liquidationsReducer from "../reducers/liquidation"
import statisticalReducer from "../reducers/statistical"
import commentReducer from "../reducers/comment"
import feedbackReducer from "../reducers/feedback"

const store = configureStore({
    reducer: {
        readersReducer,
        authorsReducer,
        categoryReducer,
        companyReducer,
        titlesReducer,
        receiptsReducer,
        booksReducer,
        borrowsReducer,
        librarianReducer,
        liquidationsReducer,
        statisticalReducer,
        commentReducer,
        feedbackReducer
    },
})

export default store