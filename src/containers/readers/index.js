import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/table'
import ReadersModal from '../modal/readers-modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReaders, loadReaders, readersSelector } from '../../reducers/readers'
// import { checkLogin } from '../../reducers/librarian'
import HomePage from '../../components/home/HomePage'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import convertTimesTamp from '../../utils/convertTimesTamp'

const ReadersPage = () => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const [isOpen, setIsOpen] = useState(false)
    const [reader, setReader] = useState()

    useEffect(() => {
        dispatch(loadReaders())
        // dispatch(checkLogin())
    }, [dispatch])

    const onClose = () => {
        setIsOpen(false)
        setReader()
    }

    const columns = [
        {
            name: "citizen_identification",
            label: "CMND",
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
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "address",
            label: "Địa chỉ",
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
                customBodyRender: (value) => {
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
                customBodyRender: (value) => {
                    return (
                        <p>{convertTimesTamp(value)}</p>
                    );
                }
            }
        },
        {
            name: "readers_status",
            label: "Trạng thái",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg="success">{value === 0 ? "Hoạt động" : "Khóa"}</Badge>
                        </div>
                    );
                }
            },
        },
        {
            name: "id_readers",
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

    const onRowClick = (data) => {
        const temps = readers.find((item) => item.citizen_identification === data[0])
        setReader({
            ...temps,
            date_of_birth: new Date(convertTimesTamp(temps.date_of_birth))
        })
    }

    const onDelete = (id_readers) => {
        dispatch(deleteReaders(id_readers))
    }

    const onOpen = () => {
        setIsOpen(true)
        setReader()
    }

    return (
        <>
            <HomePage>
                {
                    readers && <BasicTable onRowClick={onRowClick} columns={columns} data={readers} titleButton="Thêm độc giả" onOpen={onOpen} titleTable="QUẢN LÝ ĐỘC GIẢ" />
                }
                {
                    isOpen && <ReadersModal isOpen={isOpen} onClose={onClose} value={reader} />
                }
            </HomePage>
        </>
    )
}

export default ReadersPage