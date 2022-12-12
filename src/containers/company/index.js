import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { companySelector, deleteCompany, searchCompany } from '../../reducers/company';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CompanyModal from '../modal/company-modal';
import TableBootstrap from '../../components/table/table-bootstrap';

const CompanyPage = () => {
    const dispatch = useDispatch()
    const company = useSelector(companySelector)
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchCompany(keyword.replace(/\s+/g, ' ').trim()))
    }, [keyword, dispatch])

    const onUpdate = (data) => {
        setItem(data)
        setIsOpen(true)
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
            name: "name_publishing_company",
            label: "Tên nhà xuất bản",
        },
        {
            name: "address",
            label: "Địa chỉ",
        },
        {
            name: "phone",
            label: "Số điện thoại",
        },
        {
            name: "email",
            label: "Email",
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
                                <Button variant='danger' onClick={() => onDelete(value.id_publishing_company)}><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger>
                        </div>
                    )
                }
            }
        },
    ];

    const onDelete = (id_publishing_company) => {
        dispatch(deleteCompany(id_publishing_company))
    }

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const onOpen = () => {
        setItem()
        setIsOpen(true)
    }

    return (
        <>
            <HomePage>
                {
                    <TableBootstrap onOpen={onOpen} columns={columns} data={company} titleButton="Thêm nhà xuất bản" title="QUẢN LÝ NHÀ XUẤT BẢN" header={header} />
                }
                {
                    isOpen && <CompanyModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default CompanyPage