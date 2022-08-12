import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loadTitle, titlesSelector } from '../../reducers/title';
import Select from 'react-select';
import { addReceipt, updateReceipt } from '../../reducers/receipt';

const ReceiptModal = ({ modalShow, setModalShow, value }) => {
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
    }, [value])

    const [dsOptions, setDsOptions] = useState([])

    const onClose = () => {
        setModalShow(false)
        setReceipts(defaultValue)
        setDsOptions(ds.map(item => {
            return {
                value: item.isbn,
                label: item.name_book
            }
        }))
    }

    const onAdd = () => {
        let tempsReceipt = receipts.data.map(item => item.ds.value)
        let tempsDS = dsOptions
        for (let i of tempsReceipt) {
            tempsDS = tempsDS.filter(item => item.value !== i)
        }
        setDsOptions(tempsDS)
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
        } else {
            //Chua nhap du thong tin dong tren
        }
    }

    const onDelete = (id) => {
        const temps = receipts.data.filter((_, index) => index !== id)
        setReceipts({
            ...receipts,
            data: temps
        })
    }
    // console.log(receipts)
    const onChangeValue = (id, keyValue, keyName) => {
        const temps = { ...receipts }

        // if (keyName === "ds") {
        //     setDsOptions(dsOptions.filter(item => keyValue.value !== item.value))
        // }

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
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={modalShow}
            onHide={onClose}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    THÊM PHIẾU NHẬP
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className="form-modal" onSubmit={onSubmit}>
                <Modal.Body>
                    {
                        receipts.data.length > 0 && (
                            receipts.data.map((item, index) => (
                                <Form.Group key={index}>
                                    <Row>
                                        <Col>
                                            <Form.Label>Chọn đầu sách</Form.Label>
                                            <Select
                                                options={dsOptions}
                                                value={item.ds}
                                                onChange={(value) => onChangeValue(index, value, 'ds')}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Label>Số lượng</Form.Label>
                                            <Form.Control type="number" require="true" value={item.number_book} onChange={(e) => onChangeValue(index, +e.target.value, 'number_book')} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Giá</Form.Label>
                                            <Form.Control type="number" require="true" value={item.price} onChange={(e) => onChangeValue(index, +e.target.value, 'price')} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Thành tiền</Form.Label>
                                            <Form.Control type="text" disabled value={(item.price * item.number_book).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} />
                                        </Col>
                                        <div className='mt-3'>
                                            <Button variant='link' className='text-decoration-none mt-3 mr-3' onClick={() => onDelete(index)}><i className="fa-solid fa-x"></i></Button>
                                        </div>
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
                        <Col style={{ marginRight: '55px', marginLeft: '55px' }}>
                            <Form.Label>Tổng tiền</Form.Label>
                            <Form.Control type="text" disabled value={receipts.data.reduce(
                                (previousValue, currentValue) => previousValue + (currentValue.number_book * currentValue.price),
                                0
                            ).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>Add</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ReceiptModal