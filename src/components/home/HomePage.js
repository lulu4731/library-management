import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleSelector } from '../../reducers/book'
import Header from './Header'
import Sidebar from './Sidebar'

const HomePage = ({ children }) => {
    const toggle = useSelector(toggleSelector)

    return (
        <>
            <div className="container-app">
                <Sidebar toggle={toggle ? ' active' : ''} />
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

export default HomePage