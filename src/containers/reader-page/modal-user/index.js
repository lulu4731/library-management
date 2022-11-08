import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Form, Image, Modal, Offcanvas, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import ModalUpdateUser from '../modal-update-user'

const ModalUser = ({ isOpen, onClose }) => {
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)

    const onCloseUpdate = () => {
        setIsOpenUpdate(false)
    }
    return (
        <>
            <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
                <Offcanvas.Header closeButton className='pb-0'>
                    <Offcanvas.Title className='title-love'>
                        <Card className="post-user-card"
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                border: "0",
                                // padding: "5px 30px",
                                justifyContent: "center",
                                alignItems: "center",
                                // marginTop: '25px',
                                backgroundColor: '#F0F8FF'
                            }}
                        >
                            <Image
                                src={"https://vaithuhayho.com/wp-content/uploads/2021/03/anh-avatar-dep-36.jpg"}
                                roundedCircle
                                style={{
                                    width: "4rem",
                                    height: "4rem",
                                }}
                            />
                            &nbsp; Trang cá nhân
                        </Card>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card className="post-user-card"
                        style={{
                            // flexDirection: "row",    
                            width: "100%",
                            border: "0",
                            // padding: "5px 30px",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // marginTop: '25px',
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
                        <i className="fa-solid fa-pen-to-square image-user"></i>
                        <Card.Body
                            style={{ padding: "10px" }}
                        >
                            <Card.Title
                                style={{ fontSize: "28px" }}
                            >
                                {/* {author.real_name}{" "} */}
                                <span
                                    style={{
                                        color: "#2596be",
                                    }}
                                >
                                    Nguyễn Dương Hải Đăng
                                </span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                    <h3 style={{ color: '#784cfb' }}>Danh sách phiếu mượn</h3>
                    <Row className='mb-4'>
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
                                        Số sách đã mượn: Tam quốc diễn nghĩa, Tuyển tập thơ Hồ Xuân Hương, Tuyển tập thơ Xuân Diệu
                                    </Card.Title>
                                    <Card.Text>
                                        Trạng thái: Chờ đến lấy
                                    </Card.Text>
                                    <Card.Text>
                                        Tổng tiền: 10000 VND
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer
                                    style={{ borderTop: 0, paddingTop: '3%', width: '27%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                    <Card.Text className='mb-2'>
                                        Ngày lấy: 11/11/2022
                                    </Card.Text>
                                    <OverlayTrigger
                                        key={'bottom-eye'}
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-eye`}>
                                                Xem chi tiết và gia hạn sách
                                            </Tooltip>
                                        }
                                    >
                                        <Button><i className="fa-solid fa-eye"></i></Button>
                                    </OverlayTrigger>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
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
                                        Số sách đã mượn: Tam quốc diễn nghĩa, Tuyển tập thơ Hồ Xuân Hương, Tuyển tập thơ Xuân Diệu
                                    </Card.Title>
                                    <Card.Text>
                                        Trạng thái: Chờ đến lấy
                                    </Card.Text>
                                    <Card.Text>
                                        Tổng tiền: 10000 VND
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer
                                    style={{ borderTop: 0, paddingTop: '4%', width: '27%', backgroundColor: '#ffa0a0', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                                    <Card.Text>
                                        Trạng thái: Chờ đến lấy
                                    </Card.Text>
                                    <Card.Text>
                                        Ngày lấy: 11/11/2022
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Offcanvas.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setIsOpenUpdate(true)}>Thay đổi mật khẩu</Button>
                    {/* <Button variant="primary" >Gửi phản hồi</Button> */}
                </Modal.Footer>
            </Offcanvas>
            {
                isOpenUpdate && <ModalUpdateUser isOpen={isOpenUpdate} onClose={onCloseUpdate} />
            }
        </>
    )
}

export default ModalUser