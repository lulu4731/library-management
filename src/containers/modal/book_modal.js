import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updateBooks } from '../../reducers/book';

const BookModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_book: 0,
        position: ''
    }

    const [position, setPosition] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setPosition(value)
            } else {
                setPosition(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newBook = { ...position }
        newBook[keyName] = keyValue
        setPosition(newBook)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(updateBooks(position))
        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>CẬP NHẬT VỊ TRÍ</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Vị trí</Form.Label>
                            <Form.Control type="text" required value={position?.position} onChange={(e) => onValueChange(e.target.value, 'position')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>Cập nhật</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default BookModal