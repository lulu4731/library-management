import React, { useState, useEffect } from 'react'
import BasicTable from '../../components/table'
import AuthorsModal from '../modal/authors-modal'
import { useDispatch, useSelector } from 'react-redux';
import { authorsSelector, deleteAuthors, loadAuthors } from '../../reducers/authors';
import HomePage from '../../components/home/HomePage';
import convertTimesTamp from '../../utils/convertTimesTamp';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const AuthorsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const authors = useSelector(authorsSelector)
    const [author, setAuthor] = useState()

    useEffect(() => {
        dispatch(loadAuthors())
    }, [dispatch])

    const columns = [
        {
            name: "id_author",
            label: "Mã tác giả",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "first_name",
            label: "Họ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "last_name",
            label: "Tên",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "gender",
            label: "Giới tính",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{value === 0 ? 'Nam' : 'Nữ'}</p>
                    );
                }
            }
        },
        {
            name: "date_of_birth",
            label: "Ngày sinh",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{convertTimesTamp(value)}</p>
                    );
                }
            }
        },
        {
            name: "id_author",
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
                            <OverlayTrigger
                                key={'bottom-delete'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-delete`}>
                                        Xóa
                                    </Tooltip>
                                }
                            >
                                <Button variant='danger' onClick={() => onDelete(value)}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onClose = () => {
        setIsOpen(false)
        setAuthor()
    }

    const onRowClick = (data) => {
        const temps = authors.find((item) => item.id_author === data[0])
        setAuthor({
            ...temps,
            date_of_birth: new Date(convertTimesTamp(temps.date_of_birth))
        })

        // setAuthor({
        //     id_author: data[0],
        //     first_name: data[1],
        //     last_name: data[2],
        //     gender: data[3].props.children === 'Nam' ? 0 : 1,
        //     date_of_birth: new Date(data[4].props.children)
        // })
    }

    const onDelete = (id_author) => {
        dispatch(deleteAuthors(id_author))
    }

    const onOpen = () => {
        setAuthor()
        setIsOpen(true)
    }

    return (
        <>
            <HomePage>
                {
                    authors && <BasicTable onRowClick={onRowClick} columns={columns} data={authors} titleButton="Thêm tác giả" onOpen={onOpen} titleTable="QUẢN LÝ TÁC GIẢ" />
                }
                {
                    isOpen && <AuthorsModal isOpen={isOpen} onClose={onClose} value={author} />
                }
            </HomePage>
        </>
    )
}

export default AuthorsPage