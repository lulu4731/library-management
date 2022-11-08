import React, { useEffect, useState } from 'react'
import { Button, Modal, Row, Col, Form, Offcanvas } from 'react-bootstrap'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Offcanvas show={isOpen} onHide={onClose} placement="end" scroll className="modal-love">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='title-love'>
                    {liquidation.id_liquidation === 0 ? 'THÊM PHIẾU THANH LÝ' : "SỬA PHIẾU THANH LÝ"}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Label>Chọn sách thanh lý</Form.Label>
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
            </Offcanvas.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Đóng</Button>
                <Button variant="primary" type='submit' onClick={onSubmit}>{liquidation.id_liquidation === 0 ? 'Thêm' : "Sửa"}</Button>
            </Modal.Footer>
        </Offcanvas>
    )
}

export default LiquidationModal