import React, { useState, useEffect } from 'react'
import BasicTable from '../../components/table'
import { useDispatch, useSelector } from 'react-redux';
import { categorySelector, deleteCategory, loadCategory } from '../../reducers/category';
import CategoryModal from '../modal/category-modal';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Category = () => {
    const [isOpen, setIsOpen] = useState(false)
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
    }

    const onClose = () => {
        setIsOpen(false)
        setCategoryItems()
    }

    const onDelete = (id_category) => {
        dispatch(deleteCategory(id_category))
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
        {
            name: "id_category",
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

    return (
        <>
            <HomePage>
                {
                    category && <BasicTable onRowClick={onRowClick} columns={columns} data={category} titleButton="Thêm thể loại" setIsOpen={setIsOpen} titleTable="QUẢN LÝ THỂ LOẠI" />
                }
                {
                    isOpen && <CategoryModal isOpen={isOpen} onClose={onClose} value={categoryItems} />
                }
            </HomePage>
        </>
    )
}

export default Category