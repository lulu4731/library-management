import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import BasicTable from '../../components/table'
import { booksSelector, loadBooks } from '../../reducers/book';
import ReadersModal from '../modal/readers-modal';
import HomePage from '../../components/home/HomePage';

const Book = () => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const books = useSelector(booksSelector)

    useEffect(() => {
        dispatch(loadBooks())
    }, [dispatch])

    const columns = [
        {
            name: "id_book",
            label: "Mã sách",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ds",
            label: "Thuộc đầu sách",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg="info">{JSON.parse(value).label}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "position",
            label: "Vị trí sách",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id_liquidation",
            label: "Trạng thái thanh lý",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value === null ? 'primary' : 'danger'}>{value === null ? 'Được sử dụng' : 'Đã thanh lý'}</Badge>
                        </div>
                    );
                }
            },
        },
        {
            name: "id_status",
            label: "Trạng thái",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value === 0 ? 'success' : value === 1 ? 'warning' : 'danger'}>{value === 0 ? 'Chưa được mượn' : value === 1 ? 'Đã đươc mượn' : 'Sách bị mất'}</Badge>
                        </div>
                    );
                }
            },
        },
    ];
    return (
        <>
            <HomePage>
                <BasicTable columns={columns} data={books} titleButton="Thêm độc giả" setModalShow={setModalShow} titleTable="QUẢN LÝ ĐỘC GIẢ" />
                <ReadersModal modalShow={modalShow} setModalShow={setModalShow} />
            </HomePage>
        </>
    )
}

export default Book