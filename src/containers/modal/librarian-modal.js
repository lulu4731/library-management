import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { addLibrarian, updateLibrarian } from '../../reducers/librarian';

const LibrarianModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_librarian: 0,
        phone: '',
        first_name: '',
        last_name: '',
        address: '',
        gender: 0,
        email: '',
        date_of_birth: new Date()
    }

    const [librarian, setLibrarian] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setLibrarian(value)
            } else {
                setLibrarian(defaultValue)
            }
        }
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newLibrarian = { ...librarian }
        newLibrarian[keyName] = keyValue
        setLibrarian(newLibrarian)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newLibrarian = { ...librarian }
        delete newLibrarian['id_librarian']
        newLibrarian['date_of_birth'] = librarian.date_of_birth.toISOString().split('T')[0]

        if (librarian.id_librarian === 0) {
            dispatch(addLibrarian(newLibrarian))
        } else {
            dispatch(updateLibrarian({
                id_librarian: librarian.id_librarian,
                librarian: newLibrarian
            }))
        }

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
                    TẠO THỦ THƯ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form onSubmit={onSubmit} className="form-modal">
                <Modal.Body >
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Họ</Form.Label>
                                <Form.Control type="text" required value={librarian?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                            </Col>
                            <Col>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control type="text" required value={librarian?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required value={librarian?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                            </Col>
                            <Col>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="number" required value={librarian?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col md={3}>
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select aria-label="Default select example" value={librarian?.gender} onChange={(e) => onValueChange(librarian?.gender === 1 ? 0 : 1, 'gender')}>
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Ngày sinh</Form.Label>
                                <DatePicker
                                    selected={librarian?.date_of_birth}
                                    onChange={(date) => onValueChange(date, 'date_of_birth')}
                                    dateFormat="dd/MM/yyyy"
                                    selectsEnd
                                    withPortal
                                    showYearDropdown
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
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" required value={librarian?.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button type='submit' variant="primary">{librarian?.id_librarian === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default LibrarianModal