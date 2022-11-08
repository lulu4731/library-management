import React, { useState, useEffect } from 'react'
import AuthorsModal from '../modal/authors-modal'
import { useDispatch, useSelector } from 'react-redux';
import { authorsSelector, deleteAuthors, loadAuthors, searchAuthors } from '../../reducers/authors';
import HomePage from '../../components/home/HomePage';
import convertTimesTamp from '../../utils/convertTimesTamp';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TableBootstrap from '../../components/table/table-bootstrap';

const AuthorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const authors = useSelector(authorsSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchAuthors(keyword.replace(/\s+/g, ' ').trim()))
    }, [keyword, dispatch])

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
            name: "first_name",
            label: "Họ",
        },
        {
            name: "last_name",
            label: "Tên",
        },
        {
            name: "gender",
            label: "Giới tính",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.gender === 0 ? 'Nam' : 'Nữ'}</p>
                    )
                }
            }
        },
        {
            name: "date_of_birth",
            label: "Ngày sinh",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{convertTimesTamp(value.date_of_birth)}</p>
                    );
                }
            }
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
                            <OverlayTrigger
                                key={'bottom-delete'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-delete`}>
                                        Xóa
                                    </Tooltip>
                                }
                            >
                                <Button variant='danger' onClick={() => onDelete(value.id_author)}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const onDelete = (id_author) => {
        dispatch(deleteAuthors(id_author))
    }

    const onOpen = () => {
        setItem()
        setIsOpen(true)
    }

    const onUpdate = (data) => {
        setItem({
            ...data,
            date_of_birth: new Date(convertTimesTamp(data.date_of_birth))
        })
        setIsOpen(true)
    }

    return (
        <>
            <HomePage>
                {
                    <TableBootstrap columns={columns} data={authors} titleButton="Thêm tác giả" onOpen={onOpen} title="QUẢN LÝ TÁC GIẢ" header={header} />
                }
                {
                    isOpen && <AuthorsModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default AuthorsPage