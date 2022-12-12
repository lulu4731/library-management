import React, { useEffect, useState } from 'react'
import ReadersModal from '../modal/readers-modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReaders, readersSelector, searchReaders, unLockReaders, updateReadersStatus } from '../../reducers/readers'
import HomePage from '../../components/home/HomePage'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import convertTimesTamp from '../../utils/convertTimesTamp'
import TableBootstrap from '../../components/table/table-bootstrap'
import LockModal from '../modal/lock-modal'

const ReadersPage = () => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenLock, setIsOpenLock] = useState(false)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchReaders(keyword.replace(/\s+/g, ' ').trim()))
    }, [keyword, dispatch])

    const onClose = () => {
        setIsOpen(false)
        setIsOpenLock(false)
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
            name: "citizen_identification",
            label: "CMND",
        },
        {
            name: "first_name",
            label: "Họ và tên",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.first_name + ' ' + value.last_name}</p>
                    );
                }
            }
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "phone",
            label: "Số điện thoại",
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
                        <p>{value.date_of_birth === null ? '' : convertTimesTamp(value.date_of_birth)}</p>
                    );
                }
            }
        },
        {
            name: "readers_status",
            label: "Trạng thái",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value.readers_status === 0 ? "success" : value.readers_status === 1 ? "danger" : value.readers_status === 2 ? 'danger' : 'warning'}>{value.readers_status === 0 ? "Hoạt động" : value.readers_status === 1 ? "Khóa " + value.hours + " giờ" : value.readers_status === 2 ? 'Khóa vĩnh viễn' : 'Chờ duyệt'}</Badge>
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
                    return value.readers_status === 3 ? (
                        <div className='pb-0'>
                            <OverlayTrigger
                                key={'bottom-change'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-change`}>
                                        Duyệt tài khoản
                                    </Tooltip>
                                }
                            >
                                <Button variant='primary mr-3' onClick={() => dispatch(updateReadersStatus(value.id_readers))}><i className="fa-solid fa-user-check"></i></Button>
                            </OverlayTrigger>
                        </div>
                    ) : (
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
                                <Button variant='danger mr-3' onClick={() => onDelete(value.id_readers)}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                key={'bottom-lock'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-lock`}>
                                        {value.readers_status === 0 ? "Khóa tài khoản" : "Mở khóa"}
                                    </Tooltip>
                                }
                            >
                                <Button variant='warning' onClick={() => value.readers_status === 0 ? onLock(value) : unLock(value.id_readers)}><i className={value.readers_status === 0 ? "fa-solid fa-lock" : "fa-solid fa-lock-open"}></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onDelete = (id_readers) => {
        dispatch(deleteReaders(id_readers))
    }

    const onOpen = () => {
        setIsOpen(true)
        setItem()
    }

    const onUpdate = (data) => {
        setItem({
            ...data,
            date_of_birth: data.date_of_birth ? new Date(convertTimesTamp(data.date_of_birth)) : new Date("2012/01/01")
        })
        setIsOpen(true)
    }

    const onLock = (data) => {
        setItem({
            id_readers: data.id_readers,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        })
        setIsOpenLock(true)
    }

    const unLock = (id_readers) => {
        dispatch(unLockReaders(id_readers))
    }

    return (
        <>
            <HomePage>
                {
                    <TableBootstrap columns={columns} data={readers} title="QUẢN LÝ ĐỘC GIẢ" titleButton="Thêm độc giả" onOpen={onOpen} header={header} />
                }
                {
                    isOpen && <ReadersModal isOpen={isOpen} onClose={onClose} value={item} />
                }
                {
                    isOpenLock && <LockModal isOpen={isOpenLock} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default ReadersPage