import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import HomePageAdmin from '../../components/home/HomePageAdmin'
import TableBootstrap from '../../components/table/table-bootstrap'
import { feedbackSelector, loadFeedback } from '../../reducers/feedback'
import ModalEmailFeedback from './modal-email-feedback'
import ModalFeedback from './modal_feedback'
import Select from 'react-select'

const FeedbackPage = () => {
    const dispatch = useDispatch()
    const feedback = useSelector(feedbackSelector)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEmail, setIsOpenEmail] = useState(false)
    const [item, setItem] = useState()
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(loadFeedback())
    }, [dispatch])

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
        { value: 3, label: "Vấn đề khác" }
    ]

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '2px 0px',
            borderRadius: 20,
        }),
    }

    const header =
    {
        customRender: () => {
            return (
                <>
                    <div className='search-table'>
                        <label style={{ marginBottom: 0 }}>
                            <input type="text" placeholder='Tìm kiếm' style={{ width: '210px' }} value={keyword} onChange={e => setKeyword(e.target.value)} />
                            <i className="fa-solid fa-magnifying-glass icon"></i>
                        </label>
                    </div>
                    <Row className='p-0'>
                        <Select
                            styles={customStyles}
                            options={options}

                        // value={problem}
                        // onChange={(value) => onChangeValue(value, 'problem')}
                        />
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
                            {value.status === 0 ? <OverlayTrigger
                                key={'bottom-status'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-status`}>
                                        Đánh dấu đã đọc
                                    </Tooltip>
                                }
                            >
                                <Button variant='primary mr-3' onClick={() => onChangeStatus(value)}><i className="fa-solid fa-eye"></i></Button>
                            </OverlayTrigger> : (
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