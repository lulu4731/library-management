import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { updateBooks } from '../../reducers/book';
import { addCompany, updateCompany } from '../../reducers/company';

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
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newBook = { ...position }
        newBook[keyName] = keyValue
        setPosition(newBook)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(updateBooks(position))

        // if (position.id_book === 0) {
        //     // dispatch(addCompany(newCompany))
        // } else {
        //     dispatch(updateCompany({
        //         id_publishing_company: company.id_publishing_company,
        //         company: newCompany
        //     }))
        // }
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
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    CẬP NHẬT VỊ TRÍ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Vị trí</Form.Label>
                                <Form.Control type="text" required value={position?.position} onChange={(e) => onValueChange(e.target.value, 'position')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>{position.id_book === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default BookModal