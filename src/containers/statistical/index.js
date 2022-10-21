import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../components/home/HomePage'
import { loadStatisticalBookByDay, loadStatisticalDS, loadStatisticalReaders, loadStatisticalReadersByDay, loadStatisticalReadersExpired, loadStatisticalTopBookMonth, loadStatisticalTopBookWeek, statisticalDsSelector, statisticalReaderExpiredSelector, statisticalReadersDaySelector, statisticalReadersSelector, statisticalTopBookMonthSelector, statisticalTopBookWeekSelector } from '../../reducers/statistical';
import ReactToPrint from 'react-to-print';
import DatePicker from "react-datepicker";
import convertDate from '../../utils/convertDate';
import convertTimesTamp from '../../utils/convertTimesTamp';
import { checkLogin, librarianSelector } from '../../reducers/librarian';
import BaseChart from '../../components/base-chart'

// const tabStyle = {
//     height: 600,
//     maxHeight: 'auto',
//     // width: "80%",
//     overflowY: "scroll",
//     border: "1px solid #ccc"
//     //backgroundColor: "blue"
// };
// export const ComponentToPrintDs = React.forwardRef((props, ref) => {
//     return (
//         <div style={tabStyle} className="mt-3">
//             <div className='m-3' ref={ref}>
//                 <Row>
//                     <Col>
//                         <div className='float-left'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>THƯ VIỆN HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Cơ sở tại TP. Hồ Chí Minh</h6>
//                         </div>
//                     </Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh phúc</h6>
//                         </div>
//                     </Col>
//                 </Row>
//                 <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ LƯỢNG SÁCH ĐƯỢC MƯỢN</h4>
//                 <Table striped bordered={true} hover>
//                     <thead>
//                         <tr>
//                             <th>Tên sách</th>
//                             <th>Số lượng</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {props.value.length > 0 && (
//                             props.value.map((item, index) => {
//                                 if (item.name_book !== undefined) {
//                                     return (<tr key={index}>
//                                         <td>{item.name_book}</td>
//                                         <td>{item.amount_book || 0}</td>
//                                     </tr>)
//                                 } else {
//                                     return (
//                                         <tr key={index}>
//                                             <td style={{ backgroundColor: 'aqua', textAlign: "center" }} colSpan={2}>{item}</td>
//                                         </tr>
//                                     )
//                                 }
//                             })
//                         )}
//                     </tbody>
//                 </Table>

//                 <Row>
//                     <Col></Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>TP. Hồ Chí Minh, ngày {(new Date()).getDate()}, tháng {(new Date()).getMonth() + 1}, năm {(new Date()).getFullYear()}</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Họ và tên thủ thư tạo phiếu</h6>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>{props.librarian?.first_name + " " + props.librarian?.last_name}</h6>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     );
// });

// export const ComponentToPrintReader = React.forwardRef((props, ref) => {
//     return (
//         <div style={tabStyle} className="mt-3">
//             <div className='m-3' ref={ref}>
//                 <Row>
//                     <Col>
//                         <div className='float-left'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>THƯ VIỆN HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Cơ sở tại TP. Hồ Chí Minh</h6>
//                         </div>
//                     </Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh phúc</h6>
//                         </div>
//                     </Col>
//                 </Row>
//                 <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ SÁCH MÀ ĐỘC GIẢ ĐÃ MƯỢN</h4>
//                 <Table striped bordered={true} hover>
//                     <thead>
//                         <tr>
//                             <th>Tên độc giả</th>
//                             <th>Số sách đã mượn</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {props.value.length > 0 && (
//                             props.value.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.name_reader}</td>
//                                     <td>{item.amount_readers || 0}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </Table>
//                 <Row>
//                     <Col></Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>TP. Hồ Chí Minh, ngày {(new Date()).getDate()}, tháng {(new Date()).getMonth() + 1}, năm {(new Date()).getFullYear()}</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Họ và tên thủ thư tạo phiếu</h6>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>{props.librarian?.first_name + " " + props.librarian?.last_name}</h6>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     );
// });

