import React from "react"
import { Button, Card, Image } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import CommentForm from "./CommentForm"
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
    const { isbn } = useParams()

    const deleteCommentChildren = (id_cmt) => {
        dispatch(deleteComment({ id_cmt, isbn, id_cmt_parent }))
    }

    const updateCommentChildren = (id_cmt, content) => {
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
                <div className="read-comment" key={index}>
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
                            <Card.Title
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
