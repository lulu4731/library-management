import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
import { pendingBook } from '../../../reducers/borrow';

const PendingModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_borrow: 0,
        expired: new Date(),
        books: []
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
        newBorrow[keyName] = keyValue

        setBorrow(newBorrow)
    }

    const onSubmit = () => {
        const newBorrow = { ...borrow }
        newBorrow['expired'] = borrow.expired.toISOString().split('T')[0]

        dispatch(pendingBook(newBorrow))
        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {borrow.id_borrow === 0 ? 'THÊM PHIẾU MƯỢN SÁCH' : 'SỬA PHIẾU MƯỢN SÁCH'}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Hạn trả sách</Form.Label>
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
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>Duyệt</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default PendingModal