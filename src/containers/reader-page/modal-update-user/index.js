import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import DatePicker from "react-datepicker";

const ModalUpdateUser = ({ isOpen, onClose, value }) => {

    const defaultValue = {
        id_readers: 0,
        citizen_identification: '',
        phone: '',
        first_name: '',
        last_name: '',
        address: '',
        gender: 0,
        email: '',
        date_of_birth: new Date("2012/01/01")
    }

    const [reader, setReader] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setReader(value)
            } else {
                setReader(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newReader = { ...reader }
        newReader[keyName] = keyValue
        setReader(newReader)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // let newReader = { ...reader }
        // delete newReader['id_readers']
        // newReader['date_of_birth'] = reader.date_of_birth.toISOString()

        // if (reader.id_readers === 0) {
        //     dispatch(addReaders(newReader))
        // } else {
        //     dispatch(updateReaders({
        //         id_readers: reader.id_readers,
        //         reader: newReader
        //     }))
        // }

        // onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    Cập nhật thông tin độc giả
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Họ</Form.Label>
                            <Form.Control type="text" required value={reader?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" required value={reader?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>CMND</Form.Label>
                            <Form.Control type="number" required value={reader?.citizen_identification} onChange={(e) => onValueChange(e.target.value, 'citizen_identification')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required value={reader?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="pb-3">
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="number" required value={reader?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Ngày sinh</Form.Label>
                            <DatePicker
                                selected={reader.date_of_birth}
                                onChange={(date) => onValueChange(date, 'date_of_birth')}
                                dateFormat="dd/MM/yyyy"
                                selectsEnd
                                excludeDateIntervals={[{ start: new Date("2013/01/01"), end: new Date("2100/01/01") }]}
                                withPortal
                                showYearDropdown
                                peekNextMonth
                                showMonthDropdown
                                dropdownMode="select"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className="pb-3">
                        <Col>
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select aria-label="Default select example" value={reader?.gender} onChange={(e) => onValueChange(reader?.gender === 1 ? 0 : 1, 'gender')}>
                                <option value={0}>Nam</option>
                                <option value={1}>Nữ</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control as="textarea" rows={4} required value={reader.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button type='submit' variant="primary" onClick={onSubmit}>{reader.id_readers === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default ModalUpdateUser