// export const ComponentToPrintReaderExpired = React.forwardRef((props, ref) => {
//     return (
//         <div style={tabStyle} className="mt-3">
//             <div className='m-3' ref={ref}>
//                 <Row>
//                     <Col>
//                         <div className='float-left'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>THƯ VIỆN HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Cơ sở tại TP. Hồ Chí Minh</h6>
//                         </div>
//                     </Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="text-center mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Độc lập - Tự do - Hạnh phúc</h6>
//                         </div>
//                     </Col>
//                 </Row>
//                 <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ NHỮNG SÁCH QUÁ HẠN CỦA ĐỘC GIẢ</h4>
//                 <Table striped bordered={true} hover>
//                     <thead>
//                         <tr>
//                             <th>Tên độc giả</th>
//                             <th>Hạn trả sách</th>
//                             <th>Số điện thoại</th>
//                             <th>Mã sách</th>
//                             <th>Tên sách</th>
//                             <th>Số ngày quá hạn</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {props.value.length > 0 && (
//                             props.value.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.name_reader}</td>
//                                     <td>{convertTimesTamp(item?.expired)}</td>
//                                     <td>{item.phone}</td>
//                                     <td>{item.id_book}</td>
//                                     <td>{item.name_book}</td>
//                                     <td>{item.day.days}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </Table>
//                 <Row>
//                     <Col></Col>
//                     <Col>
//                         <div className='float-right'>
//                             <p className="mb-1 mt-4" style={{ fontWeight: 'bold', fontSize: 18 }}>
//                                 TP. Hồ Chí Minh, ngày {(new Date()).getDate()}, tháng {(new Date()).getMonth() + 1}, năm {(new Date()).getFullYear()}</p>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>Họ và tên thủ thư tạo phiếu</h6>
//                             <h6 className="text-center" style={{ fontWeight: 'bold' }}>{props.librarian?.first_name + " " + props.librarian?.last_name}</h6>
//                         </div>
//                     </Col>
//                 </Row>
//             </div>
//         </div>
//     );
// });
const StatisticalPage = () => {
    const dispatch = useDispatch()
    // const statisticalDS = useSelector(statisticalDsSelector)
    // const statisticalReaders = useSelector(statisticalReadersSelector)
    // const statisticalReaderExpired = useSelector(statisticalReaderExpiredSelector)
    // const librarian = useSelector(librarianSelector)
    const statisticalTopBookWeek = useSelector(statisticalTopBookWeekSelector)
    const statisticalTopBookMonth = useSelector(statisticalTopBookMonthSelector)

    // const [startDateDs, setStartDateDs] = useState(new Date((new Date()).getFullYear(), 0, 1));
    // const [endDateDs, setEndDateDs] = useState(new Date((new Date()).getFullYear(), 12, 0));

    // const [startDateReaders, setStartDateReaders] = useState(new Date((new Date()).getFullYear(), 0, 1));
    // const [endDateReaders, setEndDateReaders] = useState(new Date((new Date()).getFullYear(), 12, 0));

    // const [startDateReadersExpire, setStartDateReadersExpire] = useState(new Date((new Date()).getFullYear(), 0, 1));
    // const [endDateReadersExpire, setEndDateReadersExpire] = useState(new Date((new Date()).getFullYear(), 12, 0));

    // useEffect(() => {
    //     dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(endDateDs) }))
    // }, [dispatch, startDateDs, endDateDs])

    // useEffect(() => {
    //     dispatch(loadStatisticalReaders({ startDate: convertDate(startDateReaders), endDate: convertDate(endDateReaders) }))
    // }, [dispatch, startDateReaders, endDateReaders])

    // useEffect(() => {
    //     dispatch(loadStatisticalReadersExpired({ startDate: convertDate(startDateReadersExpire), endDate: convertDate(endDateReadersExpire) }))
    // }, [dispatch, startDateReadersExpire, endDateReadersExpire])

    useEffect(() => {
        dispatch(checkLogin())
        dispatch(loadStatisticalTopBookWeek())
        dispatch(loadStatisticalTopBookMonth())
    }, [dispatch])

    // const componentRef1 = useRef();
    // const componentRef2 = useRef();
    // const componentRef3 = useRef();

    // const onChangeValue = (date, keyName1, keyName2) => {
    //     if (keyName1 === 'ds') {
    //         if (keyName2 === 'start') {
    //             setStartDateDs(date)
    //             dispatch(loadStatisticalDS({ startDate: convertDate(date), endDate: convertDate(endDateDs) }))
    //         } else {
    //             setEndDateDs(date)
    //             dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(date) }))
    //         }
    //     } else if (keyName1 === 'readers') {
    //         if (keyName2 === 'start') {
    //             setStartDateReaders(date)
    //             dispatch(loadStatisticalDS({ startDate: convertDate(date), endDate: convertDate(endDateReaders) }))
    //         } else {
    //             setEndDateReaders(date)
    //             dispatch(loadStatisticalDS({ startDate: convertDate(startDateReaders), endDate: convertDate(date) }))
    //         }
    //     } else {
    //         if (keyName2 === 'start') {
    //             setStartDateReadersExpire(date)
    //             dispatch(loadStatisticalReadersExpired({ startDate: convertDate(date), endDate: convertDate(endDateReadersExpire) }))
    //         } else {
    //             setEndDateReadersExpire(date)
    //             dispatch(loadStatisticalDS({ startDate: convertDate(startDateReadersExpire), endDate: convertDate(date) }))
    //         }
    //     }
    // }

    return (
        <>
            <HomePage>
                {/* <h3>THỐNG KÊ</h3> */}
                <Row className='m-3'>
                    <Col className='mb-4'>
                        <Card className='align-items-center border border-secondary'>
                            <Card.Header style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>THỐNG KÊ TOP 5 SÁCH ĐƯỢC MƯỢN NHIỀU NHẤT TUẦN</Card.Header>
                            <div style={{ height: 1, width: '100%', backgroundColor: 'darkgray' }}></div>
                            <Card.Body className='align-items-center'>
                                <BaseChart labels={statisticalTopBookWeek?.books || []} series={statisticalTopBookWeek?.amount || []} type="donut"
                                    width="600" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-4'>
                        <Card className='align-items-center border border-secondary'>
                            <Card.Header style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>THỐNG KÊ TOP 5 SÁCH ĐƯỢC MƯỢN NHIỀU NHẤT THÁNG</Card.Header>
                            <div style={{ height: 1, width: '100%', backgroundColor: 'darkgray' }}></div>
                            <Card.Body className='align-items-center'>
                                <BaseChart labels={statisticalTopBookMonth?.books || []} series={statisticalTopBookMonth?.amount || []} type="donut"
                                    width="600" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className='m-3 pl-5 pr-5'>
                    <Col>
                        <div>
                            <Row>
                                <Col>
                                    <ReactToPrint
                                        trigger={() => <Button><i className="fa-solid fa-print mr-2"></i>Print/Export</Button>}
                                        content={() => componentRef1.current}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <DatePicker
                                                selected={startDateDs}
                                                onChange={(date) => onChangeValue(date, 'ds', 'start')}
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
                                                onChange={(date) => onChangeValue(date, 'ds', 'end')}
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

                            <ComponentToPrintDs ref={componentRef1} value={statisticalDS} librarian={librarian} />
                        </div>
                    </Col>
                </Row>

                <Row className='m-3 p-5'>
                    <Col>
                        <div>
                            <Row>
                                <Col>
                                    <ReactToPrint
                                        trigger={() => <Button><i className="fa-solid fa-print mr-2"></i>Print/Export</Button>}
                                        content={() => componentRef2.current}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <DatePicker
                                                selected={startDateReaders}
                                                onChange={(date) => onChangeValue(date, 'readers', 'start')}
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
                                                onChange={(date) => onChangeValue(date, 'readers', 'end')}
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
                            <ComponentToPrintReader ref={componentRef2} value={statisticalReaders} librarian={librarian} />
                        </div>
                    </Col>
                </Row>

                <Row className='m-3 p-5'>
                    <Col>
                        <div>
                            <Row>
                                <Col>
                                    <ReactToPrint
                                        trigger={() => <Button><i className="fa-solid fa-print mr-2"></i>Print/Export</Button>}
                                        content={() => componentRef3.current}
                                    />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <DatePicker
                                                selected={startDateReadersExpire}
                                                onChange={(date) => onChangeValue(date, 'expire', 'start')}
                                                selectsStart
                                                dateFormat="dd/MM/yyyy"
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                startDate={startDateReadersExpire}
                                                endDate={endDateReadersExpire}
                                            />
                                        </Col>
                                        <Col>
                                            <DatePicker
                                                selected={endDateReadersExpire}
                                                onChange={(date) => onChangeValue(date, 'expire', 'end')}
                                                selectsEnd
                                                showYearDropdown
                                                peekNextMonth
                                                showMonthDropdown
                                                dropdownMode="select"
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReadersExpire}
                                                endDate={endDateReadersExpire}
                                                minDate={startDateReadersExpire}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <ComponentToPrintReaderExpired ref={componentRef3} value={statisticalReaderExpired} librarian={librarian} />
                        </div>
                    </Col>
                </Row> */}
            </HomePage>
        </>
    )
}

export default StatisticalPage