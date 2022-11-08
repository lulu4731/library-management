import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadTitle, titlesSelector } from '../../reducers/title';
import Select from 'react-select';
import { addReceipt, updateReceipt } from '../../reducers/receipt';

const ReceiptModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()
    const ds = useSelector(titlesSelector)

    const defaultValue = {
        id_receipt: 0,
        data: [
            {
                ds: {
                    value: 0,
                    label: ''
                },
                number_book: '',
                price: ''
            }
        ]
    }

    const [receipts, setReceipts] = useState(defaultValue)

    useEffect(() => {
        dispatch(loadTitle())
    }, [dispatch])

    useEffect(() => {
        setDsOptions(ds.map(item => {
            return {
                value: item.isbn,
                label: item.name_book
            }
        }))
    }, [ds])

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setReceipts(value)
            } else {
                setReceipts(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const [dsOptions, setDsOptions] = useState([])

    const onAdd = () => {
        let tempsReceipt = receipts.data.map(item => item.ds.value)
        let tempsDS = dsOptions
        for (let i of tempsReceipt) {
            tempsDS = tempsDS.filter(item => item.value !== i)
        }
        setDsOptions(tempsDS)
        console.log(tempsReceipt)
        console.log(tempsDS)
        if (tempsReceipt[tempsReceipt.length - 1] !== 0) {
            setReceipts({
                ...receipts,
                data: [...receipts.data, {
                    ds: {
                        value: 0,
                        label: ''
                    },
                    number_book: '',
                    price: 0

                }]
            })
        }
    }

    const onDelete = (id) => {
        const temps = receipts.data.filter((_, index) => index !== id)
        setReceipts({
            ...receipts,
            data: temps
        })
        setDsOptions(ds.map(item => {
            return {
                value: item.isbn,
                label: item.name_book
            }
        }))
    }

    const onChangeValue = (id, keyValue, keyName) => {
        const temps = { ...receipts }
        const newReceipts = { ...receipts.data[id] }

        newReceipts[keyName] = keyValue
        temps.data[id] = newReceipts

        setReceipts(temps)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (receipts.id_receipt === 0) {
            dispatch(addReceipt(receipts.data))
        } else {
            dispatch(updateReceipt({
                id_receipt: receipts.id_receipt,
                receipt: receipts.data
            }))
        }

        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {receipts.id_receipt === 0 ? 'THÊM PHIẾU NHẬP' : "SỬA PHIẾU NHẬP"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row>
                    <Col md={4}><Form.Label>Chọn đầu sách</Form.Label></Col>
                    <Col md={2}><Form.Label>Số lượng</Form.Label></Col>
                    <Col><Form.Label>Giá</Form.Label></Col>
                    <Col><Form.Label>Thành tiền</Form.Label></Col>
                    <Col md={1}>
                    </Col>
                </Row>
                {
                    receipts.data.length > 0 && (
                        receipts.data.map((item, index) => (
                            <Form.Group key={index}>
                                <Row>
                                    <Col md={4}>
                                        <Select
                                            options={dsOptions}
                                            value={item.ds}
                                            onChange={(value) => onChangeValue(index, value, 'ds')}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control type="number" require="true" value={item.number_book} onChange={(e) => onChangeValue(index, +e.target.value, 'number_book')} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="tel" require="true" value={(+item.price).toLocaleString()} onChange={(e) => onChangeValue(index, e.target.value.replace(/\D/g, ''), 'price')} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" disabled value={(item.price * item.number_book).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} />
                                    </Col>
                                    <Col md={1}>
                                        <Button variant='link' className='text-decoration-none p-2 mr-3' onClick={() => onDelete(index)}><i className="fa-solid fa-x"></i></Button>
                                    </Col>
                                </Row>
                                <br />
                            </Form.Group>
                        ))
                    )
                }
                <Row>
                    <Col md={8}>
                        <Button variant='link' className='text-decoration-none' onClick={onAdd}><i className="fa-solid fa-plus"></i> Thêm đầu sách</Button>
                    </Col>
                    <Col style={{ marginRight: '30px', marginLeft: '40px' }}>
                        <Form.Label>Tổng tiền</Form.Label>
                        <Form.Control type="text" disabled value={receipts.data.reduce(
                            (previousValue, currentValue) => previousValue + (currentValue.number_book * currentValue.price),
                            0
                        ).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} />
                    </Col>
                </Row>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>{receipts.id_receipt === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default ReceiptModal