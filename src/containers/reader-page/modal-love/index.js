import React from 'react';
import { Col, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLoveTitle, deleteLoveTitle } from '../../../reducers/title';
import { saveDs } from '../../../utils/local_storage_order';

const ModalLove = ({ isOpen, onClose, titles = [], orders, setOrders }) => {
    const dispatch = useDispatch()
    console.log(titles)

    return (
        <>
            <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='title-love'>DANH SÁCH YÊU THÍCH</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {
                            titles.length > 0 && titles.map((item, index) => (
                                <Col key={index} md={6} className="p-0">
                                    <div className="grid-item-love">
                                        <div className="gallery-image">
                                            <img src={item.img} alt="" />
                                            <div className="img-overlay">

                                                <div className="img-description">
                                                    <Row >
                                                        <Col>
                                                            <i className="fa-solid fa-plus fa-2x float-left"
                                                                style={{
                                                                    color: orders.find(order => JSON.stringify(order) === JSON.stringify(saveDs(item))) ? '#09f910' : 'white'
                                                                }}
                                                                onClick={() => setOrders(item)}
                                                            >
                                                            </i>
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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ModalLove