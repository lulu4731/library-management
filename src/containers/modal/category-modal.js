import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addCategory, updateCategory } from '../../reducers/category';

const CategoryModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_category: 0,
        name_category: '',
    }

    const [category, setCategory] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setCategory(value)
            } else {
                setCategory(defaultValue)
            }
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newAuthor = { ...category }
        newAuthor[keyName] = keyValue
        setCategory(newAuthor)
    }

    const onSubmit = () => {
        const newCategory = { ...category }
        delete newCategory['id_category']

        if (category.id_category === 0) {
            dispatch(addCategory(newCategory))
        } else {
            dispatch(updateCategory({
                id_category: category.id_category,
                category: newCategory
            }))
        }
        onClose()
    }

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {category.id_category === 0 ? 'THÊM THỂ LOẠI' : "SỬA THỂ LOẠI"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Tên thể loại</Form.Label>
                            <Form.Control type="text" value={category?.name_category} onChange={(e) => onValueChange(e.target.value, 'name_category')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" onClick={onSubmit}>{category.id_category === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default CategoryModal