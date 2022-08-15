import MUIDataTable from 'mui-datatables'
import React from 'react'
import { styled } from '@mui/material';
import { Button } from 'react-bootstrap';

const StylesTable = styled('div', {
    name: 'StyleTable',
    label: 'StyleTable'
})({
    '.MuiTablePagination-selectLabel': {
        margin: '14px 0 16px 0'
    },
    '.MuiTablePagination-displayedRows': {
        margin: '14px 0 16px 0'
    },
    '.MuiTable-root': {
        borderTop: '1px solid #e0e0e0',
    },
    '.MuiTableHead-root': {

    },
    '.MuiTypography-root': {
        color: 'black',
        fontWeight: 'bold'
    },
    '.MuiTablePagination-actions .MuiButtonBase-root': {
        borderRadius: 50,
        background: '#776acf',
        marginRight: 5
    },
    '.css-zylse7-MuiButtonBase-root-MuiIconButton-root .MuiSvgIcon-root': {
        color: '#fff'
    },
    '.MuiPaper-root .MuiToolbar-root': {
        background: '#f8f9fa',
    },
    '.MuiTableCell-root': {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        padding: 6
    },
    '.MuiTableCell-footer': {
        background: '#f8f9fa',
        borderTop: 0,
    },
    '.tss-178gktx-MUIDataTableHeadCell-contentWrapper': {
        color: 'black',
        fontWeight: 'bold'
    },
    '.tss-1akey0g-MUIDataTableHeadCell-data': {
        fontWeight: 'bold'
    },
    '.tss-1qtl85h-MUIDataTableBodyCell-root': {
        marginLeft: 15
    },
    '.css-jtlhu6-MuiTablePagination-root': {
        color: 'rgb(119 106 207)'
    },
    '.tss-1vsygk-MUIDataTableFilterList-root': {
        background: '#f8f9fa',
        paddingLeft: 25,
        margin: 0,
    }
})


const BasicTable = ({ columns, data, titleButton, setIsOpen, titleTable, onRowClick }) => {
    const options = {
        onRowSelectionChange: (rowData) => {
            console.log(rowData)
        },
        // pagination: true,
        selectableRows: 'none',
        onRowClick: (rowData) => onRowClick(rowData),
        // onSearch: (data) => {}
        onRowsDelete: (data) => {
            console.log(data)
        },
        search: true,
        download: false,
        print: false,
        viewColumns: false,
        filter: false,
        // jumpToPage: true,
        filterType: "dropdown",
        responsive: 'standard',
        rowsPerPageOptions: [5, 10, 15, 20],
        rowsPerPage: 10,
        textLabels: {
            body: {
                noMatch: "Không có dữ liệu",
                toolTip: "Sắp xếp",
            },
            pagination: {
                next: "Next Page",
                previous: "Previous Page",
                rowsPerPage: "Số hàng trên mỗi trang:",
                displayRows: "of",
            },
            toolbar: {
                search: "Tìm kiếm",
                downloadCsv: "Download Excel",
                print: "In",
                viewColumns: "View Columns",
                filterTable: "Bộ Lọc",
            },
            filter: {
                all: "Tất cả",
                title: "BỘ LỌC",
                reset: "RESET",
            },
            // selectedRows: {
            //     text: "(hàng) đã chọn. Bạn có chắc chắn muốn xóa không?",
            //     delete: "Xóa",
            //     deleteAria: "Delete Selected Rows",
            // },
            // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
            //     <TableFooter>
            //         <TableRow>
            //             <TablePagination
            //                 count={count}
            //                 rowsPerPage={rowsPerPage}
            //                 page={page}
            //                 onChangePage={(_, page) => changePage(page)}
            //                 onChangeRowsPerPage={event => changeRowsPerPage(event.target.value)}
            //                 rowsPerPageOptions={[10, 15, 100]}
            //             />
            //         </TableRow>
            //     </TableFooter>
            // )
        }
    };
    return (
        <StylesTable>
            {
                titleButton && <Button className='p-2 mb-2' style={{ backgroundColor: 'rgb(119 106 207)', borderColor: 'rgb(119 106 207)' }} onClick={() => setIsOpen(true)}>{titleButton}</Button>
            }
            <MUIDataTable
                title={titleTable}
                data={data}
                columns={columns}
                options={options}
            />
        </StylesTable>
    )
}

export default BasicTable