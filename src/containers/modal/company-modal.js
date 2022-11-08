import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
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
         // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {company.id_publishing_company === 0 ? 'THÊM NHÀ XUẤT BẢN' : "SỬA NHÀ XUẤT BẢN"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Tên nhà xuất bản</Form.Label>
                            <Form.Control type="text" required value={company?.name_publishing_company} onChange={(e) => onValueChange(e.target.value, 'name_publishing_company')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" required value={company?.email} onChange={(e) => onValueChange(e.target.value, 'email')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" required value={company?.phone} onChange={(e) => onValueChange(e.target.value, 'phone')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control as="textarea" rows={6} required value={company?.address} onChange={(e) => onValueChange(e.target.value, 'address')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>{company.id_publishing_company === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default CompanyModal