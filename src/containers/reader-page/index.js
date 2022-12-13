import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, librarianSelector } from '../../reducers/librarian'
import halfCircle from '../../assets/shapes/half-circle.png'
import square from '../../assets/shapes/square.png'
import wave from '../../assets/shapes/wave.png'
import circle from '../../assets/shapes/circle.png'
import triangle from '../../assets/shapes/triangle.png'
import x from '../../assets/shapes/x.png'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { categorySelector, searchCategory } from '../../reducers/category'
import Select from 'react-select';
import { addLoveTitle, deleteLoveTitle, searchTitle, titlesSearchSelector } from '../../reducers/title'
import Header from './Header'
import BookTitleDetails from '../title/book-title-details'
import Footer from './Footer'
import { saveDs, saveOrderLocalStorage } from '../../utils/local_storage_order'
import { addBorrowsReader } from '../../reducers/librarian'


const HomePageReader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const category = useSelector(categorySelector)
    const titles = useSelector(titlesSearchSelector)
    const [keyword, setKeyword] = useState('')
    const [select, setSelect] = useState({
        value: 'all',
        label: 'Tất cả'
    })
    const reader = useSelector(librarianSelector)
    const [orders, setOrders] = useState([])
    const params = useParams()
    const [search] = useSearchParams()
    const [code, setCode] = useState(null)
    // search.get('resultCode')

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    useEffect(() => {
        if (search.get('resultCode') !== null) {
            setCode(search.get('resultCode'))
        }
    }, [search])

    useEffect(() => {
        if (code !== null && +code === 0) {
            dispatch(addBorrowsReader(JSON.parse((localStorage.getItem('borrow')))))
            // localStorage.removeItem(`reader-order-${reader.id_readers}`)
            setCode(null)
            navigate('/readers/home')
        } else if (code !== null && +code === 1006) {
            setCode(null)
            navigate('/readers/home')
        }
    }, [code, dispatch, navigate, reader.id_readers])

    useEffect(() => {
        dispatch(searchCategory(''))
    }, [dispatch])

    useEffect(() => {
        dispatch(searchTitle({ keyword: keyword.replace(/\s+/g, ' ').trim(), category: select.value }))
    }, [dispatch, keyword, select])

    useEffect(() => {
        if (JSON.parse((localStorage.getItem(`reader-order-${reader?.id_readers}`)))) {
            setOrders(JSON.parse((localStorage.getItem(`reader-order-${reader?.id_readers}`))))
        }
    }, [reader])


    const categoryOptions = category.map(item => {
        return {
            value: item.id_category,
            label: item.name_category
        }
    })


    // console.log(reader)
    // const handleKeyDown = async (e) => {
    //     if (e.key === 'Enter') {
    //         dispatch(searchTitle({ keyword: keyword.replace(/\s+/g, ' ').trim(), category: select.value }))
    //         setKeyword('')
    //     }
    // }

    const onChangeValue = (keyValue, keyName) => {
        if (keyName === 'select') {
            setSelect(keyValue)
        } else {
            setKeyword(keyValue)
        }
    }

    const saveLocalStorage = (data) => {
        saveOrderLocalStorage(data, reader.id_readers, setOrders)
    }

    return (
        <>
            <Header titles={titles?.listLove} amount_card={orders?.length || 0} orders={orders} setOrders={saveLocalStorage}
                id_readers={reader?.id_readers}
                load_orders={setOrders}
                name_reader={reader?.first_name + ' ' + reader?.last_name}
                amount_love={titles?.amount_love}
                data={reader}
            />
            {
                params.isbn !== undefined ? (
                    <BookTitleDetails orders={orders} setOrders={setOrders} />
                ) : (
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
                                    <Select
                                        styles={{
                                            option: (styles) => ({
                                                ...styles,
                                            }),
                                            control: (styles) => ({
                                                ...styles,
                                                borderRadius: 40,
                                                height: 45,
                                                width: 300,
                                            }),
                                            menuPortal: (base) => ({
                                                ...base,
                                                zIndex: 99999,
                                            })
                                        }}
                                        options={[...categoryOptions, { value: 'all', label: 'Tất cả' }]}
                                        menuPlacement="auto"
                                        menuPortalTarget={document.body}
                                        value={select}
                                        onChange={(value) => onChangeValue(value, 'select')}
                                    />

                                    <div className='search'>
                                        <label>
                                            <input type="text" placeholder='Tìm kiếm' value={keyword} onChange={(e) => onChangeValue(e.target.value, 'keyword')}
                                            // onKeyDown={handleKeyDown} 
                                            />
                                            <i className="fa-solid fa-magnifying-glass icon"></i>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid">
                                    <Row>
                                        {
                                            titles?.list?.length > 0 && (
                                                titles?.list.map((item, index) => (
                                                    <div className="grid-item logo-design" key={index}>
                                                        <div className="gallery-image">
                                                            <img src={item?.img} alt="" />
                                                            <div className="img-overlay">

                                                                <div className="img-description">
                                                                    <Row >
                                                                        <Col>
                                                                            <i className="fa-solid fa-plus fa-2x float-left"
                                                                                style={{
                                                                                    color: orders.find(order => JSON.stringify(order) === JSON.stringify(saveDs(item))) ? '#09f910' : 'white'
                                                                                }}
                                                                                onClick={() => saveLocalStorage(item)}>
                                                                            </i>
                                                                        </Col>
                                                                        {/* <Col>
                                                                            <h4>{item?.amount_book === null ? 'Hết sách' : 'SL: ' + item?.amount_book}</h4>
                                                                        </Col> */}
                                                                        <Col>
                                                                            <i className="fa-solid fa fa-heart fa-2x float-right" style={{ color: item.love_status ? '#f35539' : 'white' }}
                                                                                onClick={() => dispatch(item.love_status ? deleteLoveTitle(item.isbn) : addLoveTitle(item.isbn))}>
                                                                            </i>
                                                                        </Col>
                                                                    </Row>
                                                                    <Link to={`/readers/ds/${item.isbn}`} state={{ ...item, id_readers: reader.id_readers }}>
                                                                        <h3>{item.name_book}</h3>
                                                                    </Link>

                                                                    <h5>Tác giả:
                                                                        {
                                                                            JSON.parse(item.authors).map((author) => (
                                                                                " " + author.label
                                                                            ))
                                                                        }
                                                                    </h5>
                                                                    <h5 style={{ textAlign: "justify" }}>Giới thiệu: {item?.description?.substring(0, 160) + "..."}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
            <Footer />
        </>
    )
}

export default HomePageReader