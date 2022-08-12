import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadReaders, readersSelector } from '../../reducers/readers';
import Select from 'react-select';
import { loadTitle, titlesSelector } from '../../reducers/title';
import DatePicker from "react-datepicker";
import { components } from "react-select"
import convertDate from '../../utils/convertDate';
import { addBorrows, dsBorrowsSelector, loadDsBorrows, setDsBorrow } from '../../reducers/borrow';

const BorrowModal = ({ modalShow, setModalShow, value }) => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const titles = useSelector(dsBorrowsSelector)

    // console.log(value)

    const defaultValue = {
        id_readers: {},
        expired: new Date(),
        books: []
    }

    const [borrow, setBorrow] = useState(defaultValue)

    useEffect(() => {
        dispatch(loadReaders())
        dispatch(loadDsBorrows())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(loadReaders())
    //     dispatch(loadDsBorrows())
    // }, [dispatch])

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setBorrow(value)
            } else {
                setBorrow(defaultValue)
            }
        }
    }, [value])

    const readersOptions = readers.map(item => {
        return {
            value: item.id_readers,
            label: item.first_name + ' ' + item.last_name + " (" + item.email + ")"
        }
    })

    const dsOptions = titles

    const onClose = () => {
        setModalShow(false)

        setBorrow(defaultValue)
    }

    const onChangeValue = (keyValue, keyName) => {
        const newBorrow = { ...borrow }
        newBorrow[keyName] = keyValue

        setBorrow(newBorrow)
    }

    const onSubmit = () => {
        const newBorrow = { ...borrow }
        newBorrow['id_readers'] = borrow.id_readers.value
        delete newBorrow['expired']
        newBorrow['books'] = borrow.books.map(item => {
           
            return { id_book: item.value, expired: convertDate(borrow.expired) }
        })

        // console.log(borrow)
        // console.log(newBorrow)
        // dispatch(loadDsBorrows())
        dispatch(addBorrows(newBorrow))
        onClose()
    }

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
    // console.log(titles)
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
                    TẠO PHIẾU MƯỢN
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Độc giả mượn sách</Form.Label>
                            <Select
                                value={borrow.id_readers}
                                options={readersOptions}
                                onChange={(value) => onChangeValue(value, 'id_readers')}
                            />
                        </Col>
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
                <br />
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Chọn sách</Form.Label>
                            <Select
                                isMulti
                                options={dsOptions}
                                value={borrow.books || []}
                                onChange={(value) => onChangeValue(value, 'books')}
                                placeholder="Chỉ được mươn tối đa 3 quyển sách!"
                                isValidNewOption={isValidNewOption}
                                components={{ Menu }}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <br />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BorrowModal