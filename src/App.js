import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css"
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReadersPage from './containers/readers';
import HomePage from './components/home/HomePage';
import AuthorsPage from './containers/authors';
import Category from './containers/category';
import Title from './containers/title';
import Book from './containers/book';
import Receipt from './containers/receipt';
import Liquidation from './containers/liquidation';
import Borrow from './containers/borrow';
import CompanyPage from './containers/company';
import LoginPage from './containers/user';
import { ToastContainer } from "react-toastify"
import { checkLogin, isAuthenticatedSelector } from './reducers/librarian';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoute from './view/ProtectedRoute';
import ProtectedRouteAdmin from './view/ProtectedRouteAdmin';
import NotFound from './view/NotFound';
import StatisticalPage from './containers/statistical';

function App() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(isAuthenticatedSelector)

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path='/login' element={<LoginPage />} />
                    </Route>

                    <Route element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated} />}>
                        <Route path='/' element={<StatisticalPage />} />
                        <Route path='/readers' element={<ReadersPage />} />
                        <Route path='/authors' element={<AuthorsPage />} />
                        <Route path='/category' element={<Category />} />
                        <Route path='/title' element={<Title />} />
                        <Route path='/books' element={<Book />} />
                        <Route path='/receipt' element={<Receipt />} />
                        <Route path='/liquidation' element={<Liquidation />} />
                        <Route path='/borrow' element={<Borrow />} />
                        <Route path='/company' element={<CompanyPage />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
                {/* {
                    isAuthenticated && (
                        <div className="container-app">
                            <Sidebar toggle={toggle} />
                            <div className={`main${toggle}`}>
                                <Header toggle={toggle} setToggle={setToggle} />
                                <div className='p-3'>
                                    <Routes>
                                        <Route element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated} />}>
                                            <Route path='/' element={<HomePage />} />
                                            <Route path='/readers' element={<ReadersPage />} />
                                            <Route path='/authors' element={<AuthorsPage />} />
                                            <Route path='/category' element={<Category />} />
                                            <Route path='/title' element={<Title />} />
                                            <Route path='/books' element={<Book />} />
                                            <Route path='/receipt' element={<Receipt />} />
                                            <Route path='/liquidation' element={<Liquidation />} />
                                            <Route path='/borrow' element={<Borrow />} />
                                            <Route path='/company' element={<CompanyPage />} />
                                            <Route path="*" element={<div>sssss</div>} />
                                        </Route>
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    )
                } */}
            </BrowserRouter>
        </div >
    );
}

export default App;
