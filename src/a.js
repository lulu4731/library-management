import React, { useState } from 'react'
import Header from './components/home/Header'
import Sidebar from './components/home/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRouteAdmin from './view/ProtectedRouteAdmin';
import HomePage from './components/home/HomePage';
import ReadersPage from './containers/readers';
import AuthorsPage from './containers/authors';
import Category from './containers/category';
import Title from './containers/title';
import Book from './containers/book';
import Receipt from './containers/receipt';
import Liquidation from './containers/liquidation';
import Borrow from './containers/borrow';
import CompanyPage from './containers/company';

const Test = () => {
    const [toggle, setToggle] = useState('')
    return (
        <div className="container-app">
            <Sidebar toggle={toggle} />
            <div className={`main${toggle}`}>
                <Header toggle={toggle} setToggle={setToggle} />
                <div className='p-3'>
                <ReadersPage/>
                    {/* <Routes> */}
                        {/* <Route element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated} />}> */}
                            {/* <Route path='/' element={<HomePage />} />
                            <Route path='/readers' element={<ReadersPage />} />
                            <Route path='/authors' element={<AuthorsPage />} />
                            <Route path='/category' element={<Category />} />
                            <Route path='/title' element={<Title />} />
                            <Route path='/books' element={<Book />} />
                            <Route path='/receipt' element={<Receipt />} />
                            <Route path='/liquidation' element={<Liquidation />} />
                            <Route path='/borrow' element={<Borrow />} />
                            <Route path='/company' element={<CompanyPage />} /> */}
                        {/* </Route> */}
                    {/* </Routes> */}
                </div>
            </div>
        </div>
    )
}

export default Test