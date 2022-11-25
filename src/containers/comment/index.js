import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from '../../components/home/HomePage'
import { deleteComment, searchComment, searchCommentSelector } from '../../reducers/comment'
import Select from 'react-select'

const Comment = () => {
    const comment = useSelector(searchCommentSelector)
    const [data, setData] = useState(comment)
    const [select, setSelect] = useState({
        value: -1,
        label: 'All'
    })

    useEffect(() => {
        if (select.value === -1) {
            setData(comment)
        } else {
            const index = dsOptions.map(item => JSON.stringify(item)).indexOf(JSON.stringify(select))
            setData(comment.slice(comment.indexOf(select.label), dsOptions[index + 1].value === -1 ? comment.length : dsOptions[index + 1].value))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment, select])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchComment())
    }, [dispatch])
    const [pageNumber, setPageNumber] = useState(0)

    const todoPerPage = 6
    const pagesVisited = pageNumber * todoPerPage

    const pageCount = Math.ceil(data.length / todoPerPage)

    const display = data
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((item, index) => {
            if (typeof (item) === 'string') {
                return (
                    <tr key={index}>
                        <td colSpan={4} style={{ textAlign: 'center', backgroundColor: 'blanchedalmond' }}><b>{item}</b></td>
                    </tr>
                )
            } else {
                return (
                    <>
                        <tr>
                            <td>{item.reader.first_name + ' ' + item.reader.last_name}</td>
                            <td>{item.content}</td>
                            <td>{item.day} - {item.time}</td>
                            <td>
                                <Button variant='danger' onClick={() => onDelete(item.id_cmt, item.id_cmt_parent, item.isbn)}><i className="fa-solid fa-trash-can"></i></Button>
                            </td>
                        </tr>
                        {
                            item.commentChildren.length > 0 && (
                                <tr>
                                    <td style={{ textAlign: 'center', backgroundColor: 'blanchedalmond' }}>Bình luận con</td>
                                    <td colSpan={3} className="p-0">
                                        <Table className="table-info m-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ backgroundColor: 'blanchedalmond' }}>Tên độc giả</th>
                                                    <th style={{ backgroundColor: 'blanchedalmond' }}>Nội dung</th>
                                                    <th style={{ backgroundColor: 'blanchedalmond' }}>Ngày giờ</th>
                                                    <th style={{ backgroundColor: 'blanchedalmond' }}>Hành động</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.commentChildren.map((cmt, index) => (
                                                        <tr key={index}>
                                                            <td>{cmt.reader.first_name + ' ' + cmt.reader.last_name}</td>
                                                            <td>{cmt.content}</td>
                                                            <td>{cmt.day} - {cmt.time}</td>
                                                            <td>
                                                                <Button variant='danger' onClick={() => onDelete(cmt.id_cmt, item.id_cmt, item.isbn)}><i className="fa-solid fa-trash-can"></i></Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </td>
                                </tr>
                            )
                        }
                    </>
                )
            }
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const onDelete = (id_cmt, id_cmt_parent, isbn) => {
        dispatch(deleteComment({ id_cmt, isbn, id_cmt_parent }))
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '2px 0px',
            borderRadius: 20,
            width: 300,
            float: 'right'
        }),
    }

    let dsOptions = comment.filter(item => typeof (item) === 'string')
    dsOptions.push('All')
    dsOptions = dsOptions.map(item => {
        return {
            label: item,
            value: comment.indexOf(item)
        }
    })

    return (
        <HomePage>
            <Table bordered className="table-info box-comments">
                <thead>
                    <tr>
                        <th colSpan={2} scope="col" style={{ fontSize: 25, borderRight: 0, borderBottom: 0 }}>Quản lý bình luận</th>
                        <th colSpan={2} scope="col" style={{ borderLeft: 0, borderBottom: 0 }}>
                            <Row className='p-0'>
                                <Select
                                    styles={customStyles}
                                    options={dsOptions}
                                    value={select}
                                    onChange={(value) => setSelect(value)}
                                />
                            </Row>
                        </th>
                    </tr>
                    <tr>
                        <th>Tên độc giả</th>
                        <th>Nội dung</th>
                        <th>Ngày giờ</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                    <tr>
                        <td colSpan={4}>
                            <ReactPaginate
                                previousLabel={<i className="fa fa-chevron-left "></i>}
                                nextLabel={<i className="fa fa-chevron-right"></i>}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"pagination justify-content-center"}
                                pageClassName={"page-item me-2"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item me-2"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item me-2"}
                                breakLinkClassName={"page-link"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"active"}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </HomePage>

    )
}

export default Comment