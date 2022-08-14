import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadReaders, readersSelector } from '../../reducers/readers';
import Select from 'react-select';
import { loadTitle, titlesSelector } from '../../reducers/title';
import DatePicker from "react-datepicker";
import { components } from "react-select"
import convertDate from '../../utils/convertDate';
import { addBorrows, dsBorrowsSelector, loadDsBorrows, renewalBook, returnBook, returnBookAll, updateBorrows } from '../../reducers/borrow';
import renewalDate from '../../utils/renewalDate';
import convertTime from '../../utils/convertTimesTamp';
import convertTimesTamp from '../../utils/convertTimesTamp';


const UpdateModal = ({ modalShow, setModalShow, value }) => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const titles = useSelector(dsBorrowsSelector)
    // console.log(value)

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
        dispatch(loadReaders())
        dispatch(loadDsBorrows())
    }, [dispatch])
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

    const readersOptions = readers.map(item => {
        return {
            value: item.id_readers,
            label: item.first_name + ' ' + item.last_name + " (" + item.email + ")"
        }
    })
    const onSubmit = (id_book) => {
        // console.log(id_book)
        // dispatch(returnBook({ id_book, id_borrow: borrow.id_borrow }))

        // onClose()
    }

    const onRenewal = (id_book, expired) => {
        // const temps = renewalDate(new Date(expired))
        // dispatch(renewalBook({ id_book, id_borrow: borrow.id_borrow, expired: renewalDate(new Date(expired)) }))
        // onClose()
    }

    const onPayAll = () => {
        // let returnBook = {}
        // returnBook['id_borrow'] = borrow.id_borrow
        // returnBook['books'] = borrow.books.map(item => item.id_book)
        // dispatch(returnBookAll(returnBook))
        // onClose()
        const newBorrow = {}
        newBorrow['id_borrow'] = +borrow.id_borrow
        newBorrow['id_readers'] = borrow.reader.value
        newBorrow['books'] = borrow.books.map(item => {
            // dispatch(setDsBorrow(item.value))
            return { ...item, id_book: item.ds.value, expired: item.expired.split('T')[0] }
        })

        dispatch(updateBorrows(newBorrow))
        // console.log(newBorrow)
        onClose()
    }

    const onChangeValue = (id, keyValue, keyName) => {
        const updateBorrow = { ...borrow }
        if (keyName === 'reader') {
            updateBorrow[keyName] = keyValue
        } else {
            const updateBook = { ...updateBorrow.books[id] }
            // console.log(updateBook)
            updateBook[keyName] = keyValue
            updateBorrow.books[id] = updateBook
        }

        setBorrow(updateBorrow)
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
                            <Select
                                value={borrow.reader}
                                options={readersOptions}
                                onChange={(value) => onChangeValue(0, value, 'reader')}
                            />
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
                                                    {/* <Form.Control disabled value={item.ds.label} /> */}
                                                    <Select
                                                        value={item.ds}
                                                        options={titles}
                                                        onChange={(value) => onChangeValue(index, value, 'ds')}
                                                    />
                                                </Col>
                                                <Col className="mb-3">
                                                    <Form.Label>Hạn trả</Form.Label>
                                                    {/* <Form.Control disabled value={item.expired.toString().split('T')[0]} /> */}
                                                    <DatePicker
                                                        selected={new Date(item.expired)}
                                                        onChange={(date) => onChangeValue(index, convertTimesTamp(date.toISOString()), 'expired')}
                                                        dateFormat="dd/MM/yyyy"
                                                        withPortal
                                                        showYearDropdown
                                                        scrollableYearDropdown={true}
                                                        yearDropdownItemNumber={100}
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        dropdownMode="select"
                                                    />
                                                </Col>
                                                {/* <Col className="mb-3">
                                                    <Form.Label className='ml-3'>Thao tác</Form.Label>
                                                    <Col>
                                                        <Button variant='success' onClick={() => onSubmit(item.id_book)}>Trả sách</Button>
                                                        &nbsp; &nbsp;
                                                        {
                                                            item.number_renewal === 0 && <Button onClick={() => onRenewal(item.id_book, item.expired)}>Gia hạn</Button>
                                                        }
                                                    </Col>
                                                </Col> */}
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
                <Button variant="primary" onClick={onPayAll}>Cập nhật</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateModal