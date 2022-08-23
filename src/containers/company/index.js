import React, { useEffect, useState } from 'react'
// import { Badge } from 'react-bootstrap';
import BasicTable from '../../components/table'
// import ReadersModal from '../modal/readers-modal';
import { useDispatch, useSelector } from 'react-redux';
import { companySelector, deleteCompany, loadCompany } from '../../reducers/company';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import CompanyModal from '../modal/company-modal';

const CompanyPage = () => {
    const dispatch = useDispatch()
    const company = useSelector(companySelector)
    const [isOpen, setIsOpen] = useState(false);
    const [companyItem, setCompanyItem] = useState()

    useEffect(() => {
        dispatch(loadCompany())
    }, [dispatch])

    const onRowClick = (data) => {
        const temps = company.find(item => item.id_publishing_company === data[0])
        setCompanyItem(temps)
    }
    const columns = [
        {
            name: "id_publishing_company",
            label: "Mã NXB",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name_publishing_company",
            label: "Tên NXB",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "address",
            label: "Địa chỉ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "phone",
            label: "Số điện thoại",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "id_publishing_company",
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

    const onDelete = (id_publishing_company) => {
        dispatch(deleteCompany(id_publishing_company))
    }

    const onClose = () => {
        setIsOpen(false)
        setCompanyItem()
    }
    
    const onOpen = () => {
        setCompanyItem()
        setIsOpen(true)
    }
    // console.log(readers)
    return (
        <>
            <HomePage>
                {
                    company && <BasicTable onRowClick={onRowClick} onOpen={onOpen} columns={columns} data={company} titleButton="Thêm nhà xuất bản" titleTable="QUẢN LÝ NHÀ XUẤT BẢN" />
                }
                {
                    isOpen && <CompanyModal isOpen={isOpen} onClose={onClose} value={companyItem} />
                }
            </HomePage>
        </>
    )
}

export default CompanyPage