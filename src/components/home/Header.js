import React, { useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ChangePassModal from '../../containers/modal/change-pass-modal'
import { setToggle } from '../../reducers/book'

const Header = ({ toggle }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()


    const onCLose = () => {
        setIsOpen(false)
    }
    return (
        <div className='topbar'>
            <div className='toggle'>
                <i className="fa-solid fa-bars" onClick={() => dispatch(setToggle())}></i>
            </div>

            <div className='search'>
                {/* <label>
                    <input type="text" placeholder='Tìm kiếm' />
                    <i className="fa-solid fa-magnifying-glass icon"></i>
                </label> */}
                <img src='https://www.library-management.com/uploads/60196c0c6f3a8_logo_.png' alt='logo' width={200} height={100} />
                {/* <img src='https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/WHAT-IS-THE-PURPOSE-OF-A-LIBRARY-MANAGEMENT-SYSTEM-min.png' alt='logo' width={200} height={80}/> */}
            </div>


            <Dropdown>
                {/* <Dropdown.Toggle variant="success" id="dropdown-basic"> */}
                <Dropdown.Toggle className='user' variant='link' id="dropdown-basic">
                    <Image src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" width={50} height={50} />
                </Dropdown.Toggle>
                {/* </Dropdown.Toggle> */}

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setIsOpen(true)}>Thay đổi mật khẩu</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {
                isOpen && <ChangePassModal isOpen={isOpen} onClose={onCLose} />
            }
        </div>
    )
}

export default Header