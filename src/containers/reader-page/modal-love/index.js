import React, { useState } from 'react';
import { Col, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLoveTitle, deleteLoveTitle } from '../../../reducers/title';

const ModalLove = ({ isOpen, setIsOpen, titles = [] }) => {
    const dispatch = useDispatch()
    // console.log(titles)

    const handleClose = () => {
        setIsOpen(false)
    }
    return (
        <>
            <Offcanvas show={isOpen} onHide={handleClose} placement="end" scroll className="modal-love">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='title-love'>DANH SÁCH YÊU THÍCH</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <div className="grid"> */}
                    <Row>
                        {
                            titles.length > 0 && titles.map((item, index) => (
                                <Col style={{ padding: 0 }} key={index} md={6} className="mb-5">
                                    <div className="grid-item-love">
                                        <div className="gallery-image">
                                            <img src={item.img} alt="" />
                                            <div className="img-overlay">

                                                <div className="img-description">
                                                    <Row >
                                                        <Col>
                                                            <i className="fa-solid fa-plus fa-2x float-left"></i>
                                                        </Col>
                                                        <Col>
                                                            <i className="fa-solid fa fa-heart fa-2x float-right" style={{ color: item.love_status ? '#f35539' : 'white' }}
                                                                onClick={() => dispatch(item.love_status ? deleteLoveTitle(item.isbn) : addLoveTitle(item.isbn))}>
                                                            </i>
                                                        </Col>
                                                    </Row>
                                                    <Link to={`/readers/ds/${item.isbn}`} state={item}>
                                                        <h3>{item.name_book}</h3>
                                                    </Link>

                                                    <h5>Tác giả:
                                                        {
                                                            JSON.parse(item.authors).map((author) => (
                                                                " " + author.label
                                                            ))
                                                        }
                                                    </h5>
                                                    <h5 style={{ textAlign: "justify" }}>Giới thiệu: {item.description}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    {/* </div> */}
                </Offcanvas.Body>
                {/* <Col style={{ maxHeight: '60px', minHeight: '60px' }} className="d-flex">
                    <Col className="float-right">
                        <Button>Đóng</Button>
                    </Col>
                </Col> */}
            </Offcanvas>
        </>
    );
}

export default ModalLove