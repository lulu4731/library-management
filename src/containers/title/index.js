import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import BasicTable from '../../components/table'
import { useDispatch, useSelector } from 'react-redux';
import TitleModal from '../modal/title-modal';
import { deleteTitle, loadTitle, titlesSelector } from '../../reducers/title';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Title = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const titles = useSelector(titlesSelector)
    const [title, setTitle] = useState()

    useEffect(() => {
        dispatch(loadTitle())
    }, [dispatch])

    const columns = [
        {
            name: "id_title",
            label: "Mã đầu sách",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name_book",
            label: "Tên đầu sách",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "company",
            label: "Tên nhà xuất bản",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{JSON.parse(value)?.label}</p>
                    );
                }
            },
        },
        {
            name: "category",
            label: "Tên thể loại",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{JSON.parse(value)?.label}</p>
                    );
                }
            },
        },
        {
            name: "authors",
            label: "Các tác giả sáng tác",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <div className="d-flex droptop">
                                {JSON.parse(value).length <= 0 ? null : (
                                    <Badge bg="success"
                                        className="d-flex align-items-center"
                                        data-toggle={JSON.parse(value).length >= 2 ? 'dropdown' : ''}
                                    >
                                        <span className="mr-2">{JSON.parse(value)[0]?.label}</span>
                                        {JSON.parse(value).length >= 2 && (
                                            <>
                                                <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value).length - 1}</span>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </Badge>
                                )}
                                {JSON.parse(value).length >= 2 && (
                                    <div className="dropdown-menu pd-0">
                                        {JSON.parse(value).map((item, index) => {
                                            return (
                                                <div key={index} className="dropdown-item-list">
                                                    {item?.label}
                                                </div>
                                            );
                                        })}
                                        <div className="dropdown-footer">Total: {JSON.parse(value).length}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }
            },
        },
        {
            name: "publishing_year",
            label: "Năm xuất bản",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{value.toString().split("-")[0]}</p>
                    );
                }
            }
        },
        {
            name: "page",
            label: "Số trang",
            options: {
                filter: true,
                sort: true,
            }
        },
        // {
        //     name: "price",
        //     label: "Giá",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     }
        // },
        {
            name: "isbn",
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
        const temps = titles.find(item => item.id_title === data[0])
        setTitle({
            ...temps,
            publishing_year: new Date(temps.publishing_year),
            company: JSON.parse(temps.company),
            category: JSON.parse(temps.category),
            authors: JSON.parse(temps.authors)
        })
        // setModalShow(true)
    }

    const onDelete = (isbn) => {
        dispatch(deleteTitle(isbn))
    }

    const onOpen = () => {
        setTitle()
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen()
        setTitle()
    }

    return (
        <>
            <HomePage>
                {
                    titles && <BasicTable onRowClick={onRowClick} columns={columns} onOpen={onOpen} data={titles} titleButton="Thêm đầu sách" titleTable="QUẢN LÝ ĐẦU SÁCH" />
                }
                {
                    isOpen && <TitleModal isOpen={isOpen} onClose={onClose} value={title} />
                }
            </HomePage>
        </>
    )
}

export default Title