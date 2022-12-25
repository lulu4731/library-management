import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import convertTimesTamp from '../../../utils/convertTimesTamp'
import './style.css'
import halfCircle from '../../../assets/shapes/half-circle.png'
import square from '../../../assets/shapes/square.png'
import wave from '../../../assets/shapes/wave.png'
import circle from '../../../assets/shapes/circle.png'
import triangle from '../../../assets/shapes/triangle.png'
import x from '../../../assets/shapes/x.png'
import { useDispatch } from 'react-redux'
import { addLoveTitle, deleteLoveTitle } from '../../../reducers/title'
import ShowComment from '../../comment/ShowComment'
import { saveDs, saveOrderLocalStorage } from '../../../utils/local_storage_order'

const BookTitleDetails = ({ orders, setOrders }) => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()

    const { img, name_book, category, company, authors, description, page, publishing_year, love_status, id_readers } = location.state

    const [love, setLove] = useState(love_status)

    const onChangeHeart = () => {
        if (love) {
            dispatch(deleteLoveTitle(+params.isbn))
        } else {
            dispatch(addLoveTitle(+params.isbn))
        }

        setLove(!love)
    }

    const saveLocalStorage = (data) => {
        saveOrderLocalStorage(data, id_readers, setOrders)
    }
    return (
        <>
            <section className="portfolio section details" id="portfolio">
                <div className="background-bg-details">
                    <div className="overlay overlay-sm">
                        <img src={halfCircle} className="shape half-circle1" alt="" />
                        <img src={halfCircle} className="shape half-circle2" alt="" />
                        <img src={square} className="shape square" alt="" />
                        <img src={wave} className="shape wave" alt="" />
                        <img src={circle} className="shape circle" alt="" />
                        <img src={triangle} className="shape triangle" alt="" />
                        <img src={x} className="shape xshape" alt="" />
                    </div>
                </div>

                <div className="container-home">
                    <div className="section-header">
                    </div>

                    <div className="section-body">
                        <div className="filter">

                        </div>

                        <div className="grid">
                            <Row>
                                <div className="grid-item-details logo-design">
                                    <div className="gallery-image">
                                        <img src={img} alt="" />
                                        <div className="img-overlay">
                                            <i className="fa-solid fa fa-heart fa-2x heart-details" style={{ color: love ? '#f35539' : 'white' }}
                                                onClick={onChangeHeart}
                                            >
                                            </i>
                                        </div>
                                    </div>
                                </div>
                                <Col>
                                    <div className="section-header">
                                        <h3 className="title-home">{name_book}</h3>
                                    </div>
                                    <p className='title-book-details'>Thể loại: {JSON.parse(category).label}</p>
                                    <p className='title-book-details'>Tác giả: {JSON.parse(authors).map((item) => item.label + " ")}</p>
                                    <p className='title-book-details'>Nhà xuất bản: {JSON.parse(company).label}</p>
                                    <p className='title-book-details'>Số trang: {page}</p>
                                    <p className='title-book-details'>Năm xuất bản: {convertTimesTamp(publishing_year)}</p>
                                    <p className='title-book-details'>Giới thiệu: {description.substring(0, 180) + "..."}</p>
                                    <Button className='mr-3 mt-3' onClick={() => saveLocalStorage(location.state)}>{orders.find(order => JSON.stringify(order) === JSON.stringify(saveDs(location.state))) ? "Xóa khỏi danh sách mượn" : "Thêm vào danh sách mượn"}</Button>
                                </Col>
                            </Row>
                            <div className="product-info-tabs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Mô tả chi tiết</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Bình luận</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                        {description}
                                    </div>
                                    <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                        <ShowComment />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookTitleDetails