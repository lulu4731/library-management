import React, { useState } from "react"
import { Form } from "react-bootstrap"
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
            />
            <button
                className="button-comment ml-2"
                disabled={isTextareaDisabled}
                onClick={onSubmit}
            >
                Bình luận
            </button>
            {hasCancelButton && (
                <button
                    className="button-comment"
                    onClick={handleCancel}
                >
                    Đóng
                </button>
            )}
        </Form>
    )
}

export default CommentForm
