import React, { useState } from "react"
import { Row, Form } from "react-bootstrap"
const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialText = "",
}) => {
    const [content, setContent] = useState(initialText)
    const isTextareaDisabled = content.length === 0
    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(content)
        setContent("")
    }
    return (
        // <Row>
        <Form onSubmit={onSubmit} className="form-comment">
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
            // style={{ height: "120px", minHeight: "100px", maxHeight: "300px", padding: "10px", margin: "10px 0px", border: "2px solid #ccc", borderRadius: "5px", borderSizing: "border-box" }}
            />
            <button
                className="button-comment ml-2"
                disabled={isTextareaDisabled}
                onClick={onSubmit}
            >
                {/* <i className="fas fa-comment-dots"></i> */}
                Bình luận
            </button>
            {hasCancelButton && (
                <button
                    className="button-comment"
                    onClick={handleCancel}
                >
                    {/* <i className="fas fa-window-close"></i> */}
                    Đóng
                </button>
            )}
        </Form>
        // </Row>
    )
}

export default CommentForm
