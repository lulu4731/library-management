import React, { useState } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas, Image, Card } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { paymentBorrow } from '../../../utils/callerAPI';
import { toastError } from '../../../toast/toast';
import { useDispatch } from 'react-redux';
import { addBorrowsReader } from '../../../reducers/librarian';

const BorrowModal = ({ isOpen, onClose, orders, setOrders, id_readers, load_orders, name_reader }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        arrival_date: new Date(),
        books: []
    }

    const [borrow, setBorrow] = useState(defaultValue)

    const onChangeValue = (keyValue, keyName) => {
        const newBorrow = { ...borrow }
        newBorrow[keyName] = keyValue

        setBorrow(newBorrow)
    }

    const onSubmit = async () => {
        const newBorrow = { ...borrow }
        delete newBorrow['arrival_date']
        newBorrow['books'] = orders.map(item => {
            return { id_book: item.value, arrival_date: borrow.arrival_date.toISOString().split('T')[0] }
        })

        if (newBorrow.books.length <= 3) {
            const pay = {
                name_reader,
                amount: orders.reduce((previousValue, currentValue) => previousValue + (currentValue.price * 1), 0),
                books: newBorrow.books

            }
            newBorrow['total_price'] = pay.amount

            localStorage.setItem(`borrow`, JSON.stringify(newBorrow))

            if (pay.amount > 0) {
                const data = await paymentBorrow(pay)
                if (data.status === 200) {
                    window.location = data.link
                    onClose()
                    localStorage.removeItem(`reader-order-${id_readers}`)
                    setBorrow(defaultValue)
                    load_orders([])
                } else {
                    toastError(data.message)
                    if (data.data) {
                        load_orders(orders.filter(item => item.value !== data.data.isbn))
                        localStorage.setItem(`reader-order-${id_readers}`, JSON.stringify(orders.filter(item => item.value !== data.data.isbn)))
                    }
                }
            } else {
                const data = await dispatch(addBorrowsReader(newBorrow))
                if (data.payload.code === 400) {
                    load_orders(orders.filter(item => item.value !== data.payload.data.isbn))
                    // const temps = orders.filter((item) => item.value !== data.payload.data.isbn)
                    localStorage.setItem(`reader-order-${id_readers}`, JSON.stringify(orders.filter((item) => item.value !== data.payload.data.isbn)))
                    // setOrders(temps)
                }
                if (data.payload.code === 201) {
                    onClose()
                    localStorage.removeItem(`reader-order-${id_readers}`)
                    setBorrow(defaultValue)
                    load_orders([])
                }
            }
        } else {
            toastError('Bạn chỉ mượn tối đa được 3 quyển')
        }
    }

    const onDeleteDs = (data) => {
        const ds = {
            isbn: data.value,
            name_book: data.label,
            img: data.img,
            authors: data.authors,
            category: data.category,
            price: data.price
        }
        setOrders(ds)
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>GỬI PHẢN HỒI ĐẾN ADMIN</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='mb-4'>
                    <Row>
                        <Col md={5}>
                            <Form.Label>Ngày dự kiến đến nhận sách</Form.Label>
                            <DatePicker
                                selected={borrow.arrival_date}
                                onChange={(date) => onChangeValue(date, 'arrival_date')}
                                dateFormat="dd/MM/yyyy"
                                // withPortal
                                showYearDropdownF
                                scrollableYearDropdown={true}
                                yearDropdownItemNumber={100}
                                peekNextMonth
                                showMonthDropdown
                                dropdownMode="select"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label >Danh sách phiếu mượn (Bạn chỉ chọn ra 3 quyển sách để mượn)</Form.Label>
                    {
                        orders?.length > 0 && orders.map((item, index) => (
                            <Row className='mb-4' key={index}>
                                <Col>
                                    <Card
                                        style={{
                                            flexDirection: "row",
                                            border: "2px solid rgba(11, 131, 230, 0.4)",
                                            boxShadow: "rgba(11, 131, 230, 0.4) 0px 0px 1rem",
                                            backgroundColor: " #f0f8ff",
                                            borderRadius: 17
                                        }}
                                    >
                                        <Image
                                            src={item.img}
                                            style={{
                                                width: "10rem",
                                                height: "8rem",
                                                marginRight: "20px",
                                                borderRadius: 15,
                                            }}
                                        />
                                        <Card.Body style={{ padding: "0px" }}>
                                            <Card.Title style={{ marginTop: 10 }}>
                                                {item.label}
                                            </Card.Title>
                                            <Card.Text>
                                                Tác giả: {JSON.parse(item.authors).map((author) => (
                                                    " " + author.label
                                                ))}
                                            </Card.Text>
                                            <Card.Text>
                                                Thể loại: {JSON.parse(item.category).label}
                                            </Card.Text>
                                            <Card.Text>
                                                Giá mượn: {(item.price * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer
                                            onClick={() => onDeleteDs(item)}
                                            style={{ borderTop: 0, paddingTop: '6%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                            <i className="fa-solid fa-trash-can fa-2x"></i>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                    }
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Col className='p-0'>
                    <Button variant='success'>Tổng tiền: {orders.reduce(
                        (previousValue, currentValue) => previousValue + (currentValue.price * 1), 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                    </Button>
                </Col>
                <Col className='p-0'>
                    <Button variant="primary" className="float-right ml-3" onClick={onSubmit}>Thêm phiếu mượn</Button>
                    <Button variant='secondary' className="float-right" onClick={onClose}>Đóng</Button>
                </Col>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default BorrowModal