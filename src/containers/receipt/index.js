import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { receiptsSelector, searchReceipt } from '../../reducers/receipt';
import ReceiptModal from '../modal/receipt_modal';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import TableBootstrap from '../../components/table/table-bootstrap';

const Receipt = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const receipts = useSelector(receiptsSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchReceipt(keyword.replace(/\s+/g, ' ').trim()))
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
            name: "librarian",
            label: "Tên thủ thư nhập phiếu",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg='info' >{JSON.parse(value.librarian).first_name + ' ' + JSON.parse(value.librarian).last_name}</Badge>
                        </div>
                    );
                }
            }
        },
        {
            name: "ds",
            label: "Các đầu sách trong phiếu nhập",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <div className="d-flex droptop">
                                {JSON.parse(value.ds).length <= 0 ? null : (
                                    <Badge bg="success"
                                        className="d-flex align-items-center"
                                        data-toggle={JSON.parse(value.ds).length >= 2 ? 'dropdown' : ''}
                                    >
                                        <span className="pr-2">{JSON.parse(value.ds)[0].ds?.label + ': ' + JSON.parse(value.ds)[0].number_book}</span>
                                        {JSON.parse(value.ds).length >= 2 && (
                                            <>
                                                <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value.ds).length - 1}</span>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </Badge>
                                )}
                                {JSON.parse(value.ds).length >= 2 && (
                                    <div className="dropdown-menu pd-0">
                                        {JSON.parse(value.ds).map((item, index) => {
                                            return (
                                                <div key={index} className="dropdown-item-list">
                                                    {item?.ds.label + ': ' + item.number_book}
                                                </div>
                                            );
                                        })}
                                        <div className="dropdown-footer">Total: {JSON.parse(value.ds).length}</div>
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
                        </div>
                    )
                }
            }
        },
    ];

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const onUpdate = (data) => {
        setItem({
            id_receipt: data.id_receipt,
            data: JSON.parse(data.ds)
        })
        setIsOpen(true)
    }

    const onOpen = () => {
        setIsOpen(true)
        setItem()
    }

    return (
        <>
            <HomePage>
                {
                    <TableBootstrap columns={columns} onOpen={onOpen} data={receipts} titleButton="Thêm phiếu nhập" title="QUẢN LÝ DANH SÁCH PHIẾU NHẬP" header={header} />
                }
                {
                    isOpen && <ReceiptModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default Receipt