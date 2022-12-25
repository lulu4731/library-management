import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { readersSelector, searchReaders } from '../../reducers/readers';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { components } from "react-select"
import { addBorrows, dsBorrowsSelector, loadDsBorrows, updateBorrows } from '../../reducers/borrow';
import { paymentBorrowLibrarian } from '../../utils/callerAPI';
import { toastError } from '../../toast/toast';

const BorrowModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const titles = useSelector(dsBorrowsSelector)
    // console.log(value)

    const defaultValue = {
        id_borrow: 0,
        id_readers: {},
        expired: new Date((new Date()).setDate((new Date()).getDate() + 14)),
        books: [],
        total_price: 0
    }

    const [borrow, setBorrow] = useState(defaultValue)

    useEffect(() => {
        dispatch(searchReaders(''))
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const readersOptions = readers.map(item => {
        return {
            value: item.id_readers,
            label: item.first_name + ' ' + item.last_name + " (" + item.email + ")"
        }
    })

    const dsOptions = titles

    const onChangeValue = (keyValue, keyName) => {
        const newBorrow = { ...borrow }
        newBorrow[keyName] = keyValue
        newBorrow['total_price'] = newBorrow.books.reduce(
            (previousValue, currentValue) => previousValue + (currentValue.price * 1), 0)

        setBorrow(newBorrow)
    }

    const changeBorrow = (isbn, price) => {
        const temps = { ...borrow }
        temps['books'] = borrow.books.filter(item => item.value !== isbn)
        temps['total_price'] = borrow.total_price - +price
        setBorrow(temps)
    }

    const onSubmit = async () => {
        const newBorrow = { ...borrow }
        newBorrow['id_readers'] = borrow.id_readers.value
        delete newBorrow['expired']
        newBorrow['books'] = borrow.books.map(item => {
            return { id_book: item.value, expired: borrow.expired.toISOString().split('T')[0] }
        })

        const pay = {
            name_reader: borrow.id_readers.label,
            amount: borrow.total_price,
            books: newBorrow.books,
            id_readers: borrow.id_readers.value
        }

        if (borrow.id_borrow === 0) {

            if (pay.amount > 0) {
                localStorage.setItem(`borrowLibrarian`, JSON.stringify(newBorrow))
                const response = await paymentBorrowLibrarian(pay)
                if (response.status === 200) {
                    window.location = response.link
                    onClose()
                } else {
                    toastError(response.message)
                    if (response.data) {
                        // const temps = { ...borrow }
                        // temps['books'] = borrow.books.filter(item => item.value !== data.data.isbn)
                        // temps['total_price'] = borrow.total_price - +data.data.price
                        // setBorrow(temps)
                        changeBorrow(response.data.isbn, response.data.price)
                    }
                }
            } else {
                const response = await dispatch(addBorrows(newBorrow))

                if (response.payload.code === 201) {
                    onClose()
                } else {
                    // const temps = { ...borrow }
                    // temps['books'] = borrow.books.filter(item => item.value !== response.payload.data.isbn)
                    // temps['total_price'] = borrow.total_price - +response.payload.data.price
                    // setBorrow(temps)
                    changeBorrow(response.payload.data.isbn, response.payload.data.price)
                }
            }
        } else {
            dispatch(updateBorrows(newBorrow))
            // onClose()
        }
        onClose()
    }

    const styles = {
        multiValue: (base, state) => {
            return { ...base, backgroundColor: 'rgba(54, 179, 126, 0.1)', color: 'rgb(54, 179, 126)' };
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: 'none' } : base;
        },
    };

    const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < 3

    const Menu = (props) => {
        const optionSelectedLength = props.getValue().length || 0
        return (
            <components.Menu {...props}>
                {optionSelectedLength < 3 ? (
                    props.children
                ) : (
                    <div style={{ margin: 15 }}>
                        Tối đa chỉ được 3 quyển bạn ơi!
                    </div>
                )}
            </components.Menu>
        )
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
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Độc giả mượn sách</Form.Label>
                            <Select
                                value={borrow.id_readers}
                                options={readersOptions}
                                onChange={(value) => onChangeValue(value, 'id_readers')}
                            />
                        </Col>
                    </Row>
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
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Chọn sách</Form.Label>
                            <Select
                                isMulti
                                options={dsOptions}
                                styles={styles}
                                value={borrow.books || []}
                                onChange={(value) => onChangeValue(value, 'books')}
                                placeholder="Chỉ được mươn tối đa 3 quyển sách!"
                                isValidNewOption={isValidNewOption}
                                components={{ Menu }}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Tổng tiền</Form.Label>
                            <Form.Control type="text" disabled value={borrow.total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} />
                        </Col>
                        {/* borrow.books.reduce(
                                (previousValue, currentValue) => previousValue + (currentValue.price * 1), 0).toLocaleString('it-IT', {style: 'currency', currency: 'VND' }) */}
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>{borrow.id_borrow === 0 ? 'Thêm' : 'Sửa'}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default BorrowModal