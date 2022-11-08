import React, { useState } from 'react'
import { Button, Col, Form, Modal, Offcanvas, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addFeedback } from '../../../reducers/feedback'
import Select from 'react-select'

const ModalFeedback = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState({
        subject: '',
        content: '',
        problem: {}
    })

    const { subject, content, problem } = feedback

    const onChangeValue = (keyValue, keyName) => {
        const newFeedback = { ...feedback }
        newFeedback[keyName] = keyValue
        setFeedback(newFeedback)
    }

    const onSubmit = () => {
        dispatch(addFeedback(feedback))
        setFeedback({
            subject: '',
            content: '',
            problem: {}
        })

        onClose()
    }

    const options = [
        { value: 0, label: "Về tài khoản" },
        { value: 1, label: "Về mượn trả sách" },
        { value: 2, label: "Về mượn rách sách, mất sách" },
        { value: 3, label: "Vấn đề khác" }
    ]

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>GỬI PHẢN HỒI ĐẾN ADMIN</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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
                            <Form.Label>Vấn đề phản hồi</Form.Label>
                            <Select
                                options={options}
                                value={problem}
                                onChange={(value) => onChangeValue(value, 'problem')}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={21} value={content} onChange={(e) => onChangeValue(e.target.value, 'content')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>Gửi phản hồi</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default ModalFeedback