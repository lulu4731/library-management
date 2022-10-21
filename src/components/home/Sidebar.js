import React, { useState } from 'react'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { hoveredSelector, setHovered } from '../../reducers/book'
import { setLogout } from '../../reducers/librarian'

const Sidebar = ({ toggle }) => {
    const dispatch = useDispatch()
    const hovered = useSelector(hoveredSelector)
    // const [hovered, setHovered] = useState(0)
    const entering = (e) => {
        e.children[0].style.border = 'rgb(119 106 207)';
        e.children[1].style.backgroundColor = 'rgb(119 106 207)';
    };

    const [hide, setHide] = useState(false)

    return (
        <div className={`navigation${toggle}`}>
            <ul>
                <li>
                    <Link to='/statistical'>
                        <span className='icon'><i className="fa-solid fa-book-open ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>QUẢN LÝ THƯ VIỆN</span>
                    </Link>
                </li>
                {/* <li className={hovered === 1 ? 'hovered' : ''} onClick={() => dispatch(setHovered(1))}>
                    <Link to='/statistical' >
                        <span className='icon'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Thống kê</span>
                    </Link>
                </li> */}
                <li className={hovered === 1 ? 'hovered' : ''} onClick={() => dispatch(setHovered(1))}>
                    <Link to='' onClick={() => setHide(!hide)}>
                        <span className='icon'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Thống kê</span>
                    </Link>
                    {
                        hide && (
                            <div style={{ fontWeight: 'bold', paddingLeft: '14px' }}>
                                <Link to='/statistical/chart' onClick={() => setHide(true)}>
                                    <span className='icon-dropdown'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                                    <span className='title-dropdown' style={{ fontWeight: 'bold' }}>Biểu đồ thống kê</span>
                                </Link>
                                <Link to='/statistical/borrowed-books' onClick={() => setHide(true)}>
                                    <span className='icon-dropdown'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                                    <span className='title-dropdown' style={{ fontWeight: 'bold' }}>Số sách được mượn</span>
                                </Link>
                                <Link to='/statistical/borrowed-readers' onClick={() => setHide(true)}>
                                    <span className='icon-dropdown'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                                    <span className='title-dropdown' style={{ fontWeight: 'bold' }}>Số sách độc giả mượn</span>
                                </Link>
                                <Link to='/statistical/overdue-book' onClick={() => setHide(true)}>
                                    <span className='icon-dropdown'><i className="fa-solid fa-chart-line ion-icon"></i></span>
                                    <span className='title-dropdown' style={{ fontWeight: 'bold' }}>Sách quá hạn</span>
                                </Link>
                            </div>
                        )
                    }

                </li>
                <li className={hovered === 2 ? 'hovered' : ''} onClick={() => dispatch(setHovered(2))}>
                    <Link to='/readers'>
                        <span className='icon'><i className="fa-solid fa-user-group ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý độc giả</span>
                    </Link>
                </li>
                <li className={hovered === 3 ? 'hovered' : ''} onClick={() => dispatch(setHovered(3))}>
                    <Link to='/authors'>
                        <span className='icon'><i className="fa-solid fa-user-pen ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý tác giả</span>
                    </Link>
                </li>
                <li className={hovered === 4 ? 'hovered' : ''} onClick={() => dispatch(setHovered(4))}>
                    <Link to='/category'>
                        <span className='icon'><i className="fa-solid fa-shapes ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý thể loại</span>
                    </Link>
                </li>
                <li className={hovered === 10 ? 'hovered' : ''} onClick={() => dispatch(setHovered(10))}>
                    <Link to='/company'>
                        <OverlayTrigger
                            delay={{ hide: 100, show: 100 }}
                            overlay={(props) => (
                                <Tooltip {...props} id="button-tooltip">
                                    Nhà xuất bản
                                </Tooltip>
                            )}
                            placement="right"
                            onEntering={entering}
                        >
                            <span className='icon'><i className="fa-solid fa-house ion-icon"></i></span>
                        </OverlayTrigger>
                        <span className='title' style={{ fontWeight: 'bold' }}>Nhà xuất bản</span>
                    </Link>
                </li>
                <li className={hovered === 5 ? 'hovered' : ''} onClick={() => dispatch(setHovered(5))}>
                    <Link to='/title'>
                        <span className='icon'><i className="fa-solid fa-book ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý đầu sách</span>
                    </Link>
                </li>
                <li className={hovered === 6 ? 'hovered' : ''} onClick={() => dispatch(setHovered(6))}>
                    <Link to='/books'>
                        <span className='icon'><i className="fa-solid fa-address-book ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý sách</span>
                    </Link>
                </li>
                <li className={hovered === 7 ? 'hovered' : ''} onClick={() => dispatch(setHovered(7))}>
                    <Link to='/receipt'>
                        <span className='icon'><i className="fa-solid fa-file-circle-plus ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Phiếu nhập</span>
                    </Link>
                </li>
                <li className={hovered === 8 ? 'hovered' : ''} onClick={() => dispatch(setHovered(8))}>
                    <Link to='/liquidation'>
                        <span className='icon'><i className="fa-solid fa-file-circle-minus ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Phiếu thanh lý</span>
                    </Link>
                </li>
                <li className={hovered === 9 ? 'hovered' : ''} onClick={() => dispatch(setHovered(9))}>
                    <Link to='/borrow'>
                        <span className='icon'><i className="fa-solid fa-id-card-clip ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Phiếu mượn sách</span>
                    </Link>
                </li>
                <li onClick={() => dispatch(setLogout())}>
                    <Link to='/'>
                        <span className='icon'><i className="fa-solid fa-right-from-bracket ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Đăng xuất</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar