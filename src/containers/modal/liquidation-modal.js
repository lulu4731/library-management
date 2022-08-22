import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { addLiquidations, bookLiquidationsSelector, loadBookLiquidations, updateLiquidations } from '../../reducers/liquidation';

const LiquidationModal = ({ isOpen, onClose, value }) => {
    const dispatch = useDispatch()
    const bookLiquidation = useSelector(bookLiquidationsSelector)

    const defaultValue = {
        id_liquidation: 0,
        books: []
    }
    const [liquidation, setLiquidation] = useState(defaultValue)

    useEffect(() => {
        dispatch(loadBookLiquidations())
    }, [dispatch])

    useEffect(() => {
        if (value) {
            if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
                setLiquidation(value)
            } else {
                setLiquidation(defaultValue)
            }
        }
    }, [value])

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
        const newLiquidation = { ...liquidation }
        newLiquidation[keyName] = keyValue

        setLiquidation(newLiquidation)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (liquidation.id_liquidation === 0) {
            dispatch(addLiquidations({ books: liquidation.books }))
        } else {
            dispatch(updateLiquidations({
                id_liquidation: liquidation.id_liquidation,
                books: liquidation.books
            }))
        }

        setLiquidation(defaultValue)
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
                    THÊM PHIẾU THANH LÝ
                </Modal.Title>
                <Button variant='secondary' onClick={onClose}><i className="fa-solid fa-xmark"></i></Button>
            </Modal.Header>
            <Form className='form-modal' onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Form.Label>Tác giả</Form.Label>
                                <Select
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={bookLiquidation}
                                    styles={styles}
                                    value={liquidation?.books || []}
                                    onChange={(value) => onChangeValue(value, 'books')}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>Đóng</Button>
                    <Button variant="primary" type='submit'>{liquidation.id_liquidation === 0 ? 'Thêm' : "Sửa"}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default LiquidationModal