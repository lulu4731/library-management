import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TitleModal from '../modal/title-modal';
import { deleteTitle, loadTitle, searchTitleLibrarian, titlesSelector } from '../../reducers/title';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TableBootstrap from '../../components/table/table-bootstrap';

const Title = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const titles = useSelector(titlesSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchTitleLibrarian(keyword.replace(/\s+/g, ' ').trim()))
    }, [dispatch, keyword])


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
            name: "id_title",
            label: "Mã đầu sách",
        },
        {
            name: "name_book",
            label: "Tên đầu sách",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.name_book}</p>
                    );
                }
            },
        },
        {
            name: "company",
            label: "Tên nhà xuất bản",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{JSON.parse(value.company)?.label}</p>
                    );
                }
            },
        },
        {
            name: "category",
            label: "Tên thể loại",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{JSON.parse(value.category)?.label}</p>
                    );
                }
            },
        },
        {
            name: "authors",
            label: "Các tác giả sáng tác",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <div className="d-flex droptop">
                                {JSON.parse(value.authors).length <= 0 ? null : (
                                    <Badge bg="success"
                                        className="d-flex align-items-center"
                                        data-toggle={JSON.parse(value.authors).length >= 2 ? 'dropdown' : ''}
                                    >
                                        <span className="mr-2">{JSON.parse(value.authors)[0]?.label}</span>
                                        {JSON.parse(value.authors).length >= 2 && (
                                            <>
                                                <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value.authors).length - 1}</span>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </Badge>
                                )}
                                {JSON.parse(value.authors).length >= 2 && (
                                    <div className="dropdown-menu pd-0">
                                        {JSON.parse(value.authors).map((item, index) => {
                                            return (
                                                <div key={index} className="dropdown-item-list">
                                                    {item?.label}
                                                </div>
                                            );
                                        })}
                                        <div className="dropdown-footer">Total: {JSON.parse(value.authors).length}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }
            },
        },
        {
            name: "price",
            label: "Loại sách",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{Number(value.price) !== 0 ? 'Trả phí' : 'Miễn phí'}</p>
                    );
                }
            }
        },
        {
            name: "publishing_year",
            label: "NXB",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.publishing_year.toString().split("-")[0]}</p>
                    );
                }
            }
        },
        {
            name: "page",
            label: "Số trang",
        },
        {
            name: "price",
            label: "Giá mượn",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p> {(value.price * 1).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
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
                                <Button variant='danger' onClick={() => onDelete(value.isbn)}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onUpdate = (data) => {
        setItem({
            ...data,
            publishing_year: new Date(data.publishing_year),
            company: JSON.parse(data.company),
            category: JSON.parse(data.category),
            authors: JSON.parse(data.authors)
        })
        setIsOpen(true)
    }

    const onDelete = (isbn) => {
        dispatch(deleteTitle(isbn))
    }

    const onOpen = () => {
        setItem()
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen()
        setItem()
    }

    return (
        <>
            <HomePage>
                {
                    <TableBootstrap columns={columns} onOpen={onOpen} data={titles} titleButton="Thêm đầu sách" title="QUẢN LÝ ĐẦU SÁCH" header={header} />
                }
                {
                    isOpen && <TitleModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default Title