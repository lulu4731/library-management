import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Col, Image, Modal, Offcanvas, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusNotification, loadNotification, notificationsSelector, readAllNotification } from '../../../reducers/notification'
import convertTimesTamp from '../../../utils/convertTimesTamp'
import ChangePassModal from '../../modal/change-pass-modal'
import PayModal from '../../modal/pay-modal'
import ReadersModal from '../../modal/readers-modal'

const ModalUser = ({ isOpen, onClose, data }) => {
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenPay, setIsOpenPay] = useState(false)
    const [isOpenChangePass, setIsOpenChangePass] = useState(false)
    const [item, setItem] = useState()
    const notifications = useSelector(notificationsSelector)
    const dispatch = useDispatch()

    const onCloseUpdate = () => {
        setIsOpenUpdate(false)
        setIsOpenPay(false)
        setIsOpenChangePass(false)
    }

    const onPay = (data) => {
        setItem({
            ...data,
            librarian: JSON.parse(data.librarian),
            reader: JSON.parse(data.reader),
            books: JSON.parse(data.books),
        })

        setIsOpenPay(true)
    }

    useEffect(() => {
        dispatch(loadNotification())
    }, [dispatch])

    const onChangeStatus = (id_notification) => {
        dispatch(changeStatusNotification(id_notification))
    }

    console.log(data)
    return (
        <>
            <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
                <Offcanvas.Header closeButton className='pb-0'>
                    <Offcanvas.Title className='title-love'>
                        <Card className="post-user-card"
                            style={{
                                width: "100%",
                                border: "0",
                                backgroundColor: '#F0F8FF'
                            }}
                        >
                            Trang c?? nh??n
                        </Card>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='pt-0'>
                    <Card className="post-user-card"
                        style={{
                            width: "100%",
                            border: "0",
                            backgroundColor: '#F0F8FF'
                        }}
                    >
                        <Image
                            src={"https://vaithuhayho.com/wp-content/uploads/2021/03/anh-avatar-dep-36.jpg"}
                            roundedCircle
                            style={{
                                width: "6rem",
                                height: "6rem",
                            }}
                        />
                        <i className="fa-solid fa-pen-to-square image-user" onClick={() => setIsOpenUpdate(true)}></i>
                        <Card.Body
                            style={{ padding: "10px" }}
                        >
                            <Card.Title
                                style={{ fontSize: "28px" }}
                            >
                                <span
                                    style={{
                                        color: "#2596be",
                                    }}
                                >
                                    {data?.first_name + ' ' + data?.last_name}
                                </span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    <h3 style={{ color: '#784cfb' }}>Danh s??ch phi???u m?????n</h3>
                    {
                        data.borrow?.length > 0 && data?.borrow.map((item, index) => {
                            if (JSON.parse(item.books).find((book) => book.borrow_status === 2) || JSON.parse(item.books).find((book) => book.borrow_status === 4) || JSON.parse(item.books).find((book) => book.borrow_status === 0)) {
                                return (
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
                                                    src={JSON.parse(item.books)[0]?.ds?.img}
                                                    style={{
                                                        width: "10rem",
                                                        height: "8rem",
                                                        marginRight: "20px",
                                                        borderRadius: 15,
                                                    }}
                                                />
                                                <Card.Body style={{ padding: "0px", width: '70%' }}>
                                                    <Card.Title style={{ marginTop: 10 }}>
                                                        S??? s??ch ???? m?????n: {JSON.parse(item.books).map((book) => (
                                                            " " + book.ds.label
                                                        ))}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {/* Tr???ng th??i: {JSON.parse(item.books).find((book) => book.borrow_status === 2) ?
                                                    'Ch??a duy???t' : JSON.parse(item.books).find((book) => book.borrow_status === 4) ? '???? duy???t, ?????n l???y s??ch' : '??ang m?????n'} */}
                                                        Tr???ng th??i:
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 2) && ' Ch??a duy???t'}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 4) && ' ???? duy???t, ?????n l???y s??ch'}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 0) && ' ??ang m?????n'}
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 1) && ' ???? tr???'}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 3) && ' M???t s??ch'} */}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        T???ng ti???n: {(item.total_price * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer
                                                    style={{ borderTop: 0, paddingTop: '3%', width: '27%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                                    <Card.Text className='mb-2'>
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 2) || JSON.parse(item.books).find((book) => book.borrow_status === 4)
                                                    ? 'Ng??y l???y: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 2)?.arrival_date || JSON.parse(item.books).find((book) => book.borrow_status === 4)?.arrival_date)
                                                    : 'Ng??y tr???: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 0).expired)} */}
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 2) || JSON.parse(item.books).find((book) => book.borrow_status === 4)
                                                    ? 'Ng??y l???y: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 2)?.arrival_date || JSON.parse(item.books).find((book) => book.borrow_status === 4)?.arrival_date)
                                                    : 'Ng??y tr???: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 0).expired)} */}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 2) && 'Ng??y l???y: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 2)?.arrival_date)}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 4) && 'Ng??y l???y: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 4)?.arrival_date)}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 0) && 'Ng??y tr???: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 0)?.expired)}
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 3) && 'Ng??y b??o m???t s??ch: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 3)?.date_return_book)} */}
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 3) && 'Ng??y b??o m???t s??ch: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 3)?.date_return_book)} */}
                                                        {/* {JSON.parse(item.books).find((book) => book.borrow_status === 1) && 'Ng??y tr??? s??ch: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 1)?.date_return_book)} */}
                                                    </Card.Text>
                                                    {
                                                        JSON.parse(item.books).find((book) => book.borrow_status === 0 && book.number_renewal === 0) ?
                                                            <OverlayTrigger
                                                                key={'bottom-eye'}
                                                                placement={'bottom'}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-eye`}>
                                                                        Xem chi ti???t v?? gia h???n s??ch
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button onClick={() => onPay(item)}><i className="fa-solid fa-eye"></i></Button>
                                                            </OverlayTrigger> : <></>
                                                    }
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            } else {
                                return <></>
                            }
                        })
                    }
                    <Row>
                        <Col><h3 style={{ color: '#784cfb' }}>Danh s??ch c??c th??ng b??o</h3></Col>
                        <Col><h5 style={{ float: 'right', margin: 0, padding: 0, cursor: 'pointer' }} onClick={() => dispatch(readAllNotification())}>?????c t???t c??? th??ng b??o</h5></Col>
                    </Row>
                    {
                        notifications?.length > 0 && notifications.map((item, index) => (
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
                                        <Card.Body className="pt-0">
                                            <Card.Title style={{ marginTop: 10 }}>
                                                {item.title}
                                            </Card.Title>
                                            <Card.Text>
                                                &emsp;&emsp;{item.content}
                                            </Card.Text>
                                            <Card.Text>
                                                &emsp;&emsp;Ng??y ????a ra th??ng b??o: {item.day} - {item.time}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer
                                            style={{ backgroundColor: '#f0f8ff', margin: 'auto', border: 0 }}>
                                            <OverlayTrigger
                                                key={'bottom-eye-read'}
                                                placement={'left'}
                                                overlay={
                                                    <Tooltip id={`tooltip-eye-read`}>
                                                        ????nh d???u ???? ?????c
                                                    </Tooltip>
                                                }
                                            >
                                                <i className="fa-regular fa-eye fa-2x" onClick={() => onChangeStatus(item.id_notification)}></i>
                                            </OverlayTrigger>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                    }
                    <h3 style={{ color: '#784cfb' }}>Danh s??ch t???t c??? c??c phi???u m?????n ???? ho??n th??nh</h3>
                    {
                        data.borrow?.length > 0 && data?.borrow.map((item, index) => {
                            if (JSON.parse(item.books).find((book) => book.borrow_status === 3) || JSON.parse(item.books).find((book) => book.borrow_status === 1)) {
                                return (
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
                                                    src={JSON.parse(item.books)[0]?.ds?.img}
                                                    style={{
                                                        width: "10rem",
                                                        height: "8rem",
                                                        marginRight: "20px",
                                                        borderRadius: 15,
                                                    }}
                                                />
                                                <Card.Body style={{ padding: "0px", width: '70%' }}>
                                                    <Card.Title style={{ marginTop: 10 }}>
                                                        S??? s??ch ???? m?????n: {JSON.parse(item.books).map((book) => (
                                                            " " + book.ds.label
                                                        ))}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        Tr???ng th??i:
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 1) && ' ???? tr???'}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 3) && ' M???t s??ch'}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        T???ng ti???n: {(item.total_price * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer
                                                    style={{ borderTop: 0, paddingTop: '3%', width: '27%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                                    <Card.Text className='mb-2'>
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 1) && 'Ng??y tr???: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 1)?.date_return_book)}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 1) && <br />}
                                                        {JSON.parse(item.books).find((book) => book.borrow_status === 3) && 'Ng??y b??o m???t s??ch: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 3)?.date_return_book)}
                                                    </Card.Text>
                                                    {/* {
                                                        JSON.parse(item.books).find((book) => book.borrow_status === 0 && book.number_renewal === 0) ?
                                                            <OverlayTrigger
                                                                key={'bottom-eye'}
                                                                placement={'bottom'}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-eye`}>
                                                                        Xem chi ti???t v?? gia h???n s??ch
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button onClick={() => onPay(item)}><i className="fa-solid fa-eye"></i></Button>
                                                            </OverlayTrigger> : <></>
                                                    } */}
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                            } else {
                                return <></>
                            }
                        })
                    }
                </Offcanvas.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setIsOpenChangePass(true)}>Thay ?????i m???t kh???u</Button>
                </Modal.Footer>
            </Offcanvas>
            {
                isOpenUpdate && <ReadersModal isOpen={isOpenUpdate} onClose={onCloseUpdate} value={{
                    ...data,
                    date_of_birth: data?.date_of_birth ? new Date(convertTimesTamp(data?.date_of_birth)) : new Date("2012/01/01")
                }} />
            }
            {
                isOpenPay && <PayModal isOpen={isOpenPay} onClose={onCloseUpdate} value={item} hide={false} />
            }
            {
                isOpenChangePass && <ChangePassModal isOpen={isOpenChangePass} onClose={onCloseUpdate} />
            }
        </>
    )
}

export default ModalUser