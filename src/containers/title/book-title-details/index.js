import React, { useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../../reader-page/Header'
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

const BookTitleDetails = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()

    const { img, name_book, category, company, authors, description, page, publishing_year, love_status } = location.state

    const [love, setLove] = useState(love_status)
    // console.log(params.isbn)
    // console.log(location)


    const onChangeHeart = () => {
        if (love) {
            dispatch(deleteLoveTitle(+params.isbn))
        } else {
            dispatch(addLoveTitle(+params.isbn))
        }

        setLove(!love)
    }
    return (
        <>
            <Header />
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
                        {/* <h3 className="title-home">Website quản lý thư viện</h3> */}
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
                                            {/* <div class="plus"></div> */}

                                            <i className="fa-solid fa fa-heart fa-2x heart-details" style={{ color: love ? '#f35539' : 'white' }}
                                                onClick={onChangeHeart}
                                            >
                                            </i>

                                            {/* <Link to={`/readers/ds/${item.isbn}`} state={item}>
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
                                                </h5> */}

                                        </div>
                                    </div>
                                </div>
                                {/* <Col>
                                    <Image src={img} />
                                </Col> */}
                                <Col>
                                    <div className="section-header">
                                        <h3 className="title-home">{name_book}</h3>
                                    </div>
                                    <p className='title-book-details'>Thể loại: {JSON.parse(category).label}</p>
                                    <p className='title-book-details'>Tác giả: {JSON.parse(authors).map((item) => item.label + " ")}</p>
                                    <p className='title-book-details'>Nhà xuất bản: {JSON.parse(company).label}</p>
                                    <p className='title-book-details'>Số trang: {page}</p>
                                    <p className='title-book-details'>Năm xuất bản: {convertTimesTamp(publishing_year)}</p>
                                    <p className='title-book-details'>Giới thiệu: {description}</p>


                                    <Button className='mr-3 mt-3'>Thêm vào danh sách mượn</Button>
                                    {/* <Button className='mt-5'>{!love_status ? 'Yêu thích' : "Chưa yêu thích"}</Button> */}
                                </Col>
                            </Row>
                            <div class="product-info-tabs">
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="description-tab" data-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Mô tả chi tiết</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Bình luận</a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="myTabContent">
                                    <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                        {description}
                                    </div>
                                    <div class="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                                        {/* <div class="review-heading">REVIEWS</div>
                                        <p class="mb-20">There are no reviews yet.</p>
                                        <form class="review-form">
                                            <div class="form-group">
                                                <label>Your rating</label>
                                                <div class="reviews-counter">
                                                    <div class="rate">
                                                        <input type="radio" id="star5" name="rate" value="5" />
                                                        <label for="star5" title="text">5 stars</label>
                                                        <input type="radio" id="star4" name="rate" value="4" />
                                                        <label for="star4" title="text">4 stars</label>
                                                        <input type="radio" id="star3" name="rate" value="3" />
                                                        <label for="star3" title="text">3 stars</label>
                                                        <input type="radio" id="star2" name="rate" value="2" />
                                                        <label for="star2" title="text">2 stars</label>
                                                        <input type="radio" id="star1" name="rate" value="1" />
                                                        <label for="star1" title="text">1 star</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Your message</label>
                                                <textarea class="form-control" rows="10"></textarea>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <input type="text" name="" class="form-control" placeholder="Name*" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <input type="text" name="" class="form-control" placeholder="Email Id*" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="round-black-btn">Submit Review</button>
                                        </form> */}
                                        <ShowComment/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >


            <footer className="footer">
                <div className="container-home">
                    <div className="grid-4">
                        <div className="grid-4-col footer-about">
                            <h3 className="title-sm">Thông tin</h3>
                            <p className="text">
                                Website quản lý thư viện Học Viện Công Nghệ Bưu Chính Viễn Thông
                            </p>
                        </div>

                        <div className="grid-4-col footer-links">
                            {/* <h3 className="title-sm">Links</h3>
                            <ul>
                                <li>
                                    <a href="#services">Services</a>
                                </li>
                                <li>
                                    <a href="#portfolio">Portfolio</a>
                                </li>
                                <li>
                                    <a href="#about">About</a>
                                </li>
                                <li>
                                    <a href="#testimonials">Testimonials</a>
                                </li>
                                <li>
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul> */}
                        </div>

                        <div className="grid-4-col footer-links">
                            {/* <h3 className="title-sm">Services</h3>
                            <ul>
                                <li>
                                    <a href="#">Web Design</a>
                                </li>
                                <li>
                                    <a href="#">Web Dev</a>
                                </li>
                                <li>
                                    <a href="#">App Design</a>
                                </li>
                                <li>
                                    <a href="#">Marketing</a>
                                </li>
                                <li>
                                    <a href="#">UI Design</a>
                                </li>
                            </ul> */}
                        </div>

                        <div className="grid-4-col footer-newstletter">
                            <h3 className="title-sm">Liên hệ</h3>
                            <p className="text">
                                Mọi thông tin vui lòng liên hệ với chúng tôi qua các địa chỉ sau
                            </p>
                            {/* <div className="footer-input-wrap">
                                <input type="email" className="footer-input" placeholder="Email" />
                                <a href="#" className="input-arrow">
                                    <i className="fas fa-angle-right"></i>
                                </a>
                            </div> */}
                            <p className="text">
                                Email: dangnguyen0401@gmail.com
                            </p>
                            <p className="text">
                                SDT: 0327876080
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default BookTitleDetails