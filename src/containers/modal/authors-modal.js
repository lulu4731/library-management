import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addAuthors, updateAuthors } from '../../reducers/authors';
import ReactDatePicker from '../../utils/reactDatePicker';

const AuthorsModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()

    const defaultValue = {
        id_author: 0,
        first_name: '',
        last_name: '',
        gender: 0,
        date_of_birth: new Date('1900/01/01')
    }

    const [author, setAuthor] = useState(defaultValue)

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setAuthor(value)
            } else {
                setAuthor(defaultValue)
            }
        }
    }, [value])

    const onValueChange = (keyValue, keyName) => {
        const newAuthor = { ...author }
        newAuthor[keyName] = keyValue
        setAuthor(newAuthor)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newAuthor = { ...author }
        delete newAuthor['id_author']
        newAuthor['date_of_birth'] = author.date_of_birth.toISOString()

        console.log(newAuthor)

        if (author.id_author === 0) {
            dispatch(addAuthors(newAuthor))
        } else {
            dispatch(updateAuthors({
                id_author: author.id_author,
                author: newAuthor
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
                    THÊM TÁC GIẢ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Họ</Form.Label>
                                <Form.Control type="text" required value={author?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                            </Col>
                            <Col>
                                <Form.Label>Tên</Form.Label>
                                <Form.Control type="text" required value={author?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select aria-label="Default select example" value={author?.gender} onChange={(e) => onValueChange(author?.gender === 1 ? 0 : 1, 'gender')}>
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label>Ngày sinh</Form.Label>
                                <ReactDatePicker
                                    startYear={1300}
                                    endYear={2010}
                                    selected={author.date_of_birth}
                                    onChange={(date) => onValueChange(date, 'date_of_birth')}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>{author.id_author === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AuthorsModal