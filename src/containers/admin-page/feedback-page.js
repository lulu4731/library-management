import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HomePageAdmin from '../../components/home/HomePageAdmin'
import TableBootstrap from '../../components/table/table-bootstrap'
import { feedbackSelector, loadFeedback, searchFeedback } from '../../reducers/feedback'
import ModalEmailFeedback from './modal-email-feedback'
import ModalFeedback from './modal_feedback'
import Select from 'react-select'
import DatePicker from "react-datepicker";

const FeedbackPage = () => {
    const dispatch = useDispatch()
    const feedback = useSelector(feedbackSelector)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEmail, setIsOpenEmail] = useState(false)
    const [item, setItem] = useState()
    const [search, setSearch] = useState({
        problem: { value: 'All', label: 'Tất cả' },
        start: new Date((new Date()).setDate((new Date()).getDate() - (new Date()).getDay() + 1)),
        end: new Date((new Date()).setDate((new Date()).getDate() - (new Date()).getDay() + 7))
    })

    useEffect(() => {
        dispatch(searchFeedback({
            problem: search.problem.value,
            start: search.start.toISOString().split('T')[0],
            end: search.end.toISOString().split('T')[0]
        }))
    }, [dispatch, search])


    const onChangeStatus = (value) => {
        setItem(value)
        setIsOpen(true)
    }


    const onEmail = (value) => {
        setItem(value)
        setIsOpenEmail(true)
    }

    const onClose = () => {
        setIsOpenEmail(false)
        setIsOpen(false)
        setItem()
    }

    const options = [
        { value: 0, label: "Về tài khoản" },
        { value: 1, label: "Về mượn trả sách" },
        { value: 2, label: "Về mượn rách sách, mất sách" },
        { value: 3, label: "Vấn đề khác" },
        { value: 'All', label: 'Tất cả' }
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '2px 0px',
            borderRadius: 20,
            width: 300,
            float: 'right'
        }),
    }

    const onChangeValue = (keyValue, keyName) => {
        const newSearch = { ...search }
        newSearch[keyName] = keyValue

        setSearch(newSearch)
    }

    const header =
    {
        customRender: () => {
            return (
                <>
                    {/* <div className='search-table'>
                        <label style={{ marginBottom: 0 }}>
                            <input type="text" placeholder='Tìm kiếm' style={{ width: '210px' }} value={keyword} onChange={e => setKeyword(e.target.value)} />
                            <i className="fa-solid fa-magnifying-glass icon"></i>
                        </label>
                    </div> */}
                    <Row className='p-0'>
                        <Col>
                            <Select
                                styles={customStyles}
                                options={options}
                                value={search.problem}
                                onChange={(value) => setSearch({ ...search, problem: value })}
                            />
                        </Col>
                        {/* <Col>
                            <DatePicker
                                selected={search.time}
                                onChange={(date) => setSearch({ ...search, time: date })}
                                dateFormat="dd/MM/yyyy"
                                withPortal
                                showYearDropdown
                                scrollableYearDropdown={true}
                                yearDropdownItemNumber={100}
                                peekNextMonth
                                showMonthDropdown
                                dropdownMode="select"
                            />
                        </Col> */}
                        <Col>
                            <DatePicker
                                selected={search.start}
                                onChange={(date) => onChangeValue(date, 'start')}
                                dateFormat="dd/MM/yyyy"
                                selectsStart
                                showYearDropdown
                                peekNextMonth
                                showMonthDropdown
                                dropdownMode="select"
                                startDate={search.start}
                                endDate={search.end}
                            />
                        </Col>
                        <Col styles={{ width: '100px' }}>
                            <DatePicker
                                selected={search.end}
                                onChange={(date) => onChangeValue(date, 'end')}
                                selectsEnd
                                showYearDropdown
                                peekNextMonth
                                showMonthDropdown
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                                startDate={search.start}
                                endDate={search.end}
                                minDate={search.start}
                            />
                        </Col>
                    </Row>
                </>
            );
        }
    }
    const columns = [
        {
            name: "subject",
            label: "Tiêu đề",
        },
        {
            name: "content",
            label: "Nội dung"
        },
        {
            name: "problem",
            label: "Vấn đề",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <p>{value.problem === 3 ? 'Vấn đề khác' : value.problem === 0 ? 'Vấn đề tài khoản' : value.problem === 1 ? 'Về mượn trả sách' : "Về mượn rách sách, mất sách"}</p>
                    )
                }
            }
        },
        {
            name: "time",
            label: "Thời gian"
        },
        {
            name: "name",
            label: "Họ tên"
        },
        {
            name: "email",
            label: "Email"
        },
        {
            name: "phone",
            label: "Số điện thoại"
        },
        {
            name: "action",
            label: "Hành động",
            options: {
                status: true,
                customRender: (value) => {
                    return (
                        <div className='pb-0'>
                            {value.status !== 0 ? (
                                <Badge bg='success'>Đã trả lời</Badge>
                            ) :
                                (
                                    <>
                                        <OverlayTrigger
                                            key={'bottom-email'}
                                            placement={'bottom'}
                                            overlay={
                                                <Tooltip id={`tooltip-email`}>
                                                    Gửi email phản hồi đến độc giả
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant='warning mr-3' onClick={() => onEmail(value)}><i className="fa-solid fa-envelope"></i></Button>
                                        </OverlayTrigger>
                                    </>
                                )}
                        </div>
                    )
                }
            }
        }
    ]

    return (
        <HomePageAdmin>
            {
                <TableBootstrap columns={columns} data={feedback} title="QUẢN LÝ PHẢN HỒI" header={header} />
            }
            {
                isOpen && <ModalFeedback isOpen={isOpen} onClose={onClose} feedback={item} />
            }
            {
                isOpenEmail && <ModalEmailFeedback isOpen={setIsOpenEmail} onClose={onClose} feedback={item} />
            }
        </HomePageAdmin>
    )
}

export default FeedbackPage