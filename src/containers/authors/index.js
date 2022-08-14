import React, { useState, useEffect } from 'react'
import BasicTable from '../../components/table'
import AuthorsModal from '../modal/authors-modal'
import { useDispatch, useSelector } from 'react-redux';
import { authorsSelector, loadAuthors } from '../../reducers/authors';
import HomePage from '../../components/home/HomePage';
import convertTimesTamp from '../../utils/convertTimesTamp';

const AuthorsPage = () => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()
    const authors = useSelector(authorsSelector)
    const [author, setAuthor] = useState()

    useEffect(() => {
        dispatch(loadAuthors())
    }, [dispatch])

    const columns = [
        {
            name: "id_author",
            label: "Mã tác giả",
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
    ];

    const onRowClick = (data) => {
        setAuthor({
            id_author: data[0],
            first_name: data[1],
            last_name: data[2],
            gender: data[3].props.children === 'Nam' ? 0 : 1,
            date_of_birth: new Date(data[4].props.children)
        })
        setModalShow(true)
    }
    return (
        <>
            <HomePage>
                <BasicTable onRowClick={onRowClick} columns={columns} data={authors} titleButton="Thêm tác giả" setModalShow={setModalShow} titleTable="QUẢN LÝ TÁC GIẢ" />
                <AuthorsModal modalShow={modalShow} setModalShow={setModalShow} value={author} />
            </HomePage>
        </>
    )
}

export default AuthorsPage