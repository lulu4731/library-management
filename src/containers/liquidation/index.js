import React, { useState, useEffect } from 'react'
import BasicTable from '../../components/table'
import AuthorsModal from '../modal/authors-modal'
import { useDispatch, useSelector } from 'react-redux';
import { liquidationsSelector, loadLiquidations } from '../../reducers/liquidation';
import HomePage from '../../components/home/HomePage';
import { Badge, Button } from 'react-bootstrap';
import LiquidationModal from '../modal/liquidation-modal';

const Liquidation = () => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()
    const liquidations = useSelector(liquidationsSelector)
    const [liquidation, setLiquidation] = useState()

    useEffect(() => {
        dispatch(loadLiquidations())
    }, [dispatch])

    const columns = [
        {
            name: "id_liquidation",
            label: "Mã phiếu thanh lý",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "librarian",
            label: "Thủ thư nhập phiếu",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const librarian = JSON.parse(value)
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
            name: "a",
            label: "Hành động",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Button variant='primary' onClick={() => setModalShow(true)}>Cập nhật</Button>
                        </div>
                    )
                }
            }
        },
    ];

    const onRowClick = (data) => {
        const temps = liquidations.find(item => item.id_liquidation === data[0])
        setLiquidation({
            id_liquidation: temps.id_liquidation,
            books: JSON.parse(temps.books)
        })
        // setModalShow(true)
    }
    return (
        <>
            <HomePage>
                <BasicTable onRowClick={onRowClick} columns={columns} data={liquidations} titleButton="Thêm thiếu thanh lý" setModalShow={setModalShow} titleTable="QUẢN LÝ PHIẾU THANH LÝ" />
                {/* <AuthorsModal modalShow={modalShow} setModalShow={setModalShow} value={author} /> */}
                {
                    modalShow && (<LiquidationModal modalShow={modalShow} setModalShow={setModalShow} value={liquidation} setValue={setLiquidation}/>)
                }
            </HomePage>
        </>
    )
}

export default Liquidation