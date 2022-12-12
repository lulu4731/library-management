import React, { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import CommentForm from "./CommentForm"
import { addCommentChildren, addCommentParent, commentSelector, deleteComment, loadComment, updateComment } from "../../reducers/comment"
import { checkLogin, librarianSelector } from "../../reducers/librarian"
import ShowCommentChildren from "./ShowCommentChildren"
import { toastError } from "../../toast/toast"

const ShowComment = () => {
    const dispatch = useDispatch()
    let comments = useSelector(commentSelector)
    const { isbn } = useParams()
    const [content, setContent] = useState("")
    const [activeComment, setActiveComment] = useState(null)
    const user = useSelector(librarianSelector)

    const isReplying = activeComment?.type === "replying"
    const isEditing = activeComment && activeComment.type === "editing"

    useEffect(() => {
        dispatch(checkLogin())
        dispatch(loadComment(isbn))
    }, [dispatch, isbn])

    // const ScrollToTop = () => {
    //     const { pathname } = useLocation()

    //     useEffect(() => {
    //         window.scrollTo(0, document.body.scrollHeight - 1800, "smooth")
    //     }, [pathname])

    //     return null
    // }
    const onSubmitComment = (event) => {
        event.preventDefault()
        if (user.id_readers === 0) {
            toastError("Vui lòng đăng nhập để chat")
            return
        }
        else {
            dispatch(addCommentParent({ isbn, content }))
            setContent("")
        }
    }
    const deleteCommentParent = (id_cmt, id_cmt_parent) => {
        dispatch(deleteComment({ id_cmt, isbn, id_cmt_parent }))
    }


    const addCmtChildren = (id_cmt_parent, content) => {
        dispatch(addCommentChildren({ isbn, id_cmt_parent, content }))
        setActiveComment(null)
    }
    const updateCommentParent = (id_cmt, content, id_cmt_parent) => {
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
            {/* <ScrollToTop /> */}
            <Row>
                <Col xl={12} lg={12} md={12} sm={12}>
                    <div className="box-comments">
                        <form onSubmit={onSubmitComment} className="form-comment">
                            <textarea
                                type="text"
                                className="write-comment col-xl-12 col-lg-12 col-md-12 col-sm-12"
                                placeholder="Viết bình luận..."
                                name="content"
                                onKeyPress={(e) => {
                                    e.key === "Enter" && e.preventDefault()
                                }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button
                                className="button-comment"
                                onClick={onSubmitComment}
                            >
                                Bình luận
                            </button>
                        </form>
                        <br />
                        {comments.length > 0 && comments.map((comment, index) => (
                            <div className="read-comment" key={index}>
                                <Card
                                    style={{
                                        flexDirection: "row",
                                        boxShadow: 'none',
                                        border: "0",
                                        padding: "3px",
                                    }}
                                >
                                    <Image
                                        src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                        roundedCircle
                                        style={{
                                            width: "4rem",
                                            height: "4rem",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <Card.Body style={{ padding: "0px" }}>
                                        <Card.Title
                                            as={Link}
                                            to={`/authors/${comment.id_account}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                display: "inline",
                                            }}
                                        >
                                            {comment.reader.first_name + " " + comment.reader.last_name}
                                            <span className="date-comment">
                                                <i>
                                                    {comment.day} - {comment.time}
                                                </i>
                                            </span>
                                        </Card.Title>
                                        <Card.Text
                                        >
                                            {isEditing &&
                                                activeComment.id_cmt ===
                                                comment.id_cmt ? (
                                                <CommentForm
                                                    submitLabel="Update"
                                                    hasCancelButton
                                                    initialText={
                                                        comment.content
                                                    }
                                                    handleSubmit={(content) =>
                                                        updateCommentParent(
                                                            comment.id_cmt,
                                                            content,
                                                            comment.id_cmt_parent
                                                        )
                                                    }
                                                    handleCancel={() =>
                                                        setActiveComment(null)
                                                    }
                                                />
                                            ) : (
                                                <span
                                                    style={{ fontSize: "17px" }}
                                                >
                                                    {formatContent(comment.content)}
                                                </span>
                                            )}

                                            <span className="d-flex comment-item-button">
                                                {user.id_readers !== 0 ? <><Button
                                                    variant="none"
                                                    onClick={() =>
                                                        setActiveComment({
                                                            id_cmt_parent: index,
                                                            type: "replying",
                                                        })
                                                    }
                                                >
                                                    <i className="fa-regular fa-comment-dots icon-size"></i>
                                                </Button></> : <></>}

                                                {user.id_readers !== 0 && user.role < 3 && user.role < comment.reader.role ?
                                                    <>
                                                        <Button variant="none">
                                                            <i
                                                                className={comment.status === 0 ? "fas fa-eye-slash icon-size" : "fas fa-eye icon-size"}
                                                            ></i>
                                                        </Button>
                                                    </>
                                                    : <></>}

                                                {user.id_readers ===
                                                    comment.reader.id_readers ? (
                                                    <>
                                                        <Button
                                                            variant="none"
                                                            onClick={() =>
                                                                setActiveComment(
                                                                    {
                                                                        id_cmt: comment.id_cmt,
                                                                        type: "editing",
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-edit icon-size"></i>
                                                        </Button>
                                                        <Button variant="none">
                                                            <i
                                                                className="far fa-trash-alt icon-size"
                                                                onClick={() =>
                                                                    deleteCommentParent(
                                                                        comment.id_cmt,
                                                                        comment.id_cmt_parent
                                                                    )
                                                                }
                                                            ></i>
                                                        </Button>
                                                    </>
                                                ) : user.role === 2 ? (
                                                    <Button variant="none">
                                                        <i
                                                            className="far fa-trash-alt icon-size"
                                                            onClick={() =>
                                                                deleteCommentParent(
                                                                    comment.id_cmt,
                                                                    comment.id_cmt_parent
                                                                )
                                                            }
                                                        ></i>
                                                    </Button>
                                                ) : (
                                                    <></>
                                                )}


                                            </span>
                                            {isReplying &&
                                                activeComment.id_cmt_parent ===
                                                index && (
                                                    <CommentForm
                                                        submitLabel="Reply"
                                                        handleSubmit={(
                                                            content
                                                        ) =>
                                                            addCmtChildren(
                                                                comment.id_cmt,
                                                                content
                                                            )
                                                        }
                                                        hasCancelButton
                                                        handleCancel={() =>
                                                            setActiveComment(
                                                                null
                                                            )
                                                        }
                                                    />
                                                )}
                                        </Card.Text>
                                        <ShowCommentChildren
                                            key={comment.id_cmt}
                                            id_cmt_parent={comment.id_cmt}
                                            isEditing={isEditing}
                                            activeComment={activeComment}
                                            setActiveComment={setActiveComment}
                                            id_readers={user.id_readers}
                                            role={user.role}
                                            commentChildren={comment.commentChildren}
                                        />
                                        <hr />
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ShowComment
