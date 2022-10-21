import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLogin, librarianSelector } from '../reducers/librarian';

const ProtectedRoute = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(librarianSelector)

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    useEffect(() => {
        const a = setTimeout(() => {
            setIsLoading(false)
        }, 200)

        return () => clearTimeout(a)
    }, [])

    if (isAuthenticated && user) {
        return (
            <div className="spinner-container">
                {
                    //isLoading ? <Spinner animation="border" variant='info' /> : <Navigate to='/statistical/borrowed-books' replace />
                    isLoading ? <Spinner animation="border" variant='info' />
                        : user?.role === 1 ? <Navigate to='/admin/librarian' replace />
                            : user?.role === 2 ? <Navigate to='/statistical/chart' replace /> : <Navigate to='/readers/home' replace />
                }
            </div>
        )
    }

    return <Outlet />
}

export default ProtectedRoute