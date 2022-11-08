import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { liquidationsSelector, loadLiquidations, searchLiquidations } from '../../reducers/liquidation';
import HomePage from '../../components/home/HomePage';
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LiquidationModal from '../modal/liquidation-modal';
import TableBootstrap from '../../components/table/table-bootstrap';

const Liquidation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const liquidations = useSelector(liquidationsSelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchLiquidations(keyword.replace(/\s+/g, ' ').trim()))
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
            label: "Thủ thư nhập phiếu",
            options: {
                status: true,
                customRender: (value) => {
                    const librarian = JSON.parse(value.librarian)
                    return (
                        <p>{librarian.first_name + " " + librarian.last_name}</p>
                    );
                }
            }
        },
        {
            name: "books",
            label: "Các sách thanh lý",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            <div className="d-flex droptop">
                                {JSON.parse(value.books).length <= 0 ? null : (
                                    <Badge bg="success"
                                        className="d-flex align-items-center"
                                        data-toggle={JSON.parse(value.books).length >= 2 ? 'dropdown' : ''}
                                    >
                                        <span className="mr-2">{JSON.parse(value.books)[0]?.label}</span>
                                        {JSON.parse(value.books).length >= 2 && (
                                            <>
                                                <span className="badge badge-secondary mr-2 p-1">+ {JSON.parse(value.books).length - 1}</span>
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </>
                                        )}
                                    </Badge>
                                )}
                                {JSON.parse(value.books).length >= 2 && (
                                    <div className="dropdown-menu pd-0">
                                        {JSON.parse(value.books).map((item, index) => {
                                            return (
                                                <div key={index} className="dropdown-item-list">
                                                    {item?.label}
                                                </div>
                                            );
                                        })}
                                        <div className="dropdown-footer">Total: {JSON.parse(value.books).length}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }
            },
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

    const onUpdate = (data) => {
        setItem({
            id_liquidation: data.id_liquidation,
            books: JSON.parse(data.books)
        })
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const onOpen = () => {
        setIsOpen(true)
        setItem()
    }
    return (
        <>
            <HomePage>
                {
                    (<TableBootstrap columns={columns} data={liquidations} titleButton="Thêm thiếu thanh lý" onOpen={onOpen} title="QUẢN LÝ PHIẾU THANH LÝ" header={header} />)
                }
                {
                    isOpen && (<LiquidationModal isOpen={isOpen} onClose={onClose} value={item} />)
                }
            </HomePage>
        </>
    )
}

export default Liquidation