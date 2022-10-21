import React from 'react'
import { useEffect, useState } from 'react'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HomePageAdmin from '../../components/home/HomePageAdmin'
import BasicTable from '../../components/table'
import { librariansSelector, loadLibrarian, updateLibrarianStatus } from '../../reducers/librarian'
import convertTimesTamp from '../../utils/convertTimesTamp'
import LibrarianModal from '../modal/librarian-modal'

const LibrarianPage = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const librarians = useSelector(librariansSelector)
    const [librarian, setLibrarian] = useState()

    useEffect(() => {
        dispatch(loadLibrarian())
    }, [dispatch])

    const onClose = () => {
        setIsOpen(false)
        setLibrarian()
    }

    const columns = [
        {
            name: "id_librarian",
            label: "Mã thủ thư",
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
            name: "librarian_status",
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
            name: "id_librarian",
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
                                <Button variant='danger mr-3' onClick={() => undefined}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                key={'bottom-change'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-change`}>
                                        Cập nhật trạng thái làm việc
                                    </Tooltip>
                                }
                            >
                                <Button variant='warning' onClick={() => dispatch(updateLibrarianStatus(value))}><i className="fa-solid fa-wrench"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onRowClick = (data) => {
        const temps = librarians.find((item) => item.id_librarian === data[0])
        setLibrarian({
            ...temps,
            date_of_birth: new Date(convertTimesTamp(temps.date_of_birth))
        })
    }

    const onOpen = () => {
        setIsOpen(true)
        setLibrarian()
    }

    return (
        <HomePageAdmin>
            {
                librarians && <BasicTable onRowClick={onRowClick} columns={columns} data={librarians} titleButton="Tạo thủ thư" onOpen={onOpen} titleTable="QUẢN LÝ THỦ THƯ" />
            }
            {
                isOpen && <LibrarianModal isOpen={isOpen} onClose={onClose} value={librarian} />
            }
        </HomePageAdmin>
    )
}

export default LibrarianPage