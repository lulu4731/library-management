import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {librarian?.id_librarian === 0 ? 'THÊM THỦ THƯ' : "SỬA THỦ THƯ"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Họ</Form.Label>
                            <Form.Control type="text" required value={librarian?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" required value={librarian?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required value={librarian?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="number" required value={librarian?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select aria-label="Default select example" value={librarian?.gender} onChange={(e) => onValueChange(librarian?.gender === 1 ? 0 : 1, 'gender')}>
                                <option value={0}>Nam</option>
                                <option value={1}>Nữ</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
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
                <Form.Group className="pb-3">
                    <Row>
                        <Col>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control as="textarea" rows={6} required value={librarian?.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button type='submit' variant="primary" onClick={onSubmit}>{librarian?.id_librarian === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default LibrarianModal