import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Badge, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { banReaders, dieReaders } from '../../reducers/readers';
import { toastError } from '../../toast/toast';
import { sendEmailLock } from '../../utils/sendEmail'

const LockModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_readers: 0,
        first_name: '',
        last_name: '',
        type_lock: {
            label: 'Khóa theo giờ',
            value: 1
        },
        hours_lock: 1,
        reason: ''
    }

    const [lock, setLock] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setLock({ ...defaultValue, ...value })
            } else {
                setLock(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const onChangeValue = (keyValue, keyName) => {
        const newLock = { ...lock }
        newLock[keyName] = keyValue
        setLock(newLock)
    }

    const onSubmit = () => {
        if (lock.type_lock.value === 1) {
            if (lock.hours_lock > 0) {
                const data = {
                    id_readers: lock.id_readers,
                    lock: {
                        reason: lock.reason,
                        hours_lock: +lock.hours_lock
                    }
                }

                const email = {
                    real_name: lock.first_name + ' ' + lock.last_name,
                    reason: lock.reason,
                    lock_type: `trong ${lock.hours_lock} giờ`,
                    email: lock.email
                }
                // console.log(email)
                sendEmailLock(email)
                dispatch(banReaders(data))
            } else {
                toastError('Số giờ khóa phải lớn hơn 0')
            }
        } else {
            const data = {
                id_readers: lock.id_readers,
                lock: {
                    reason: lock.reason,
                }
            }
            const email = {
                real_name: lock.first_name + ' ' + lock.last_name,
                reason: lock.reason,
                lock_type: `khóa vĩnh viễn`,
                email: lock.email
            }
            // console.log(email)
            sendEmailLock(email)
            dispatch(dieReaders(data))
        }

        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>KHÓA TÀI KHOẢN ĐỘC GIẢ</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Tên độc giả</Form.Label>
                            <Badge className='ml-2'>{lock?.first_name + ' ' + lock?.last_name}</Badge>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Lý do khóa</Form.Label>
                            <Form.Control as="textarea" rows={5} value={lock.reason} onChange={(e) => onChangeValue(e.target.value, 'reason')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Loại khóa</Form.Label>
                            <Select
                                options={[
                                    {
                                        label: 'Khóa theo giờ',
                                        value: 1
                                    },
                                    {
                                        label: 'Khóa vĩnh viễn',
                                        value: 2
                                    }
                                ]}
                                value={lock.type_lock}
                                onChange={(value) => onChangeValue(value, 'type_lock')}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                {
                    lock.type_lock.value === 1 && (
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Số giờ khóa</Form.Label>
                                    <Form.Control type="number" value={lock.hours_lock} onChange={(e) => onChangeValue(e.target.value, 'hours_lock')} />
                                </Col>
                            </Row>
                        </Form.Group>
                    )
                }
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>Khóa</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default LockModal