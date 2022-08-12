import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const a = setTimeout(() => {
            setIsLoading(false)
        }, 200)

        return () => clearTimeout(a)
    }, [])

    if (isAuthenticated) {
        return (
            <div className="spinner-container">
                {
                    isLoading ? <Spinner animation="border" variant='info' /> : <Navigate to='/' replace />
                }
            </div>
        )
    }

    return <Outlet />
}

export default ProtectedRoute