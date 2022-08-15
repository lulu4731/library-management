import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import { addReaders, updateReaders } from '../../reducers/readers';
import convertDate from '../../utils/convertDate';

const ReadersModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

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
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newReader = { ...reader }
        newReader[keyName] = keyValue
        setReader(newReader)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newReader = { ...reader }
        delete newReader['id_readers']
        newReader['date_of_birth'] = convertDate(reader.date_of_birth)

        if (reader.id_readers === 0) {
            dispatch(addReaders(newReader))
        } else {
            dispatch(updateReaders({
                id_readers: reader.id_readers,
                reader: newReader
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
                    THÊM ĐỘC GIẢ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form onSubmit={onSubmit} className="form-modal">
                <Modal.Body >
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Họ</Form.Label>
                                <Form.Control type="text" required value={reader?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                            </Col>
                            <Col>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control type="text" required value={reader?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>CMND</Form.Label>
                                <Form.Control type="number" required value={reader?.citizen_identification} onChange={(e) => onValueChange(e.target.value, 'citizen_identification')} />
                            </Col>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required value={reader?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="number" required value={reader?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                            </Col>
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
                    <br />
                    <Form.Group>
                        <Row>
                            <Col md={3}>
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select aria-label="Default select example" value={reader?.gender} onChange={(e) => onValueChange(reader?.gender === 1 ? 0 : 1, 'gender')}>
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" required value={reader.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button type='submit' variant="primary">{reader.id_readers === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default ReadersModal