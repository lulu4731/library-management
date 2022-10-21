import React from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import HomePageAdmin from '../../components/home/HomePageAdmin'
import TableBootstrap from '../../components/table/table-bootstrap'

const FeedbackPage = () => {
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
            name: "day",
            label: "Thời gian"
        },
        {
            name: "first_name",
            label: "Họ"
        },
        {
            name: "last_name",
            label: "Tên"
        },
        {
            name: "email",
            label: "Email"
        },
        {
            name: "Số điện thoại",
            label: "phone"
        },
        {
            name: "action",
            label: "Hành động",
            options: {
                status: true,
                customRender: (value) => {
                    console.log(value)
                    return (
                        <div className='pb-0'>
                            <OverlayTrigger
                                key={'bottom-edit'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-edit`}>
                                        Đánh dấu đã đọc
                                    </Tooltip>
                                }
                            >
                                <Button variant='primary mr-3'><i className="fa-solid fa-pen-to-square"></i></Button>
                            </OverlayTrigger>
                            {/* <OverlayTrigger
                                key={'bottom-delete'}
                                placement={'bottom'}
                                overlay={
                                    <Tooltip id={`tooltip-delete`}>
                                        Xóa
                                    </Tooltip>
                                }
                            >
                                <Button variant='danger'><i className="fa-solid fa-trash-can"></i></Button>
                            </OverlayTrigger> */}
                        </div>
                    )
                }
            }
        }
    ]

    const data = [
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss1',
            content: 'Sao khóa tài khoản của tôi'
        },
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss2',
            content: 'Sao khóa tài khoản của tôi'
        },
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss3',
            content: 'Sao khóa tài khoản của tôi'
        },
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss4',
            content: 'Sao khóa tài khoản của tôi'
        },
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss5',
            content: 'Sao khóa tài khoản của tôi'
        },
        {
            subject: 'Mở khóa tài khoảnsssssssssssssssssss6',
            content: 'Sao khóa tài khoản của tôi'
        }
    ]
    return (
        <HomePageAdmin>
            {/* <Table striped bordered hover className="table-info">
                <thead>
                    <tr>
                        <th colSpan={3} scope="col" style={{ fontSize: 25, borderRight: 0, borderBottom: 0 }}>QUẢN LÝ PHẢN HỒI</th>
                        <th colSpan={4} scope="col" style={{ borderLeft: 0, borderBottom: 0 }}>
                            <div className='search-table'>
                                <label style={{ marginBottom: 0 }}>
                                    <input type="text" placeholder='Tìm kiếm' />
                                    <i className="fa-solid fa-magnifying-glass icon"></i>
                                </label>
                            </div>
                        </th>
                    </tr>
                    <tr style={{ borderBottom: 0 }}>
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Họ tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope='col'>Hàng động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ borderTop: 0 }}>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td colSpan={7}>
                            <ReactPaginate
                                previousLabel={<i className="fa fa-chevron-left "></i>}
                                nextLabel={<i className="fa fa-chevron-right"></i>}
                                pageCount={5}
                                onPageChange={1}
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
            </Table> */}
            <TableBootstrap columns={columns} data={data} title="QUẢN LÝ PHẢN HỒI"/>
        </HomePageAdmin>
    )
}

export default FeedbackPage