import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../toast/toast";
export const loadComment = createAsyncThunk(
    "comment/loadComment",
    async (isbn) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v0/ds/${isbn}/comment`
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

export const addCommentParent = createAsyncThunk(
    "comment/addParent",
    async ({ isbn, content }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/ds/${isbn}/comment`,
                { content }
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

export const addCommentChildren = createAsyncThunk(
    "comment/addChildren",
    async ({ isbn, id_cmt_parent, content }) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v0/ds/${isbn}/comment/${id_cmt_parent}/reply`,
                { content }
            )
            if (response.status === 201) {
                return await { ...response.data, status: response.status, id_cmt_parent }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async ({ id_cmt, isbn, id_cmt_parent }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v0/ds/${isbn}/comment/${id_cmt}/delete`
            )
            if (response.status === 200) {
                return await {
                    ...response.data,
                    status: response.status,
                    id_cmt,
                    id_cmt_parent
                }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

export const updateComment = createAsyncThunk(
    "comment/update",
    async ({ isbn, id_cmt, content, id_cmt_parent }) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v0/ds/${isbn}/comment/${id_cmt}/update`,
                { content }
            )
            if (response.status === 200) {
                return await { ...response.data, status: response.status, id_cmt_parent }
            }
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { message: error.message }
        }
    }
)

// export const hidePresentlyComment = createAsyncThunk(
//     "comment/hidePresently",
//     async ({ id_cmt, id_post, new_status }) => {
//         try {
//             const response = await axios.put(
//                 `https://itnews-api.herokuapp.com/api/v1/post/${id_post}/comment/${id_cmt}/status/${new_status}`
//             )
//             if (response.status === 200) {
//                 return await {
//                     ...response.data,
//                     status: response.status,
//                     id_post: id_post,
//                     id_cmt: id_cmt,
//                     new_status: new_status,
//                 }
//             }
//         } catch (error) {
//             if (error.response.data) return error.response.data
//             else return { message: error.message }
//         }
//     }
// )

const comment = createSlice({
    name: "comment",
    initialState: {
        comment: [],
        commentChildren: [],
        showCommentParent: false,
        showCommentChildren: false,
    },
    reducers: {
        setShowComment(state) {
            state.showCommentParent = !state.showCommentParent
        },
        setShowCommentChildren(state) {
            state.showCommentChildren = !state.showCommentChildren
        },
        setShow(state) {
            state.showCommentParent = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComment.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.comment = action.payload.data
                } else {
                }
            })
            // .addCase(loadCommentChildren.fulfilled, (state, action) => {
            //     if (action.payload.status === 200) {
            //         state.commentChildren = action.payload.data
            //     } else {
            //     }
            // })
            .addCase(addCommentParent.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.comment.unshift(action.payload.data)
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addCommentChildren.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    state.comment.map(item => {
                        if (item.id_cmt === action.payload.id_cmt_parent) {
                            item.commentChildren.unshift(action.payload.data)
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
            .addCase(updateComment.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    if (action.payload.id_cmt_parent === 0) {
                        state.comment = state.comment.map((comment) => {
                            if (comment.id_cmt === action.payload.data.id_cmt) {
                                comment.content = action.payload.data.content
                                return comment
                            }
                            return comment
                        })
                    } else {
                        state.comment = state.comment.map((item) => {
                            item.commentChildren.map((itemChildren) => {
                                if (itemChildren.id_cmt === action.payload.data.id_cmt) {
                                    itemChildren.content = action.payload.data.content
                                    return itemChildren
                                }
                                return itemChildren
                            })

                            return item
                        })
                    }


                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    if (action.payload.id_cmt_parent === 0) {
                        state.comment = state.comment.filter((comment) => comment.id_cmt !== action.payload.id_cmt)
                    } else {
                        state.comment = state.comment.map((item) => {
                            item.commentChildren = item.commentChildren.filter((itemChildren) => itemChildren.id_cmt !== action.payload.id_cmt)
                            return item
                        })
                    }


                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
                // if (action.payload.status === 200) {
                //     state.comment = state.comment.filter(
                //         (comment) =>
                //             comment.id_post !== action.payload.id_post &&
                //             comment.id_cmt !== action.payload.id_cmt
                //     )
                //     state.commentChildren = state.commentChildren.filter(
                //         (comment) =>
                //             comment.id_post !== action.payload.id_post &&
                //             comment.id_cmt !== action.payload.id_cmt
                //     )
                //     toastSuccess(action.payload.message)
                // } else {
                //     toastError(action.payload.message)
                // }
            })
        // .addCase(hidePresentlyComment.fulfilled, (state, action) => {
        //     if (action.payload.status === 200) {
        //         state.commentChildren = state.commentChildren.map(
        //             (comment) => {
        //                 if (comment.id_cmt === action.payload.data.id_cmt) {
        //                     comment.status = action.payload.new_status
        //                     return comment
        //                 }
        //                 return comment
        //             }
        //         )
        //         state.comment = state.comment.map((comment) => {
        //             if (comment.id_cmt === action.payload.data.id_cmt) {
        //                 comment.status = action.payload.new_status
        //                 return comment
        //             }
        //             return comment
        //         })
        //     } else {
        //     }
        // })
    },
})

const commentReducer = comment.reducer

// export const { setShowComment, setShowCommentChildren, setShow } =
//     comment.actions

// export const showCommentSelector = (state) =>
//     state.commentReducer.showCommentParent
// export const showCommentSelectorChildren = (state) =>
//     state.commentReducer.showCommentChildren
export const commentSelector = (state) => state.commentReducer.comment
// export const commentChildrenSelector = (state) =>
//     state.commentReducer.commentChildren

export default commentReducer
