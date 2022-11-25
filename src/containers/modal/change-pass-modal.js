import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
// import { useDispatch } from 'react-redux';
import { toastError, toastSuccess } from '../../toast/toast';
import { changePassword } from '../../utils/callerAPI';

const ChangePassModal = ({ isOpen, onClose, value }) => {
    // const dispatch = useDispatch()

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>THAY ĐÔI MẬT KHẨU</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
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

            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>Thay đổi</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default ChangePassModal