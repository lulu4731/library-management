import React, { useState, useEffect } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {author.id_author === 0 ? 'THÊM TÁC GIẢ' : "SỬA TÁC GIẢ"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group className='pb-3'>
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Họ</Form.Label>
                            <Form.Control type="text" required value={author?.first_name} onChange={(e) => onValueChange(e.target.value, 'first_name')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" required value={author?.last_name} onChange={(e) => onValueChange(e.target.value, 'last_name')} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Row className='pb-3'>
                        <Col>
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select aria-label="Default select example" value={author?.gender} onChange={(e) => onValueChange(author?.gender === 1 ? 0 : 1, 'gender')}>
                                <option value={0}>Nam</option>
                                <option value={1}>Nữ</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
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
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>{author.id_author === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default AuthorsModal