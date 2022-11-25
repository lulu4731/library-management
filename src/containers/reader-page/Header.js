import React, { useState } from 'react'
import points1 from '../../assets/shapes/points1.png'
import square from '../../assets/shapes/square.png'
import wave from '../../assets/shapes/wave.png'
import letters from '../../assets/shapes/letters.png'
import triangle from '../../assets/shapes/triangle.png'
import x from '../../assets/shapes/x.png'
import circle from '../../assets/shapes/circle.png'
import halfCircle from '../../assets/shapes/half-circle.png'
import '../../assets/style-1.css'
import { Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../../reducers/librarian'
import ModalLove from './modal-love'
import ModalFeedback from './modal-feedback'
import BorrowModal from './modal-borrow/borrow-modal'
import ModalUser from './modal-user'

const Header = ({ titles, amount_card, orders, setOrders, id_readers, load_orders, name_reader, amount_love, data }) => {
    const dispatch = useDispatch()
    const [isOpenLove, setIsOpenLove] = useState(false)
    const [isOpenFeedback, setIsOpenFeedback] = useState(false)
    const [isOpenBorrow, setIsOpenBorrow] = useState(false)
    const [isOpenUser, setIsOpenUser] = useState(false)

    const onCloseLove = () => {
        setIsOpenLove(false)
    }

    const onCloseFeedback = () => {
        setIsOpenFeedback(false)
    }

    const onCloseBorrow = () => {
        setIsOpenBorrow(false)
    }

    const onClose = () => {
        setIsOpenUser(false)
    }

    return (
        <>
            <header className="header">
                <div className="overlay overlay-lg">
                    <img src={square} className="shape square" alt="" />
                    <img src={circle} className="shape circle" alt="" />
                    <img
                        src={halfCircle}
                        className="shape half-circle1"
                        alt=""
                    />
                    <img
                        src={halfCircle}
                        className="shape half-circle2"
                        alt=""
                    />
                    <img src={x} className="shape xshape" alt="" />
                    <img src={wave} className="shape wave wave1" alt="" />
                    <img src={wave} className="shape wave wave2" alt="" />
                    <img src={triangle} className="shape triangle" alt="" />
                    <img src={letters} className="letters" alt="" />
                    <img src={points1} className="points points1" alt="" />
                </div>

                <nav>
                    <div className="container-reader">
                        <Link className="logo" to="/readers/home">
                            <img src='https://www.library-management.com/uploads/60196c0c6f3a8_logo_.png' alt="" className='image' />
                        </Link>

                        <div className="links">
                            <ul>
                                <li onClick={() => setIsOpenLove(true)}>
                                    <div className='a'>
                                        <i className="fa-sharp fa-solid fa-heart fa-2x" style={{ color: 'red' }}><Badge bg="link" className='badge-reader rounded-circle'>{amount_love}</Badge></i>
                                    </div>
                                </li>
                                <li onClick={() => setIsOpenBorrow(true)}>
                                    <div className='a'>
                                        <i className="fa-sharp fa-solid fa-basket-shopping fa-2x"><Badge bg="link" className='badge-reader-cart rounded-circle'>{amount_card}</Badge></i>
                                    </div>
                                </li>
                                <li onClick={() => setIsOpenFeedback(true)}>
                                    <div className='a'>
                                        <i className="fa-sharp fa-solid fa-envelope fa-2x"></i>
                                    </div>
                                </li>
                                <li onClick={() => setIsOpenUser(true)}>
                                    <div className='a'>
                                        <i className="fa-solid fa-user-tie fa-2x"></i>
                                    </div>
                                </li>
                                <li onClick={() => dispatch(setLogout())}>
                                    <Link to='/'>
                                        <i className="fa-solid fa-right-from-bracket fa-2x"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="hamburger-menu">
                            <div className="bar"></div>
                        </div>
                    </div>
                </nav>
            </header>
            {
                isOpenLove && (<ModalLove isOpen={isOpenLove} onClose={onCloseLove} titles={titles} orders={orders} setOrders={setOrders} />)
            }
            {
                isOpenFeedback && (<ModalFeedback isOpen={isOpenFeedback} onClose={onCloseFeedback} />)
            }
            {
                isOpenBorrow && (<BorrowModal isOpen={isOpenBorrow} onClose={onCloseBorrow} orders={orders} setOrders={setOrders}
                    id_readers={id_readers} load_orders={load_orders}
                    name_reader={name_reader}
                />)
            }
            {
                isOpenUser && <ModalUser isOpen={isOpenUser} onClose={onClose} data={data}/>
            }
        </>
    )
}

export default Header