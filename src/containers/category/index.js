import React, { useState, useEffect } from 'react'
import BasicTable from '../../components/table'
import { useDispatch, useSelector } from 'react-redux';
import { categorySelector, loadCategory } from '../../reducers/category';
import CategoryModal from '../modal/category-modal';
import HomePage from '../../components/home/HomePage'

const Category = () => {
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()
    const category = useSelector(categorySelector)
    const [categoryItems, setCategoryItems] = useState()

    useEffect(() => {
        dispatch(loadCategory())
    }, [dispatch])


    const onRowClick = (data) => {
        setCategoryItems({
            id_category: data[0],
            name_category: data[1],
        })
        setModalShow(true)
    }

    const columns = [
        {
            name: "id_category",
            label: "Mã thể loại",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name_category",
            label: "Tên thể loại",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    return (
        <>
            <HomePage>
                <BasicTable onRowClick={onRowClick} columns={columns} data={category} titleButton="Thêm thể loại" setModalShow={setModalShow} titleTable="QUẢN LÝ THỂ LOẠI" />
                <CategoryModal modalShow={modalShow} setModalShow={setModalShow} value={categoryItems} />
            </HomePage>
        </>
    )
}

export default Category