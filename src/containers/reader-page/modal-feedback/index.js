import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addFeedback } from '../../../reducers/feedback'

const ModalFeedback = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState({
        subject: '',
        content: ''
    })

    const { subject, content } = feedback

    const onClose = () => {
        setIsOpen(false)
    }

    const onChangeValue = (keyValue, keyName) => {
        const newFeedback = { ...feedback }
        newFeedback[keyName] = keyValue
        setFeedback(newFeedback)
    }

    const onSubmit = () => {
        dispatch(addFeedback(feedback))
        setFeedback({
            subject: '',
            content: ''
        })
        onClose()
    }

    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={isOpen}
            onHide={onClose}
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    GỬI PHẢN HỒI ĐẾN ADMIN
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" value={subject} onChange={(e) => onChangeValue(e.target.value, 'subject')} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={5} value={content} onChange={(e) => onChangeValue(e.target.value, 'content')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>Gửi phản hồi</Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalFeedback