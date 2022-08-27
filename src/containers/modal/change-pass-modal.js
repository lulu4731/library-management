import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../toast/toast';
import { changePassword } from '../../utils/callerAPI';

const ChangePassModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        old_pass: '',
        new_pass: '',
        confirm_pass: ''
    }

    const [changePass, setChangePass] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setChangePass(value)
            } else {
                setChangePass(defaultValue)
            }
        }
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newPass = { ...changePass }
        newPass[keyName] = keyValue
        setChangePass(newPass)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const newPass = { ...changePass }

        if (newPass.new_pass === newPass.confirm_pass) {
            const response = await changePassword(newPass)
            if (response.status === 200) {
                toastSuccess(response.message)
            } else {
                toastError(response.message)
            }
        } else {
            toastError('Mật khẩu và nhập lại mật khẩu mới không trùng nhau')
        }
        onClose()
    }

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={isOpen}
            onHide={onClose}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    THAY ĐỔI MẬT KHẨU
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Nhập mật khẩu cũ</Form.Label>
                                <Form.Control type="password" required value={changePass?.old_pass} onChange={(e) => onValueChange(e.target.value, 'old_pass')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Nhập mật khẩu mới</Form.Label>
                                <Form.Control type="password" required value={changePass?.new_pass} onChange={(e) => onValueChange(e.target.value, 'new_pass')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                                <Form.Control type="password" required value={changePass?.confirm_pass} onChange={(e) => onValueChange(e.target.value, 'confirm_pass')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>Thay đổi</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ChangePassModal