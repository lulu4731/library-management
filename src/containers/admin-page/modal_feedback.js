import React from 'react'
import { Button, Col, Form, Modal, Offcanvas, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateStatusFeedback } from '../../reducers/feedback'

const ModalFeedback = ({ isOpen, onClose, feedback }) => {
    const dispatch = useDispatch()

    const { subject = '', content = '', id_feedback } = feedback

    const onChangeStatusFeedback = () => {
        dispatch(updateStatusFeedback(id_feedback))
        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>CHI TIẾT PHẢN HỒI</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" value={subject} disabled />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={25} value={content} disabled />
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

export default ModalFeedback