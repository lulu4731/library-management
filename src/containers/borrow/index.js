import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { borrowsSelector, loadBorrows } from '../../reducers/borrow';
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BasicTable from '../../components/table';
import BorrowModal from '../modal/borrow-modal';
import PayModal from '../modal/pay-modal';
import HomePage from '../../components/home/HomePage';
import UpdateModal from '../modal/update-borrow-modal';
import convertTimesTamp from '../../utils/convertTimesTamp';

const Borrow = () => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const borrows = useSelector(borrowsSelector)
    const [borrow, setBorrow] = useState()
    const [payModal, setPayModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)

    useEffect(() => {
        dispatch(loadBorrows())
    }, [dispatch])


    const columns = [
        {
            name: "id_borrow",
            label: "Mã phiếu mượn",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "librarian",
            label: "Thủ thư tạo phiếu",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='secondary' >{JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "reader",
            label: "Độc giả mượn",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='info' >{JSON.parse(value).label}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "books",
            label: "Danh sách những sách đã mượn",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const time = new Date()
                    time.setDate(time.getDate() - 1)
                    const borrow_status = JSON.parse(value).find(item => item.borrow_status === 0)
                    const date_status = JSON.parse(value).find(item => time > new Date(convertTimesTamp(item.expired)))

                    return (
                        <div className='pb-0' >
                            <div className="d-flex droptop">
                                {JSON.parse(value).length <= 0 ? null : (
                                    <Badge bg={(borrow_status && date_status === undefined) ? "warning" : (borrow_status && date_status) ? 'danger' : "success"}
                                        className="d-flex align-items-center"
                                        data-toggle={JSON.parse(value).length >= 2 ? 'dropdown' : ''}
                                    >
                                        <span className="pr-2">{JSON.parse(value)[0].ds?.label}</span>

                                        <ul className='mr-3 pl-4'>
                                            <li className={JSON.parse(value)[0].borrow_status === 0 ? 'text-left' : 'mb-2 text-left'}>Ngày hết hạn: {convertTimesTamp(JSON.parse(value)[0].expired)}</li>
                                            {
                                                JSON.parse(value)[0].date_return_book !== null && <li className='mb-2 text-left'>Ngày trả sách: {convertTimesTamp(JSON.parse(value)[0].date_return_book)}</li>
                                            }
                                            {/* <li className='text-left'>Trạng thái: {JSON.parse(value)[0].borrow_status === 0 ? 'Chưa trả' : JSON.parse(value)[0].borrow_status === 1 ? "Đã trả" : "Đã mất sách"}</li> */}
                                            {
                                                JSON.parse(value)[0].borrow_status === 1 && <li className='mt-2 text-left'>Thủ thư trả sách: {JSON.parse(value)[0].librarian_pay.first_name + " " + JSON.parse(value)[0].librarian_pay.last_name}</li>
                                            }
                                        </ul>
                                        {JSON.parse(value).length >= 2 && (
                                            <>
                                                <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value).length - 1}</span>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </Badge>
                                )}
                                {JSON.parse(value).length >= 2 && (
                                    <div className="dropdown-menu pd-0 position-fixed" style={{ top: 320 }}>
                                        {JSON.parse(value).map((item, index) => {
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
                                        <div className="dropdown-footer">Total: {JSON.parse(value).length}</div>
                                    </div>
                                )}
                            </div>
                        </div >
                    );
                }
            }
        },
        {
            name: "create_time",
            label: "Ngày tạo phiếu",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{value.toString().split('T')[0]}</p>
                    );
                }
            }
        },
        {
            name: "books",
            label: "Hành động",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const borrow_status = JSON.parse(value).find(item => item.borrow_status === 0)
                    if (borrow_status) {
                        return (
                            <div className='pb-0'>
                                {/* <Button variant='warning' className='mr-2' onClick={() => setPayModal(true)}>Trả sách</Button> */}
                                {/* <Button variant='primary' onClick={() => setUpdateModal(true)}>Cập nhật</Button> */}
                                <OverlayTrigger
                                    key={'bottom-pay'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-pay`}>
                                            Trả sách
                                        </Tooltip>
                                    }
                                >
                                    <Button variant='warning mr-3' onClick={() => setPayModal(true)}><i className="fa-solid fa-book"></i></Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key={'bottom-edit'}
                                    placement={'bottom'}
                                    overlay={
                                        <Tooltip id={`tooltip-edit`}>
                                            Cập nhật
                                        </Tooltip>
                                    }
                                >
                                    <Button variant='primary' onClick={() => setUpdateModal(true)}><i className="fa-solid fa-pen-to-square"></i></Button>
                                </OverlayTrigger>
                            </div>
                        );
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

    const onRowClick = (data) => {
        // console.log(data)
        const temps = borrows.find(item => item.id_borrow === data[0])
        // console.log(temps)
        setBorrow({
            ...temps,
            librarian: JSON.parse(temps.librarian),
            reader: JSON.parse(temps.reader),
            books: JSON.parse(temps.books),
        })
        // setModalShow(true)
    }

    return (
        <>
            <HomePage>
                <BasicTable onRowClick={onRowClick} columns={columns} setIsOpen={setModalShow} data={borrows} titleButton="Thêm phiếu mượn" titleTable="QUẢN LÝ DANH SÁCH PHIẾU MƯỢN" />
                {
                    modalShow && (<BorrowModal modalShow={modalShow} setModalShow={setModalShow} />)
                }
                {
                    updateModal && (<UpdateModal modalShow={updateModal} setModalShow={setUpdateModal} value={borrow} />)
                }
                {
                    payModal && <PayModal modalShow={payModal} setModalShow={setPayModal} value={borrow} />
                }
            </HomePage>
        </>
    )
}

export default Borrow