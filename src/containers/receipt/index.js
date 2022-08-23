import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import BasicTable from '../../components/table';
import { loadReceipt, receiptsSelector } from '../../reducers/receipt';
import ReceiptModal from '../modal/receipt_modal';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const Receipt = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const receipts = useSelector(receiptsSelector)
    const [receipt, setReceipt] = useState()

    useEffect(() => {
        dispatch(loadReceipt())
    }, [dispatch])

    const columns = [
        {
            name: "id_receipt",
            label: "Mã phiếu nhập",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "librarian",
            label: "Tên thủ thư nhập phiếu",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='info' >{JSON.parse(value).first_name + ' ' + JSON.parse(value).last_name}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "ds",
            label: "Các đầu sách trong phiếu nhập",
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
                                        <span className="pr-2">{JSON.parse(value)[0].ds?.label + ': ' + JSON.parse(value)[0].number_book}</span>
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
                                                    {item?.ds.label + ': ' + item.number_book}
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
            }
        },
        {
            name: "create_time",
            label: "Ngày nhập",
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
            name: "id_receipt",
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
                        </div>
                    )
                }
            }
        },
    ];

    const onClose = () => {
        setIsOpen(false)
        setReceipt()
    }

    const onRowClick = (data) => {
        const temps = receipts.find(item => item.id_receipt === data[0])
        setReceipt({
            id_receipt: temps.id_receipt,
            data: JSON.parse(temps.ds)
        })
    }

    const onOpen = () => {
        setIsOpen(true)
        setReceipt()
    }

    return (
        <>
            <HomePage>
                {
                    receipts && <BasicTable onRowClick={onRowClick} columns={columns} onOpen={onOpen} data={receipts} titleButton="Thêm phiếu nhập" titleTable="QUẢN LÝ DANH SÁCH PHIẾU NHẬP" />
                }
                {
                    isOpen && <ReceiptModal isOpen={isOpen} onClose={onClose} value={receipt} />
                }
            </HomePage>
        </>
    )
}

export default Receipt