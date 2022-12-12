import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'

const TableBootstrap = ({ columns = [], data = [], title, titleButton, onOpen, page, header, spanTitle, spanToolbar }) => {
    const [pageNumber, setPageNumber] = useState(0)
    // const [keyword, setKeyword] = useState('')
    const todoPerPage = page || 10
    const pagesVisited = pageNumber * todoPerPage

    let pageCount = Math.ceil(data.length / todoPerPage)

    const display = data
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((item, index) => {
            return (
                <tr key={index}>
                    {
                        columns.map((custom, index) => {
                            if (custom?.options?.status) {
                                return <td key={index}>{custom.options.customRender(item)}</td>
                            }
                            return <td key={index}>{item[`${custom.name}`]}</td>
                        })
                    }
                </tr>
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    // useEffect(() => {
    //     changePage({ selected: data.length > todoPerPage ?  pageNumber : 0})
    // }, [data, pageNumber])

    // console.log(keyword)
    return (
        <>
            {
                titleButton && <Button className='p-2 mb-2' style={{ backgroundColor: 'rgb(119 106 207)', borderColor: 'rgb(119 106 207)' }} onClick={() => onOpen()}>{titleButton}</Button>
            }
            <Table bordered hover className="table-info box-comments">
                <thead>
                    <tr>
                        <th colSpan={spanTitle || columns.length % 2 === 0 ? columns.length / 2 : columns.length / 2 + 1} scope="col" style={{ fontSize: 25, borderRight: 0, borderBottom: 0 }}>{title}</th>
                        <th colSpan={spanToolbar || columns.length / 2} scope="col" style={{ borderLeft: 0, borderBottom: 0 }}>
                            {
                                !header ? (
                                    <div className='search-table'>
                                        <label style={{ marginBottom: 0 }}>
                                            <input type="text" placeholder='Tìm kiếm' />
                                            <i className="fa-solid fa-magnifying-glass icon"></i>
                                        </label>
                                    </div>
                                ) : header.customRender(changePage)
                            }
                        </th>
                    </tr>
                    <tr>
                        {columns.map((item, index) => (
                            <th key={index}>{item?.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {display}
                    <tr>
                        <td colSpan={columns.length}>
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
        </>
    )
}

export default TableBootstrap