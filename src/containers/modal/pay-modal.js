import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Badge, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { renewalBook, returnBook, returnBookAll } from '../../reducers/borrow';
import renewalDate from '../../utils/renewalDate';
import convertTimesTamp from '../../utils/convertTimesTamp';


const PayModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_borrow: 0,
        librarian: {},
        reader: {},
        books: [],
    }

    const [borrow, setBorrow] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setBorrow(value)
            } else {
                setBorrow(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])


    const onSubmit = (id_book) => {
        dispatch(returnBook({ id_book, id_borrow: borrow.id_borrow }))

        onClose()
    }

    const onRenewal = (id_book, expired) => {
        dispatch(renewalBook({ id_book, id_borrow: borrow.id_borrow, expired: renewalDate(new Date(expired)) }))
        onClose()
    }

    const onPayAll = () => {
        let returnBook = {}
        returnBook['id_borrow'] = borrow.id_borrow
        returnBook['books'] = borrow.books.map(item => item.id_book)
        dispatch(returnBookAll(returnBook))
        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>TRẢ SÁCH/GIA HẠN</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Độc giả mượn sách</Form.Label>
                            <Badge className='ml-2'>{borrow.reader?.label}</Badge>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            {
                                borrow.books.length > 0 && (
                                    borrow.books.map((item, index) => (

                                        item.borrow_status === 0 && (
                                            <Row key={index}>
                                                <Col className="mb-3">
                                                    <Form.Label>Tên Sách</Form.Label>
                                                    <Form.Control disabled value={item.ds.label} />
                                                </Col>
                                                <Col className="mb-3">
                                                    <Form.Label>Hạn trả</Form.Label>
                                                    <Form.Control disabled value={convertTimesTamp(item.expired)} />
                                                </Col>
                                                <Col className="mb-3">
                                                    <Form.Label className='ml-3'>Thao tác</Form.Label>
                                                    <Col>
                                                        <Button variant='success' onClick={() => onSubmit(item.id_book)}>Trả sách</Button>
                                                        &nbsp; &nbsp;
                                                        {
                                                            item.number_renewal === 0 && <Button onClick={() => onRenewal(item.id_book, item.expired)}>Gia hạn</Button>
                                                        }
                                                    </Col>
                                                </Col>
                                            </Row>
                                        )

                                    ))
                                )
                            }
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onPayAll}>Trả tất cả</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default PayModal