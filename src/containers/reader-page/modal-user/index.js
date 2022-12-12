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
                            Trang cá nhân
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
                    <h3 style={{ color: '#784cfb' }}>Danh sách phiếu mượn</h3>
                    {
                        data.borrow?.length > 0 && data?.borrow.map((item, index) => (
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
                                            src={"https://menback.com/wp-content/uploads/2022/02/tam-quoc-dien-nghia.jpg"}
                                            style={{
                                                width: "10rem",
                                                height: "8rem",
                                                marginRight: "20px",
                                                borderRadius: 15,
                                            }}
                                        />
                                        <Card.Body style={{ padding: "0px", width: '70%' }}>
                                            <Card.Title style={{ marginTop: 10 }}>
                                                Số sách đã mượn: {JSON.parse(item.books).map((book) => (
                                                    " " + book.ds.label
                                                ))}
                                            </Card.Title>
                                            <Card.Text>
                                                Trạng thái: {JSON.parse(item.books).find((book) => book.borrow_status === 2) ? 'Chờ đến lấy' : 'Đang mượn'}
                                            </Card.Text>
                                            <Card.Text>
                                                Tổng tiền: {(item.total_price * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer
                                            style={{ borderTop: 0, paddingTop: '3%', width: '27%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                            <Card.Text className='mb-2'>
                                                {JSON.parse(item.books).find((book) => book.borrow_status === 2)
                                                    ? 'Ngày lấy: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 2).arrival_date)
                                                    : 'Ngày trả: ' + convertTimesTamp(JSON.parse(item.books).find((book) => book.borrow_status === 0).expired)}
                                            </Card.Text>
                                            {
                                                JSON.parse(item.books).find((book) => book.borrow_status === 0 && book.number_renewal === 0) ?
                                                    <OverlayTrigger
                                                        key={'bottom-eye'}
                                                        placement={'bottom'}
                                                        overlay={
                                                            <Tooltip id={`tooltip-eye`}>
                                                                Xem chi tiết và gia hạn sách
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
                        ))
                    }
                    <Row>
                        <Col><h3 style={{ color: '#784cfb' }}>Danh sách các thông báo</h3></Col>
                        <Col><h5 style={{ float: 'right', margin: 0, padding: 0, cursor: 'pointer' }} onClick={() => dispatch(readAllNotification())}>Đọc tất cả thông báo</h5></Col>
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
                                                &emsp;&emsp;Ngày đưa ra thông báo: {item.day} - {item.time}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer
                                            style={{ backgroundColor: '#f0f8ff', margin: 'auto', border: 0 }}>
                                            <OverlayTrigger
                                                key={'bottom-eye-read'}
                                                placement={'left'}
                                                overlay={
                                                    <Tooltip id={`tooltip-eye-read`}>
                                                        Đánh dấu đã đọc
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
                </Offcanvas.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setIsOpenChangePass(true)}>Thay đổi mật khẩu</Button>
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