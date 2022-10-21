import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { hoveredSelector, setHovered } from '../../reducers/book'
import { setLogout } from '../../reducers/librarian'

const SidebarAdmin = ({ toggle }) => {
    const dispatch = useDispatch()
    const hovered = useSelector(hoveredSelector)
    // const [hovered, setHovered] = useState(0)
    // const entering = (e) => {
    //     e.children[0].style.border = 'rgb(119 106 207)';
    //     e.children[1].style.backgroundColor = 'rgb(119 106 207)';
    // };

    return (
        <div className={`navigation${toggle}`}>
            <ul>
                <li>
                    <Link to='/admin/librarian'>
                        <span className='icon'><i className="fa-solid fa-book-open ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>QUẢN LÝ THƯ VIỆN</span>
                    </Link>
                </li>
                <li className={hovered === 1 ? 'hovered' : ''} onClick={() => dispatch(setHovered(1))}>
                    <Link to='/admin/librarian'>
                        <span className='icon'><i className="fa-solid fa-user-group ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý thủ thư</span>
                    </Link>
                </li>
                <li className={hovered === 2 ? 'hovered' : ''} onClick={() => dispatch(setHovered(2))}>
                    <Link to='/admin/feedback'>
                        <span className='icon'><i className="fa-solid fa-message ion-icon"></i></span>
                        <span className='title' style={{ fontWeight: 'bold' }}>Quản lý phản hồi</span>
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

export default SidebarAdmin