import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteLibrarian = ({ isAuthenticated }) => {
    const [isLoading, setIsLoading] = useState(true)
    // const [search] = useSearchParams()
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    // const [code, setCode] = useState(null)


    // useEffect(() => {
    //     if (search.get('resultCode') !== null) {
    //         setCode(search.get('resultCode'))
    //     }
    // }, [search])
    // // console.log(search.get('resultCode'))
    // useEffect(() => {
    //     if (code !== null && +code === 0) {
    //         // dispatch(addBorrowsReader(JSON.parse((localStorage.getItem('borrow')))))
    //         // localStorage.removeItem(`reader-order-${reader.id_readers}`)
    //         setCode(null)

    //         // navigate('/borrow')

    //     }
    // }, [code, dispatch, navigate])

    useEffect(() => {
        const a = setTimeout(() => {
            setIsLoading(false)
        }, 300)

        return () => clearTimeout(a)
    }, [])

    // if(code !== null){
    //     return  <Navigate to='/borrow' replace />
    // }

    if (!isAuthenticated) {
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

export default ProtectedRouteLibrarian