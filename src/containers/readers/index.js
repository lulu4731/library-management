import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/table'
import ReadersModal from '../modal/readers-modal';
import { useDispatch, useSelector } from 'react-redux';
import { loadReaders, readersSelector } from '../../reducers/readers';
// import { checkLogin } from '../../reducers/librarian'
import HomePage from '../../components/home/HomePage';
import { Badge } from 'react-bootstrap';
import convertTime from '../../utils/convertTime';
import convertTimesTamp from '../../utils/convertTimesTamp';

const ReadersPage = () => {
    const dispatch = useDispatch()
    const readers = useSelector(readersSelector)
    const [modalShow, setModalShow] = useState(false);
    const [reader, setReader] = useState()

    useEffect(() => {
        dispatch(loadReaders())
        // dispatch(checkLogin())
    }, [dispatch])

    const columns = [
        {
            name: "citizen_identification",
            label: "CMND",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "first_name",
            label: "Họ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "last_name",
            label: "Tên",
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
            name: "phone",
            label: "Phone",
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
            name: "gender",
            label: "Giới tính",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{value === 0 ? 'Nam' : 'Nữ'}</p>
                    );
                }
            }
        },
        {
            name: "date_of_birth",
            label: "Ngày sinh",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <p>{convertTimesTamp(value)}</p>
                    );
                }
            }
        },
        {
            name: "readers_status",
            label: "Trạng thái",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='pb-0'>
                            <Badge bg="success">{value === 0 ? "Hoạt động" : "Khóa"}</Badge>
                        </div>
                    );
                }
            },
        }
    ];

    const onRowClick = (data) => {
        const temps = readers.find((item) => item.citizen_identification === data[0])
        setReader({
            ...temps,
            date_of_birth: new Date(convertTime(temps.day))
        })
        setModalShow(true)
    }

    return (
        <>
            <HomePage>
                {
                    readers && <BasicTable onRowClick={onRowClick} columns={columns} data={readers} titleButton="Thêm độc giả" setModalShow={setModalShow} titleTable="QUẢN LÝ ĐỘC GIẢ" />
                }
                {
                    modalShow && <ReadersModal modalShow={modalShow} setModalShow={setModalShow} value={reader} setValue={setReader} />
                }
            </HomePage>
        </>
    )
}

export default ReadersPage