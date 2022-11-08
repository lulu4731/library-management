import React, { useEffect, useState } from 'react'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { booksSelector, loadBooks, searchBooks } from '../../reducers/book';
import HomePage from '../../components/home/HomePage';
import BookModal from '../modal/book_modal';
import TableBootstrap from '../../components/table/table-bootstrap';

const Book = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const books = useSelector(booksSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchBooks(keyword.replace(/\s+/g, ' ').trim()))
    }, [dispatch, keyword])

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const header =
    {
        customRender: () => {
            return (
                <div className='search-table'>
                    <label style={{ marginBottom: 0 }}>
                        <input type="text" placeholder='Tìm kiếm' value={keyword} onChange={e => setKeyword(e.target.value)} />
                        <i className="fa-solid fa-magnifying-glass icon"></i>
                    </label>
                </div>
            );
        }
    }
    const columns = [
        {
            name: "ds",
            label: "Thuộc đầu sách",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg="info">{JSON.parse(value.ds).label}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "position",
            label: "Vị trí sách",
        },
        {
            name: "id_liquidation",
            label: "Trạng thái thanh lý",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value.id_liquidation === null ? 'primary' : 'danger'}>{value.id_liquidation === null ? 'Được sử dụng' : 'Đã thanh lý'}</Badge>
                        </div>
                    );
                }
            },
        },
        {
            name: "id_status",
            label: "Trạng thái sử dụng",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value.id_status === 0 ? 'success' : value === 1 ? 'warning' : 'danger'}>{value.id_status === 0 ? 'Chưa được mượn' : value === 1 ? 'Đã đươc mượn' : 'Sách bị mất'}</Badge>
                        </div>
                    );
                }
            },
        },
        {
            name: "action",
            label: "Hành động",
            options: {
                status: true,
                customRender: (value) => {
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
                                <Button variant='primary mr-3' onClick={() => onUpdate(value)}><i className="fa-solid fa-pen-to-square"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onUpdate = (data) => {
        setItem({
            id_book: data.id_book,
            position: data.position || ""
        })
        setIsOpen(true)
    }
    return (
        <>
            <HomePage>
                {
                    <TableBootstrap columns={columns} data={books} title="QUẢN LÝ ĐỘC GIẢ" header={header} />
                }
                {
                    isOpen && <BookModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default Book