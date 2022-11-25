import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { authorsSelector, loadAuthors, searchAuthors } from '../../reducers/authors';
import { categorySelector, loadCategory, searchCategory } from '../../reducers/category';
import { companySelector, loadCompany, searchCompany } from '../../reducers/company';
import { addTitle, updateTitle } from '../../reducers/title';
import convertDate from '../../utils/convertDate';

const TitleModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()
    const company = useSelector(companySelector)
    const category = useSelector(categorySelector)
    const authors = useSelector(authorsSelector)
    const defaultValue = {
        isbn: 0,
        id_title: '',
        name_book: "",
        page: 0,
        price: 0,
        publishing_year: new Date(),
        company: {},
        category: {},
        authors: [],
        description: '',
        img: ''
    }
    const [ds, setDS] = useState(defaultValue)

    useEffect(() => {
        dispatch(searchCompany(''))
        dispatch(searchCategory(''))
        dispatch(searchAuthors(''))
    }, [dispatch])

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setDS(value)
            } else {
                setDS(defaultValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const companyOptions = company.map(item => {
        return {
            value: item.id_publishing_company,
            label: item.name_publishing_company
        }
    })

    const categoryOptions = category.map(item => {
        return {
            value: item.id_category,
            label: item.name_category
        }
    })

    const authorsOptions = authors.map(item => {
        return {
            value: item.id_author,
            label: item.first_name + " " + item.last_name
        }
    })

    const styles = {
        multiValue: (base, state) => {
            return { ...base, backgroundColor: 'rgba(54, 179, 126, 0.1)', color: 'rgb(54, 179, 126)' };
        },
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
                : base;
        },
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: 'none' } : base;
        },
    };

    const onChangeValue = (keyValue, keyName) => {
        const newDS = { ...ds }
        newDS[keyName] = keyValue
        setDS(newDS)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let newDS = { ...ds }
        delete newDS['isbn']
        newDS['publishing_year'] = convertDate(ds.publishing_year)

        if (ds.isbn === 0) {
            dispatch(addTitle(newDS))
        } else {
            dispatch(updateTitle({
                isbn: +ds.isbn,
                ds: newDS
            }))
        }

        onClose()
    }
    return (
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {ds.isbn === 0 ? 'THÊM ĐẦU SÁCH' : "SỬA ĐẦU SÁCH"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Mã đầu sách</Form.Label>
                            <Form.Control type="text" required value={ds?.id_title} onChange={(e) => onChangeValue(e.target.value, 'id_title')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Tên đầu sách</Form.Label>
                            <Form.Control type="text" required value={ds?.name_book} onChange={(e) => onChangeValue(e.target.value, 'name_book')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Nhà xuất bản</Form.Label>
                            <Select
                                options={companyOptions}
                                value={ds?.company}
                                onChange={(value) => onChangeValue(value, 'company')}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Giá mượn</Form.Label>
                            <Form.Control type="text" value={ds?.price} onChange={(e) => onChangeValue(e.target.value, 'price')} />
                        </Col>
                        <Col>
                            <Form.Label>Số trang</Form.Label>
                            <Form.Control type="text" value={ds?.page} onChange={(e) => onChangeValue(e.target.value, 'page')} />
                        </Col>
                        <Col>
                            <Form.Label>Năm xuất bản</Form.Label>
                            <DatePicker
                                selected={ds?.publishing_year}
                                dateFormat="yyyy"
                                onChange={(date) => onChangeValue(date, 'publishing_year')}
                                showYearPicker
                                dropdownMode="select"
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Thể loại</Form.Label>
                            <Select
                                options={categoryOptions}
                                value={ds?.category}
                                onChange={(value) => onChangeValue(value, 'category')}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Tác giả</Form.Label>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={authorsOptions}
                                styles={styles}
                                value={ds?.authors || []}
                                onChange={(value) => onChangeValue(value, 'authors')}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Link ảnh</Form.Label>
                            <Form.Control type="text" value={ds?.img} onChange={(e) => onChangeValue(e.target.value, 'img')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className='pb-3'>
                    <Row>
                        <Col>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control as="textarea" rows={4} value={ds?.description} onChange={(e) => onChangeValue(e.target.value, 'description')} />
                        </Col>
                    </Row>
                </Form.Group>
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>{ds.isbn === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default TitleModal