import React, { useState } from 'react'
import points1 from '../../assets/shapes/points1.png'
import square from '../../assets/shapes/square.png'
import wave from '../../assets/shapes/wave.png'
import letters from '../../assets/shapes/letters.png'
import triangle from '../../assets/shapes/triangle.png'
import x from '../../assets/shapes/x.png'
import circle from '../../assets/shapes/circle.png'
import halfCircle from '../../assets/shapes/half-circle.png'
import logo from '../../assets/shapes/logo.png'
import points2 from '../../assets/shapes/points2.png'
import person from '../../assets/shapes/person.png'
import '../../assets/style-1.css'
import { Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogout } from '../../reducers/librarian'
import ModalLove from './modal-love'
import ModalFeedback from './modal-feedback'

const Header = ({ titles }) => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenFeedback, setIsOpenFeedback] = useState(false)


    return (
        <>
            <ModalLove isOpen={isOpen} setIsOpen={setIsOpen} titles={titles} />
            <ModalFeedback isOpen={isOpenFeedback} setIsOpen={setIsOpenFeedback} />
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
                        <div className="logo">
                            <img src='https://www.library-management.com/uploads/60196c0c6f3a8_logo_.png' alt="" className='image' />
                        </div>

                        <div className="links">
                            <ul>
                                <li onClick={() => setIsOpen(true)}>
                                    <Link to='#'>
                                        <i className="fa-sharp fa-solid fa-heart fa-2x red" style={{ color: 'red' }}><Badge bg="link" className='badge-reader rounded-circle'>{titles.length}</Badge></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='#'>
                                        <i className="fa-sharp fa-solid fa-basket-shopping fa-2x"><Badge bg="link" className='badge-reader-cart rounded-circle'>8</Badge></i>
                                    </Link>
                                </li>
                                <li onClick={() => setIsOpenFeedback(true)}>
                                    <Link to='#'>
                                        <i class="fa-sharp fa-solid fa-envelope fa-2x"></i>
                                    </Link>
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
        </>
    )
}

export default Header