import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { pendingBook } from '../../../reducers/borrow';
import { sendEmailPendingBorrow } from '../../../utils/sendEmail';

const PendingModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_borrow: 0,
        expired: new Date(),
        arrival_date: new Date(),
        books: [],
        email: '',
        real_name: '',
        name_books: ''

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

    const onChangeValue = (keyValue, keyName) => {
        const newBorrow = { ...borrow }
        if (keyName === 'arrival_date') {
            let date = new Date(keyValue)
            newBorrow[keyName] = keyValue
            newBorrow['expired'] = new Date(date.setDate(date.getDate() + 14))
        } else {
            newBorrow[keyName] = keyValue
        }

        setBorrow(newBorrow)
    }

    const onSubmit = () => {
        const newBorrow = { ...borrow }
        newBorrow['expired'] = borrow.expired.toISOString().split('T')[0]
        newBorrow['arrival_date'] = borrow.arrival_date.toISOString().split('T')[0]


        const data = {
            to_name: newBorrow.email,
            real_name: newBorrow.real_name,
            books: newBorrow.name_books,
            arrival_date: newBorrow.arrival_date,
            expired: newBorrow.expired,
        }

        sendEmailPendingBorrow(data)
        // console.log(data)

        delete newBorrow['real_name']
        delete newBorrow['name_books']
        delete newBorrow['email']

        dispatch(pendingBook(newBorrow))
        onClose()
    }

    // console.log(borrow)

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {borrow.id_borrow === 0 ? 'DUY???T PHI???U M?????N S??CH' : 'DUY???T PHI???U M?????N S??CH'}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Ng??y ?????n nh???n s??ch</Form.Label>
                            <DatePicker
                                selected={borrow.arrival_date}
                                onChange={(date) => onChangeValue(date, 'arrival_date')}
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
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>H???n tr??? s??ch</Form.Label>
                            <DatePicker
                                selected={borrow.expired}
                                onChange={(date) => onChangeValue(date, 'expired')}
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
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>????ng</Button>
                <Button variant="primary" onClick={onSubmit}>Duy???t</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default PendingModal