import React, { useState } from 'react'
import { Button, Col, Form, Modal, Offcanvas, Row } from 'react-bootstrap'
import { sendEmail } from '../../utils/sendEmail'

const ModalEmailFeedback = ({ isOpen, onClose, feedback }) => {
    const { subject = '', content = '', name, email } = feedback
    const [handle, setHandle] = useState('')

    const onChangeStatusFeedback = () => {
        const data = {
            real_name: name,
            content,
            handle,
            email
        }
        sendEmail(data)
        onClose()
    }
    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>GỬI EMAIL GIẢI QUYẾT PHẢN HỒI</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row>
                    <Col>
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" value={subject} disabled />
                    </Col>
                </Row>
                <br />
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={8} value={content} disabled />
                        </Col>
                    </Row>
                </Form.Group>
                <br />
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Nội dung giải quyết phản hồi</Form.Label>
                            <Form.Control as="textarea" rows={12} value={handle} onChange={(e) => setHandle(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onChangeStatusFeedback}>Đánh dấu đã đọc</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default ModalEmailFeedback