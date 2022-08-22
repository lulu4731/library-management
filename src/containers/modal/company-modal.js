import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addCompany, updateCompany } from '../../reducers/company';

const CompanyModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_publishing_company: 0,
        name_publishing_company: '',
        address: '',
        phone: '',
        email: ''
    }

    const [company, setCompany] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setCompany(value)
            } else {
                setCompany(defaultValue)
            }
        }
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newCompany = { ...company }
        newCompany[keyName] = keyValue
        setCompany(newCompany)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newCompany = { ...company }
        delete newCompany['id_publishing_company']

        if (company.id_publishing_company === 0) {
            dispatch(addCompany(newCompany))
        } else {
            dispatch(updateCompany({
                id_publishing_company: company.id_publishing_company,
                company: newCompany
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
                    THÊM TÁC GIẢ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Tên nhà xuất bản</Form.Label>
                                <Form.Control type="text" required value={company?.name_publishing_company} onChange={(e) => onValueChange(e.target.value, 'name_publishing_company')} />
                            </Col>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" required value={company?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="text" required value={company?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                            </Col>
                            <Col>
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" required value={company?.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>{company.id_publishing_company === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CompanyModal