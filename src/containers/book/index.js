import React, { useEffect, useState } from 'react'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import BasicTable from '../../components/table'
import { booksSelector, loadBooks } from '../../reducers/book';
import HomePage from '../../components/home/HomePage';
import BookModal from '../modal/book_modal';

const Book = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const books = useSelector(booksSelector)
    const [book, setBook] = useState()

    useEffect(() => {
        dispatch(loadBooks())
    }, [dispatch])

    const onClose = () => {
        setIsOpen(false)
        setBook()
    }
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
        {
            name: "id_book",
            label: "Hành động",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <OverlayTrigger
                                key={'bottom-edit'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-edit`}>
                                        Cập nhật
                                    </Tooltip>
                                }
                            >
                                <Button variant='primary mr-3' onClick={() => setIsOpen(true)}><i className="fa-solid fa-pen-to-square"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onRowClick = (data) => {
        const temps = books.find(item => item.id_book === data[0])
        setBook({
            id_book: temps.id_book,
            position: temps.position || ""
        })
    }
    return (
        <>
            <HomePage>
                {
                    books && <BasicTable onRowClick={onRowClick} columns={columns} data={books} titleTable="QUẢN LÝ ĐỘC GIẢ" />
                }
                {
                    isOpen && <BookModal isOpen={isOpen} onClose={onClose} value={book} />
                }
            </HomePage>
        </>
    )
}

export default Book