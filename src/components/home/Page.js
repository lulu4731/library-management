import React, { useEffect, useState } from 'react'
import '../../assets/style.css'
import halfCircle from '../../assets/shapes/half-circle.png'
import square from '../../assets/shapes/square.png'
import wave from '../../assets/shapes/wave.png'
import circle from '../../assets/shapes/circle.png'
import triangle from '../../assets/shapes/triangle.png'
import x from '../../assets/shapes/x.png'
import E from '../../assets/portfolio/port1.jpg'
import { Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { categorySelector, loadCategory } from '../../reducers/category'
import Select from 'react-select';
import { loadTitle, titlesSelector } from '../../reducers/title'
import { searchDS } from '../../utils/callerAPI'
import ModalLove from '../../containers/reader-page/modal-love'

const Page = () => {
    // const [active, setActive] = useState(0)
    const category = useSelector(categorySelector)
    const titles = useSelector(titlesSelector)
    const dispatch = useDispatch()
    const [titlesFilter, setTitleFilter] = useState(titles)
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(loadCategory())
        dispatch(loadTitle())
    }, [dispatch])

    useEffect(() => {
        setTitleFilter(titles)
    }, [titles])


    const categoryOptions = category.map(item => {
        return {
            value: item.id_category,
            label: item.name_category
        }
    })

    const [select, setSelect] = useState({
        value: 'all',
        label: 'Tất cả'
    })

    const onChangeValue = (keyValue, keyName) => {
        if (keyName === 'select') {
            if (keyValue.value === 'all') {
                setTitleFilter(titles)
            } else {
                const temps = titles.filter(item => JSON.parse(item.category).value === keyValue.value)
                setTitleFilter(temps)
            }

            setSelect(keyValue)
        } else {
            setKeyword(keyValue)
        }
    }

    const images = [
        'https://i.ytimg.com/vi/MwoNwRzx0Ak/maxresdefault.jpg',
        'https://menback.com/wp-content/uploads/2022/02/tam-quoc-dien-nghia.jpg',
        'https://product.hstatic.net/200000079237/product/z2020187226535_9f6815013ed480db121ef3dbaf48a5e1_8e0dadd1867a45fa8686af1577ebdd1d_master.jpg',
        'https://i.ytimg.com/vi/GaD1J6hGZ_4/maxresdefault.jpg',
        'https://cdnimg.vietnamplus.vn/uploaded/tpuoaob/2021_04_02/vnp_long1.jpg',
        'https://scr.vn/wp-content/uploads/2021/01/Tho-Xuan-Dieu.jpg'
    ]

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const response = await searchDS(keyword.replace(/\s+/g, ' ').trim())
            if (response.status === 200) {
                setTitleFilter(response.data)
            }
            setKeyword('')
        }
    }
    return (
        <>

            <section className="portfolio section" id="portfolio">
                <div className="background-bg">
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
                        <h3 className="title-home">Website quản lý thư viện</h3>
                    </div>

                    <div className="section-body">
                        <div className="filter">
                            {/* <button className={`filter-btn ${active === 0 && 'active'}`} data-filter="*" onClick={() => setActive(0)}>Tất cả</button>
                                    <button className={`filter-btn ${active === 1 && 'active'}`} data-filter=".ui" onClick={() => setActive(1)}>Công nghệ thông tin</button>
                                    <button className={`filter-btn ${active === 2 && 'active'}`} data-filter=".webdev" onClick={() => setActive(2)}>Khoa học</button>
                                    <button className={`filter-btn ${active === 4 && 'active'}`} data-filter=".logo-design" onClick={() => setActive(4)}>
                                        Văn học
                                    </button> */}
                            <Select
                                styles={{
                                    option: (styles) => ({
                                        ...styles,
                                        // borderRadius: 20
                                    }),
                                    control: (styles) => ({
                                        // none of react-select's styles are passed to <Control />\
                                        ...styles,
                                        // margin: 5,
                                        // height: 45,
                                        borderRadius: 40,
                                        height: 45,
                                        width: 300,
                                    }),

                                }}
                                options={[...categoryOptions, { value: 'all', label: 'Tất cả' }]}
                                menuPlacement="top"
                                value={select}
                                onChange={(value) => onChangeValue(value, 'select')}
                            />

                            <div className='search'>
                                <label>
                                    <input type="text" placeholder='Tìm kiếm' value={keyword} onChange={(e) => onChangeValue(e.target.value, 'keyword')} onKeyDown={handleKeyDown} />
                                    <i className="fa-solid fa-magnifying-glass icon"></i>
                                </label>
                            </div>
                            <Button className={`filter-btn filter-btn active`} variant='primary' as={Link} to="/login">
                                Đăng nhập
                            </Button>
                        </div>

                        <div className="grid">
                            <Row>
                                {
                                    titlesFilter.length > 0 && (
                                        titlesFilter.map((item, index) => (
                                            <div className="grid-item logo-design" key={index}>
                                                <div className="gallery-image">
                                                    <img src={item?.img} alt="" />
                                                    <div className="img-overlay">
                                                        {/* <div className="plus"></div> */}
                                                        <div className="img-description">
                                                            <h3>{item.name_book}</h3>
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
                                        ))
                                    )
                                }

                                {/* <div className="grid-item webdev">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>Web Development</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item ui webdev">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>Web Design</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item ui">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>UI / UX Design</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item logo-design">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>Logo Design</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item appdev">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>App Development</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item logo-design">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>Logo Design</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item appdev ui">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>App Development</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item ui webdev">
                                    <div className="gallery-image">
                                        <img src={E} alt="" />
                                        <div className="img-overlay">
                                            <div className="plus"></div>
                                            <div className="img-description">
                                                <h3>Web Design</h3>
                                                <h5>View Demo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </Row>
                        </div>
                    </div>
                </div>
            </section>


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

export default Page