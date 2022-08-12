import React, { useEffect, useState } from 'react'
// import { Badge } from 'react-bootstrap';
import BasicTable from '../../components/table'
// import ReadersModal from '../modal/readers-modal';
import { useDispatch, useSelector } from 'react-redux';
import { companySelector, loadCompany } from '../../reducers/company';
import HomePage from '../../components/home/HomePage'

const CompanyPage = () => {
    const dispatch = useDispatch()
    const company = useSelector(companySelector)
    // const [modalShow, setModalShow] = useState(false);
    // const [companyItem, setCompanyItem] = useState()

    useEffect(() => {
        dispatch(loadCompany())
    }, [dispatch])

    const onRowClick = (data) => {
        // setReader({
        //     id_readers: data[0],
        //     first_name: data[1],
        //     last_name: data[2],
        //     address: data[4],
        //     gender: data[5].props.children === 'Nam' ? 0 : 1,
        //     email: data[3],
        //     date_of_birth: new Date(data[6].props.children)
        // })
        // setModalShow(true)
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
    ];

    // console.log(readers)
    return (
        <>
            <HomePage>
                <BasicTable onRowClick={onRowClick} columns={columns} data={company} titleButton="Thêm nhà xuất bản" titleTable="QUẢN LÝ NHÀ XUẤT BẢN" />
                {/* <ReadersModal modalShow={modalShow} setModalShow={setModalShow} value={reader} /> */}
            </HomePage>
        </>
    )
}

export default CompanyPage