import React from 'react'
import { useSelector } from 'react-redux'
import { toggleSelector } from '../../reducers/book'
import Header from './Header'
import SidebarAdmin from './SidebarAdmin'

const HomePageAdmin = ({ children }) => {
    const toggle = useSelector(toggleSelector)

    return (
        <>
            <div className="container-app">
                <SidebarAdmin toggle={toggle ? ' active' : ''} />
                <div className={`main${toggle ? ' active' : ''}`}>
                    <Header toggle={toggle ? ' active' : ''} />
                    <div className='p-3'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePageAdmin