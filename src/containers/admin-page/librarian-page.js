import React from 'react'
import { useEffect, useState } from 'react'
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HomePageAdmin from '../../components/home/HomePageAdmin'
import TableBootstrap from '../../components/table/table-bootstrap'
import { librariansSelector, searchLibrarian, updateLibrarianStatus } from '../../reducers/librarian'
import convertTimesTamp from '../../utils/convertTimesTamp'
import LibrarianModal from '../modal/librarian-modal'

const LibrarianPage = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const librarians = useSelector(librariansSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchLibrarian(keyword.replace(/\s+/g, ' ').trim()))
    }, [keyword, dispatch])

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
            name: "first_name",
            label: "Họ",
        },
        {
            name: "last_name",
            label: "Tên",
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
            name: "date_of_birth",
            label: "Ngày bắt đầu",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{convertTimesTamp(value.start_day)}</p>
                    );
                }
            }
        },
        {
            name: "address",
            label: "Địa chỉ",
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
            name: "librarian_status",
            label: "Trạng thái",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg={value.librarian_status === 0 ? 'success' : 'danger'}>{value.librarian_status === 0 ? "Hoạt động" : "Khóa"}</Badge>
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
                            {/* <OverlayTrigger
                                key={'bottom-delete'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-delete`}>
                                        Xóa
                                    </Tooltip>
                                }
                            >
                                <Button variant='danger mr-3' onClick={() => undefined}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger> */}
                            <OverlayTrigger
                                key={'bottom-change'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-change`}>
                                        Cập nhật trạng thái làm việc
                                    </Tooltip>
                                }
                            >
                                <Button variant='warning'
                                    onClick={() => dispatch(updateLibrarianStatus(value.id_librarian))}>
                                    <i className="fa-solid fa-wrench"></i>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onOpen = () => {
        setIsOpen(true)
        setItem()
    }

    const onUpdate = (data) => {
        setItem({
            ...data,
            date_of_birth: new Date(convertTimesTamp(data.date_of_birth))
        })
        setIsOpen(true)
    }

    return (
        <HomePageAdmin>
            {
                <TableBootstrap columns={columns} data={librarians} title="QUẢN LÝ THỦ THƯ" titleButton="Thêm thủ thư" onOpen={onOpen} header={header} />
            }
            {
                isOpen && <LibrarianModal isOpen={isOpen} onClose={onClose} value={item} />
            }
        </HomePageAdmin>
    )
}

export default LibrarianPage