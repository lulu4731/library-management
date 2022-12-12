import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { borrowsSelector, searchBorrows } from '../../reducers/borrow';
import { Badge, Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import BorrowModal from '../modal/borrow-modal';
import PayModal from '../modal/pay-modal';
import HomePage from '../../components/home/HomePage';
import convertTimesTamp from '../../utils/convertTimesTamp';
import TableBootstrap from '../../components/table/table-bootstrap';
import PendingModal from '../modal/pending-modal';
import Select from 'react-select'

const Borrow = () => {
    const dispatch = useDispatch()
    const borrows = useSelector(borrowsSelector)
    const [item, setItem] = useState()
    const [isOpenBorrow, setIsOpenBorrow] = useState(false)
    const [isOpenPay, setIsOpenPay] = useState(false)
    const [isOpenPending, setIsOpenPending] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [select, setSelect] = useState({
        value: 'all',
        label: 'Tất cả'
    })

    useEffect(() => {
        dispatch(searchBorrows({ keyword: keyword.replace(/\s+/g, ' ').trim(), status: select.value }))
    }, [dispatch, keyword, select.value])

    const options = [
        { value: 2, label: "Chờ duyệt" },
        { value: 0, label: "Đang mượn" },
        { value: 1, label: "Đã trả" },
        { value: 'all', label: 'Tất cả' }
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '2px 0px',
            borderRadius: 20,
            width: 250,
            float: 'right'
        }),
    }
    const header =
    {
        customRender: () => {
            return (
                <>
                    <Row className='p-0'>
                        <Col>
                            <Select
                                styles={customStyles}
                                options={options}
                                value={select}
                                onChange={(value) => setSelect(value)}
                            />
                        </Col>
                        <Col>
                            <div className='search-table'>
                                <label style={{ marginBottom: 0 }}>
                                    <input type="text" placeholder='Tìm kiếm' value={keyword} onChange={e => setKeyword(e.target.value)} />
                                    <i className="fa-solid fa-magnifying-glass icon"></i>
                                </label>
                            </div>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    const columns = [
        {
            name: "reader",
            label: "Độc giả mượn",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='info'>{JSON.parse(value?.reader).label}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "librarian",
            label: "Thủ thư tạo phiếu",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='Secondary'>{value?.librarian ? JSON.parse(value.librarian).first_name + ' ' + JSON.parse(value?.librarian).last_name : ''}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "books",
            label: "Danh sách những sách đã mượn",
            options: {
                status: true,
                customRender: (value) => {
                    const time = new Date()
                    time.setDate(time.getDate() - 1)
                    const borrow_status = JSON.parse(value.books).find(item => +item.borrow_status === 0)
                    const borrow_status_pay = JSON.parse(value.books).find(item => +item.borrow_status === 1)

                    if (borrow_status || borrow_status_pay) {
                        const date_status = JSON.parse(value.books).find(item => time > new Date(convertTimesTamp(item.expired)))
                        return (
                            <div className='pb-0' >
                                <div className="d-flex droptop">
                                    {JSON.parse(value.books).length <= 0 ? null : (
                                        <Badge bg={(borrow_status && date_status === undefined) ? "warning" : (borrow_status && date_status) ? 'danger' : "success"}
                                            className="d-flex align-items-center"
                                            data-toggle={JSON.parse(value.books).length >= 2 ? 'dropdown' : ''}
                                        >
                                            <span className="pr-2">{JSON.parse(value.books)[0].ds?.label}</span>

                                            <ul className='mr-3 pl-4'>
                                                <li className={JSON.parse(value.books)[0].borrow_status === 0 ? 'text-left' : 'mb-2 text-left'}>Ngày hết hạn: {convertTimesTamp(JSON.parse(value.books)[0].expired)}</li>
                                                {
                                                    JSON.parse(value.books)[0].date_return_book !== null && <li className='mb-2 text-left'>Ngày trả sách: {convertTimesTamp(JSON.parse(value.books)[0].date_return_book)}</li>
                                                }
                                                {/* <li className='text-left'>Trạng thái: {JSON.parse(value.books)[0].borrow_status === 0 ? 'Chưa trả' : JSON.parse(value.books)[0].borrow_status === 1 ? "Đã trả" : "Đã mất sách"}</li> */}
                                                {
                                                    JSON.parse(value.books)[0].borrow_status === 1 && <li className='mt-2 text-left'>Thủ thư trả sách: {JSON.parse(value.books)[0].librarian_pay.first_name + " " + JSON.parse(value.books)[0].librarian_pay.last_name}</li>
                                                }
                                            </ul>
                                            {JSON.parse(value.books).length >= 2 && (
                                                <>
                                                    <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value.books).length - 1}</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </>
                                            )}
                                        </Badge>
                                    )}
                                    {JSON.parse(value.books).length >= 2 && (
                                        <div className="dropdown-menu pd-0" style={{ top: 320 }}>
                                            {JSON.parse(value.books).map((item, index) => {
                                                return (
                                                    <div key={index} className="dropdown-item-list">
                                                        {item?.ds.label}
                                                        <ul className='mr-3 pl-4'>
                                                            <li className='mb-2 text-left'>Ngày hết hạn: {convertTimesTamp(item.expired)}</li>
                                                            {
                                                                item.date_return_book !== null && <li className='mb-2 text-left'>Ngày trả sách: {convertTimesTamp(item.date_return_book)}</li>
                                                            }
                                                            {/* <li className='text-left'>Trạng thái: {item.borrow_status === 0 ? 'Chưa trả' : item.borrow_status === 1 ? "Đã trả" : "Đã mất sách"}</li> */}
                                                            {
                                                                item.borrow_status === 1 && <li className='mt-2 text-left'>Thử thư trả sách: {item.librarian_pay.first_name + " " + item.librarian_pay.last_name}</li>
                                                            }
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                            <div className="dropdown-footer">Total: {JSON.parse(value.books).length}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div className='pb-0' >
                                <div className="d-flex droptop">
                                    {JSON.parse(value.books).length <= 0 ? null : (
                                        <Badge bg={"secondary"}
                                            className="d-flex align-items-center"
                                            data-toggle={JSON.parse(value.books).length >= 2 ? 'dropdown' : ''}
                                        >
                                            <span className="pr-2">{JSON.parse(value.books)[0].ds?.label}</span>

                                            <ul className='mr-3 pl-4'>
                                                <li className={JSON.parse(value.books)[0].borrow_status === 0 ? 'text-left' : 'text-left'}>Ngày đến lấy: {convertTimesTamp(JSON.parse(value.books)[0].arrival_date)}</li>
                                                {/* {
                                                    JSON.parse(value.books)[0].date_return_book !== null && <li className='mb-2 text-left'>Ngày trả sách: {convertTimesTamp(JSON.parse(value.books)[0].date_return_book)}</li>
                                                } */}
                                                {/* <li className='text-left'>Trạng thái: {JSON.parse(value.books)[0].borrow_status === 0 ? 'Chưa trả' : JSON.parse(value.books)[0].borrow_status === 1 ? "Đã trả" : "Đã mất sách"}</li> */}
                                                {/* {
                                                    JSON.parse(value.books)[0].borrow_status === 2 && <li className='mt-2 text-left'>Trạng thái: Chờ duyệt</li>
                                                } */}
                                            </ul>
                                            {JSON.parse(value.books).length >= 2 && (
                                                <>
                                                    <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value.books).length - 1}</span>
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </>
                                            )}
                                        </Badge>
                                    )}
                                    {JSON.parse(value.books).length >= 2 && (
                                        <div className="dropdown-menu pd-0" style={{ top: 320 }}>
                                            {JSON.parse(value.books).map((item, index) => {
                                                return (
                                                    <div key={index} className="dropdown-item-list">
                                                        {item?.ds.label}
                                                        <ul className='mr-3 pl-4'>
                                                            <li className='mb-2 text-left'>Ngày đến lấy: {convertTimesTamp(item.arrival_date)}</li>
                                                            {
                                                                item.borrow_status === 2 && <li className='mt-2 text-left'>Trạng thái: Chờ duyệt</li>
                                                            }
                                                        </ul>
                                                    </div>
                                                );
                                            })}
                                            <div className="dropdown-footer">Total: {JSON.parse(value.books).length}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                }
            }

        },
        {
            name: "create_time",
            label: "Ngày tạo phiếu",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.create_time.toString().split('T')[0]}</p>
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
                    const borrow_status = JSON.parse(value.books).find(item => item.borrow_status === 0)
                    const update_borrow = JSON.parse(value.books).find(item => item.borrow_status === 1)
                    const pending_borrow = JSON.parse(value.books).find(item => item.borrow_status === 2)

                    if (borrow_status) {
                        return (
                            <div className='pb-0'>
                                <OverlayTrigger
                                    key={'bottom-pay'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-pay`}>
                                            Trả sách
                                        </Tooltip>
                                    }
                                >
                                    <Button variant='warning mr-3' onClick={() => onPay(value)}><i className="fa-solid fa-book"></i></Button>
                                </OverlayTrigger>
                                {
                                    !update_borrow && (
                                        <OverlayTrigger
                                            key={'bottom-edit'}
                                            placement={'bottom'}
                                            overlay={
                                                <Tooltip id={`tooltip-edit`}>
                                                    Cập nhật
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant='primary' onClick={() => onUpdate(value)}><i className="fa-solid fa-pen-to-square"></i></Button>
                                        </OverlayTrigger>
                                    )
                                }
                            </div>
                        );
                    } else if (pending_borrow) {
                        return (
                            <div className='pb-0'>
                                <OverlayTrigger
                                    key={'bottom-pay'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-pay`}>
                                            Chờ duyệt
                                        </Tooltip>
                                    }
                                >
                                    <Button variant='warning mr-3' onClick={() => onPending(value)}><i className="fa-solid fa-clipboard-check"></i></Button>
                                </OverlayTrigger>
                            </div>
                        )
                    } else {
                        return (
                            <div className='pb-0'>
                                <Badge bg='success' >Đã trả</Badge>
                            </div>
                        );
                    }

                }
            }
        },
    ];

    const onUpdate = (data) => {
        setItem({
            id_borrow: data.id_borrow,
            id_readers: JSON.parse(data.reader),
            expired: new Date(convertTimesTamp(JSON.parse(data.books)[0].expired)),
            books: JSON.parse(data.books).map(item => item.ds),
            total_price: +data.total_price
        })

        setIsOpenBorrow(true)
    }

    const onPay = (data) => {
        setItem({
            ...data,
            librarian: JSON.parse(data.librarian),
            reader: JSON.parse(data.reader),
            books: JSON.parse(data.books),
        })

        setIsOpenPay(true)
    }

    const onPending = (data) => {
        let date = new Date(convertTimesTamp(JSON.parse(data.books)[0].arrival_date))
        setItem({
            id_borrow: data.id_borrow,
            books: JSON.parse(data.books).map(item => item.id_book),
            arrival_date: new Date(convertTimesTamp(JSON.parse(data.books)[0].arrival_date)),
            expired: new Date(date.setDate(date.getDate() + 14))
        })

        setIsOpenPending(true)
    }

    const onOpen = () => {
        setIsOpenBorrow(true)
        setItem()
    }

    const onClose = () => {
        setIsOpenBorrow(false)
        setIsOpenPay(false)
        setIsOpenPending(false)
        setItem()
    }
    return (
        <>
            <HomePage>
                <TableBootstrap spanTitle={columns.length % 2 === 0 ? columns.length / 2 : columns.length / 2} spanToolbar={columns.length / 2 + 1}
                    columns={columns} onOpen={onOpen} data={borrows} titleButton="Thêm phiếu mượn" title="QUẢN LÝ DANH SÁCH PHIẾU MƯỢN"
                    page={6} header={header} />
                {
                    isOpenBorrow && (<BorrowModal isOpen={isOpenBorrow} onClose={onClose} value={item} />)
                }
                {
                    isOpenPay && <PayModal isOpen={isOpenPay} onClose={onClose} value={item} />
                }
                {
                    isOpenPending && <PendingModal isOpen={isOpenPending} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default Borrow