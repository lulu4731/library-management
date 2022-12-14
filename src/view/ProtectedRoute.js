import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { checkLogin, librarianSelector } from '../reducers/librarian';
import { addBorrows } from '../reducers/borrow'

const ProtectedRoute = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(librarianSelector)
    const [search] = useSearchParams()
    const [code, setCode] = useState(null)

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    useEffect(() => {
        if (search.get('resultCode') !== null) {
            setCode(search.get('resultCode'))
        }
    }, [search])

    useEffect(() => {
        if (code !== null && +code === 0) {
            dispatch(addBorrows(JSON.parse((localStorage.getItem('borrowLibrarian')))))
            localStorage.removeItem(`borrowLibrarian`)
            // setCode(null)
        }
    }, [code, dispatch])


    useEffect(() => {
        const a = setTimeout(() => {
            setIsLoading(false)
        }, 200)

        return () => clearTimeout(a)
    }, [])

    // console.log(code)
    // console.log(typeof code)

    if (isAuthenticated && user) {
        return (
            <div className="spinner-container">
                {
                    //isLoading ? <Spinner animation="border" variant='info' /> : <Navigate to='/statistical/borrowed-books' replace />
                    isLoading ? <Spinner animation="border" variant='info' />
                        : user?.role === 1 ? <Navigate to='/admin/librarian' replace />
                            : user?.role === 2 ? <Navigate to={code === null ? '/statistical/chart' : '/borrow'} replace /> : <Navigate to='/readers/home' replace={false} />
                }
            </div>
        )
    }

    return <Outlet />
}

export default ProtectedRoute