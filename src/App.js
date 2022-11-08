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
import { checkLogin, isAuthenticatedSelector, librarianSelector } from './reducers/librarian';
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoute from './view/ProtectedRoute';
import ProtectedRouteAdmin from './view/ProtectedRouteAdmin';
import NotFound from './view/NotFound';
import StatisticalPage from './containers/statistical';
import Page from './components/home/Page';
import BorrowedBooks from './containers/statistical/borrowed-books';
import BorrowedReaders from './containers/statistical/borrowed-readers';
import OverdueBook from './containers/statistical/overdue-book';
import ProtectedRouteReaders from './view/ProtectedRouterReaders';
import HomePageReader from './containers/reader-page';
import ProtectedRouteLibrarian from './view/ProtectedRouterLibrarian';
import LibrarianPage from './containers/admin-page/librarian-page';
import BookTitleDetails from './containers/title/book-title-details';
import FeedbackPage from './containers/admin-page/feedback-page';

function App() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(isAuthenticatedSelector)
    const user = useSelector(librarianSelector)

    // console.log(user)

    // useEffect(() => {
    //     dispatch(checkLogin())
    // }, [dispatch])

    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path='/' element={<Page />} />
                        <Route path='/login' element={<LoginPage />} />
                    </Route>

                    <Route element={<ProtectedRouteAdmin isAuthenticated={isAuthenticated} />}>
                        <Route path='/admin/librarian' element={<LibrarianPage />} />
                        <Route path='/admin/feedback' element={<FeedbackPage />} />
                    </Route>

                    <Route element={<ProtectedRouteLibrarian isAuthenticated={isAuthenticated} />}>
                        <Route path='/statistical/chart' element={<StatisticalPage />} />
                        <Route path='/statistical/borrowed-books' element={<BorrowedBooks />} />
                        <Route path='/statistical/borrowed-readers' element={<BorrowedReaders />} />
                        <Route path='/statistical/overdue-book' element={<OverdueBook />} />
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

                    {/* <Route element={<ProtectedRouteReaders isAuthenticated={isAuthenticated} />}> */}
                    <Route path='/readers/home' element={<HomePageReader />} />
                    <Route path='/readers/ds/:isbn' element={<HomePageReader />} />
                    {/* </Route> */}

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
