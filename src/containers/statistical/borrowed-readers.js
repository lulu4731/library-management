import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../components/home/HomePage';
import { checkLogin, librarianSelector } from '../../reducers/librarian';
import { loadStatisticalReaders, statisticalReadersSelector } from '../../reducers/statistical';
import convertDate from '../../utils/convertDate';
import ReactToPrint from 'react-to-print';
import DatePicker from "react-datepicker";

const tabStyle = {
    height: 700,
    maxHeight: 'auto',
    // width: "80%",
    overflowY: "scroll",
    border: "1px solid #ccc"
    //backgroundColor: "blue"
};

export const ComponentToPrintReader = React.forwardRef((props, ref) => {
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
                <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ SÁCH MÀ ĐỘC GIẢ ĐÃ MƯỢN</h4>
                <Table bordered={true}>
                    <thead>
                        <tr>
                            <th>Tên độc giả</th>
                            <th>Số sách đã mượn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.value.length > 0 && (
                            props.value.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name_reader}</td>
                                    <td>{item.amount_readers || 0}</td>
                                </tr>
                            ))
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
const BorrowedReaders = () => {
    const dispatch = useDispatch()
    const statisticalReaders = useSelector(statisticalReadersSelector)
    const [startDateReaders, setStartDateReaders] = useState(new Date((new Date()).getFullYear(), 0, 1));
    const [endDateReaders, setEndDateReaders] = useState(new Date((new Date()).getFullYear(), 12, 0));
    const librarian = useSelector(librarianSelector)

    useEffect(() => {
        dispatch(loadStatisticalReaders({ startDate: convertDate(startDateReaders), endDate: convertDate(endDateReaders) }))
    }, [dispatch, startDateReaders, endDateReaders])

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    const componentRef = useRef();

    const onChangeValue = (keyValue, keyName) => {
        if (keyName === 'start') {
            setStartDateReaders(keyValue)
            dispatch(loadStatisticalReaders({ startDate: convertDate(keyValue), endDate: convertDate(endDateReaders) }))
        } else {
            setEndDateReaders(keyValue)
            dispatch(loadStatisticalReaders({ startDate: convertDate(startDateReaders), endDate: convertDate(keyValue) }))
        }
    }
    return (
        <>
            <HomePage>
                <Row className='m-3 p-5'>
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
                                                selected={startDateReaders}
                                                onChange={(date) => onChangeValue(date, 'start')}
                                                selectsStart
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReaders}
                                                endDate={endDateReaders}
                                            />
                                        </Col>
                                        <Col>
                                            <DatePicker
                                                selected={endDateReaders}
                                                onChange={(date) => onChangeValue(date, 'end')}
                                                selectsEnd
                                                dateFormat="dd/MM/yyyy"
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                startDate={startDateReaders}
                                                endDate={endDateReaders}
                                                minDate={startDateReaders}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <ComponentToPrintReader ref={componentRef} value={statisticalReaders} librarian={librarian} />
                        </div>
                    </Col>
                </Row>
            </HomePage>
        </>
    )
}

export default BorrowedReaders