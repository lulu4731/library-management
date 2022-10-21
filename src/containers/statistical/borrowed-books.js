import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../components/home/HomePage';
import { checkLogin, librarianSelector } from '../../reducers/librarian';
import { loadStatisticalDS, statisticalDsSelector } from '../../reducers/statistical';
import convertDate from '../../utils/convertDate';
import ReactToPrint from 'react-to-print';
import DatePicker from "react-datepicker";

const tabStyle = {
    height: 750,
    maxHeight: 'auto',
    // width: "80%",
    overflowY: "scroll",
    border: "1px solid #ccc"
    //backgroundColor: "blue"
};
export const ComponentToPrintDs = React.forwardRef((props, ref) => {
    return (
        <div style={tabStyle} className="mt-3">
            <div className='m-3' ref={ref}>
                <Row>
                    <Col>
                        <div className='float-left'>
                            <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>THƯ VIỆN HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>
                            <h6 className="text-center" style={{ fontWeight: 'bold' }}>Cơ sở tại TP. Hồ Chí Minh</h6>
                        </div>
                    </Col>
                    <Col>
                        <div className='float-right'>
                            <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                            <h6 className="text-center" style={{ fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh phúc</h6>
                        </div>
                    </Col>
                </Row>
                <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ LƯỢNG SÁCH ĐƯỢC MƯỢN</h4>
                <Table striped bordered={true} hover>
                    <thead>
                        <tr>
                            <th>Tên sách</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.value.length > 0 && (
                            props.value.map((item, index) => {
                                if (item.name_book !== undefined) {
                                    return (<tr key={index}>
                                        <td>{item.name_book}</td>
                                        <td>{item.amount_book || 0}</td>
                                    </tr>)
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td style={{ backgroundColor: 'aqua', textAlign: "center" }} colSpan={2}>{item}</td>
                                        </tr>
                                    )
                                }
                            })
                        )}
                    </tbody>
                </Table>

                <Row>
                    <Col></Col>
                    <Col>
                        <div className='float-right'>
                            <p className="mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>TP. Hồ Chí Minh, ngày {(new Date()).getDate()}, tháng {(new Date()).getMonth() + 1}, năm {(new Date()).getFullYear()}</p>
                            <h6 className="text-center" style={{ fontWeight: 'bold' }}>Họ và tên thủ thư tạo phiếu</h6>
                            <h6 className="text-center" style={{ fontWeight: 'bold' }}>{props.librarian?.first_name + " " + props.librarian?.last_name}</h6>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
});
const BorrowedBooks = () => {
    const dispatch = useDispatch()
    const statisticalDS = useSelector(statisticalDsSelector)
    const librarian = useSelector(librarianSelector)

    const [startDateDs, setStartDateDs] = useState(new Date((new Date()).getFullYear(), 0, 1));
    const [endDateDs, setEndDateDs] = useState(new Date((new Date()).getFullYear(), 12, 0));

    useEffect(() => {
        dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(endDateDs) }))
    }, [dispatch, startDateDs, endDateDs])

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    const componentRef = useRef();

    const onChangeValue = (keyValue, keyName) => {
        if (keyName === 'start') {
            setStartDateDs(keyValue)
            dispatch(loadStatisticalDS({ startDate: convertDate(keyValue), endDate: convertDate(endDateDs) }))
        } else {
            setEndDateDs(keyValue)
            dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(keyValue) }))
        }
    }
    return (
        <>
            <HomePage>
                <Row className='m-3 pl-5 pr-5'>
                    <Col>
                        <div>
                            <Row>
                                <Col>
                                    <ReactToPrint
                                        trigger={() => <Button><i className="fa-solid fa-print mr-2"></i>Print/Export</Button>}
                                        content={() => componentRef.current}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <DatePicker
                                                selected={startDateDs}
                                                onChange={(date) => onChangeValue(date, 'start')}
                                                dateFormat="dd/MM/yyyy"
                                                selectsStart
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                startDate={startDateDs}
                                                endDate={endDateDs}
                                            />
                                        </Col>
                                        <Col>
                                            <DatePicker
                                                selected={endDateDs}
                                                onChange={(date) => onChangeValue(date, 'end')}
                                                selectsEnd
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateDs}
                                                endDate={endDateDs}
                                                minDate={startDateDs}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <ComponentToPrintDs ref={componentRef} value={statisticalDS} librarian={librarian} />
                        </div>
                    </Col>
                </Row>
            </HomePage>
        </>
    )
}

export default BorrowedBooks