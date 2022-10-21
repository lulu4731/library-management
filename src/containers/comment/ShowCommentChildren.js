import React, { useEffect } from "react"
import { Button, Card, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
// import {
//     commentChildrenSelector,
//     deleteComment,
//     loadCommentChildren,
//     updateComment,
//     hidePresentlyComment
// } from "../../reducers/Comment/comment"
import { useParams } from "react-router"
import CommentForm from "./CommentForm"
import { toastError } from "../../toast/toast"
import { deleteComment, updateComment } from "../../reducers/comment"

const ShowCommentChildren = ({
    id_cmt_parent,
    isEditing,
    activeComment,
    setActiveComment,
    id_readers,
    role,
    account_status,
    commentChildren
}) => {
    const dispatch = useDispatch()
    // console.log(id_cmt)
    // const commentChildren = useSelector(commentChildrenSelector)
    const { isbn } = useParams()
    // useEffect(() => {
    //     dispatch(loadCommentChildren(id_post))
    // }, [dispatch, id_post])

    // const getReplies = commentChildren.filter(
    //     (comment) =>
    //         comment.id_cmt_parent === id_cmt_parent &&
    //         comment.id_cmt !== id_cmt_parent
    // )

    const hideCommentChildren = (id_cmt, status) => {
        // if (status === 0) {
        //     const comment = {
        //         id_post,
        //         id_cmt,
        //         new_status: 1
        //     }
        //     dispatch(hidePresentlyComment(comment))
        // } else {
        //     const comment = {
        //         id_post,
        //         id_cmt,
        //         new_status: 0
        //     }
        //     dispatch(hidePresentlyComment(comment))
        // }

    }

    const deleteCommentChildren = (id_cmt) => {
        dispatch(deleteComment({ id_cmt, isbn, id_cmt_parent }))
    }

    const updateCommentChildren = (id_cmt, content) => {
        // if (account_status !== 0) {
        //     toastError("Tài khoản đã bị khóa, không thể chỉnh sửa chat!")
        //     return
        // }
        // console.log({ isbn, id_cmt, content, id_cmt_parent })
        dispatch(updateComment({ isbn, id_cmt, content, id_cmt_parent }))
        setActiveComment(null)
    }

    const formatContent = (content) => {
        let arr = content.split("\n")
        let res = []
        for (let line of arr) {
            res.push(line)
            res.push(<br />)
        }
        return res
    }

    return (
        <>
            {commentChildren.length > 0 && commentChildren.map((comment, index) => (
                <div className="read-comment" key={comment.id_cmt}>
                    <Card
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            border: "0",
                            padding: "0",
                        }}
                    >
                        <Image
                            src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                            roundedCircle
                            style={{
                                width: "3.5rem",
                                height: "3.5rem",
                                marginRight: "10px",
                            }}
                        />
                        <Card.Body style={{ padding: "0" }}>
                            {/* <Row className="d-flex"> */}
                            <Card.Title
                            // as={Link}
                            // to={`/authors/${comment.id_account}`}
                            // style={{
                            //     textDecoration: "none",
                            //     color: "black",
                            //     display: "inline",
                            // }}
                            >
                                {comment.reader.first_name + " " + comment.reader.last_name}
                                {/* <span style={{ color: "#2596be" }}>
                                        @{comment.account_name}
                                    </span> */}
                                <span className="date-comment">
                                    <i>
                                        {comment.day} - {comment.time}
                                    </i>
                                </span>
                            </Card.Title>
                            {/* </Row> */}
                            <Card.Text
                            // className="d-flex"
                            // style={{ flexDirection: "column" }}
                            >
                                {isEditing &&
                                    activeComment.id_cmt === comment.id_cmt ? (
                                    <CommentForm
                                        submitLabel="Update"
                                        hasCancelButton
                                        initialText={comment.content}
                                        handleSubmit={(content) =>
                                            updateCommentChildren(
                                                comment.id_cmt,
                                                content
                                            )
                                        }
                                        handleCancel={() =>
                                            setActiveComment(false)
                                        }
                                    />
                                ) : (
                                    <span style={{ fontSize: "17px" }}>
                                        {formatContent(comment.content)}
                                    </span>
                                )}
                                <span className="d-flex comment-item-button">
                                    {id_readers !== 0 && role < 3 && role < comment.reader.role ?
                                        <>
                                            <Button variant="none">
                                                <i
                                                    className={comment.status === 0 ? "fas fa-eye-slash fa-x" : "fas fa-eye fa-x"}
                                                // onClick={() =>
                                                //     hideCommentChildren(
                                                //         comment.id_cmt, comment.status
                                                //     )
                                                // }
                                                ></i>
                                            </Button>
                                        </>
                                        : <></>}

                                    {id_readers === comment.reader.id_readers ? (
                                        <>
                                            <Button
                                                variant="none"
                                                onClick={() =>
                                                    setActiveComment({
                                                        id_cmt: comment.id_cmt,
                                                        type: "editing",
                                                    })
                                                }
                                            >
                                                <i className="far fa-edit icon-size"></i>
                                            </Button>
                                            <Button
                                                variant="none"
                                                onClick={() =>
                                                    deleteCommentChildren(
                                                        comment.id_cmt
                                                    )
                                                }
                                            >
                                                <i className="far fa-trash-alt icon-size"></i>
                                            </Button>
                                        </>
                                    ) : role === 2 ? (
                                        <>
                                            <Button variant="none">
                                                <i
                                                    className="far fa-trash-alt fa-x"
                                                    onClick={() =>
                                                        deleteCommentChildren(
                                                            comment.id_cmt
                                                        )
                                                    }
                                                ></i>
                                            </Button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default ShowCommentChildren
