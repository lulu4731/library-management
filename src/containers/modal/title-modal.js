import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { authorsSelector, loadAuthors } from '../../reducers/authors';
import { categorySelector, loadCategory } from '../../reducers/category';
import { companySelector, loadCompany } from '../../reducers/company';
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
        dispatch(loadCompany())
        dispatch(loadCategory())
        dispatch(loadAuthors())
    }, [dispatch])

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setDS(value)
            } else {
                setDS(defaultValue)
            }
        }
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

    // const onClose = () => {
    //     setModalShow(false)
    //     setDS(defaultValue)
    // }

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
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={isOpen}
            onHide={onClose}
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    THÊM ĐẦU SÁCH
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Mã đầu sách</Form.Label>
                                <Form.Control type="text" required value={ds?.id_title} onChange={(e) => onChangeValue(e.target.value, 'id_title')} />
                            </Col>
                            <Col>
                                <Form.Label>Tên đầu sách</Form.Label>
                                <Form.Control type="text" required value={ds?.name_book} onChange={(e) => onChangeValue(e.target.value, 'name_book')} />
                            </Col>
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
                    <br />
                    <Form.Group>
                        <Row>
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
                    <br />
                    <Form.Group>
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
                            <Col>
                                <Form.Label>Link ảnh</Form.Label>
                                <Form.Control type="text" value={ds?.img} onChange={(e) => onChangeValue(e.target.value, 'img')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control type="text" value={ds?.description} onChange={(e) => onChangeValue(e.target.value, 'description')} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>{ds.isbn === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default TitleModal