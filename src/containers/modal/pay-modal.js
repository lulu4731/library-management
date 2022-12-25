import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Badge, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { lostBook, renewalBook, returnBook, returnBookAll } from '../../reducers/borrow';
import renewalDate from '../../utils/renewalDate';
import convertTimesTamp from '../../utils/convertTimesTamp';


const PayModal = ({ isOpen, onClose, value, hide = true }) => {
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

    const onLost = (item) => {
        const lostBookData = {
            id_book: item.id_book,
            id_borrow: borrow.id_borrow
        }

        dispatch(lostBook(lostBookData))
        onClose()
    }
    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>TRẢ SÁCH/GIA HẠN/ĐÁNH DẤU MẤT SÁCH</Offcanvas.Title>
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
                                                <Col className="mb-3" md={4}>
                                                    <Form.Label>Tên Sách</Form.Label>
                                                    <Form.Control disabled value={item.ds.label} />
                                                </Col>
                                                <Col className="mb-3" md={3}>
                                                    <Form.Label>Hạn trả</Form.Label>
                                                    <Form.Control disabled value={convertTimesTamp(item.expired)} />
                                                </Col>
                                                <Col className="mb-3">
                                                    <Form.Label className='ml-3'>Thao tác</Form.Label>
                                                    <Col>
                                                        {
                                                            hide && <Button className={!hide ? '' : 'mr-3'} variant='success' onClick={() => onSubmit(item.id_book)}>Trả sách</Button>
                                                        }
                                                        {
                                                            item.number_renewal === 0 && <Button className='mr-3' onClick={() => onRenewal(item.id_book, item.expired)}>Gia hạn</Button>
                                                        }
                                                        {
                                                            hide && <Button variant='danger' onClick={() => onLost(item)}>Mất sách</Button>
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
                {
                    hide && <Button variant="primary" onClick={onPayAll}>Trả tất cả</Button>
                }
            </Modal.Footer>
        </Offcanvas>
    )
}

export default PayModal