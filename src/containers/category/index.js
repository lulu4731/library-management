import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categorySelector, deleteCategory, loadCategory, searchCategory } from '../../reducers/category';
import CategoryModal from '../modal/category-modal';
import HomePage from '../../components/home/HomePage'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import TableBootstrap from '../../components/table/table-bootstrap';

const Category = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const category = useSelector(categorySelector)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(searchCategory(keyword.replace(/\s+/g, ' ').trim()))
    }, [keyword, dispatch])

    const onClose = () => {
        setIsOpen(false)
        setItem()
    }

    const onDelete = (id_category) => {
        dispatch(deleteCategory(id_category))
    }

    const onOpen = () => {
        setIsOpen(true)
        setItem()
    }

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
            )
        }
    }

    const columns = [
        {
            name: "name_category",
            label: "Tên thể loại",
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
                                <Button variant='danger' onClick={() => onDelete(value.id_category)}><i className="fa-solid fa-trash-can"></i></Button>
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
                    <TableBootstrap columns={columns} data={category} titleButton="Thêm thể loại" onOpen={onOpen} title="QUẢN LÝ THỂ LOẠI" header={header} />
                }
                {
                    isOpen && <CategoryModal isOpen={isOpen} onClose={onClose} value={item} />
                }
            </HomePage>
        </>
    )
}

export default Category