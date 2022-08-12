import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadReaders, readersSelector } from '../../reducers/readers';
import Select from 'react-select';
import { loadTitle, titlesSelector } from '../../reducers/title';
import DatePicker from "react-datepicker";
import { components } from "react-select"
import convertDate from '../../utils/convertDate';
import { addBorrows, dsBorrowsSelector, loadDsBorrows, renewalBook, returnBook, returnBookAll } from '../../reducers/borrow';
import renewalDate from '../../utils/renewalDate';


const PayModal = ({ modalShow, setModalShow, value }) => {
    const dispatch = useDispatch()

    const onClose = () => {
        setModalShow(false)
    }

    const defaultValue = {
        id_borrow: 0,
        librarian: {},
        reader: {},
        // create_time: {},
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
    }, [value])

    // console.log(borrow.books)

    const onSubmit = (id_book) => {
        // console.log(id_book)
        dispatch(returnBook({ id_book, id_borrow: borrow.id_borrow }))

        onClose()
    }

    const onRenewal = (id_book, expired) => {
        // const temps = renewalDate(new Date(expired))
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
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={modalShow}
            onHide={onClose}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    TRẢ SÁCH
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Độc giả mượn sách</Form.Label>
                            <Badge className='ml-2'>{borrow.reader?.label}</Badge>
                        </Col>
                    </Row>
                </Form.Group>
                <br />
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
                                                    <Form.Control disabled value={item.expired.toString().split('T')[0]} />
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onPayAll}>Trả tất cả</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PayModal