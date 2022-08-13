import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import BaseChart from '../../components/base-chart';
import HomePage from '../../components/home/HomePage'
import { loadStatisticalBookByDay, loadStatisticalDS, loadStatisticalReaders, loadStatisticalReadersByDay, loadStatisticalReadersExpired, statisticalDsDaySelector, statisticalDsSelector, statisticalReaderExpiredSelector, statisticalReadersDaySelector, statisticalReadersSelector } from '../../reducers/statistical';
import ReactToPrint from 'react-to-print';
import DatePicker from "react-datepicker";
import convertDate from '../../utils/convertDate';

const tabStyle = {
    height: 600,
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
            </div>
        </div >
    );
});

export const ComponentToPrintReader = React.forwardRef((props, ref) => {
    return (
        <div style={tabStyle} className="mt-3">
            <div className='m-3' ref={ref}>
                <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ SÁCH MÀ ĐỘC GIẢ ĐÃ MƯỢN</h4>
                <Table striped bordered={true} hover>
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
            </div>
        </div >
    );
});

export const ComponentToPrintReaderExpired = React.forwardRef((props, ref) => {
    return (
        <div style={tabStyle} className="mt-3">
            <div className='m-3' ref={ref}>
                <h4 className="text-center mb-4 mt-4" style={{ fontWeight: 'bold' }}>THỐNG KÊ SỐ ĐỘC GIẢ QUÁ HẠN TRẢ SÁCH</h4>
                <Table striped bordered={true} hover>
                    <thead>
                        <tr>
                            <th>Tên độc giả</th>
                            <th>Hạn trả sách</th>
                            <th>Số ngày quá hạn</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.value.length > 0 && (
                            props.value.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name_reader}</td>
                                    <td>{item?.expired.toString().split('T')[0]}</td>
                                    <td>{item.day.days}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </div >
    );
});
const StatisticalPage = () => {
    const dispatch = useDispatch()
    const statisticalDS = useSelector(statisticalDsSelector)
    const statisticalReaders = useSelector(statisticalReadersSelector)
    const statisticalReaderExpired = useSelector(statisticalReaderExpiredSelector)

    const [startDateDs, setStartDateDs] = useState(new Date((new Date()).getFullYear(), 0, 1));
    const [endDateDs, setEndDateDs] = useState(new Date((new Date()).getFullYear(), 12, 0));

    const [startDateReaders, setStartDateReaders] = useState(new Date());
    const [endDateReaders, setEndDateReaders] = useState(new Date());

    const [startDateReadersExpire, setStartDateReadersExpire] = useState(new Date());
    const [endDateReadersExpire, setEndDateReadersExpire] = useState(new Date());
    // const statisticalReadersDay = useSelector(statisticalReadersDaySelector)
    // const statisticalDsDay = useSelector(statisticalDsDaySelector)

    useEffect(() => {
        dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(endDateDs)}))
    }, [dispatch, startDateDs, endDateDs])

    useEffect(() => {
        dispatch(loadStatisticalReaders())
        dispatch(loadStatisticalBookByDay())
        dispatch(loadStatisticalReadersByDay())
        dispatch(loadStatisticalReadersExpired())
    }, [dispatch])

    const componentRef1 = useRef();
    const componentRef2 = useRef();
    const componentRef3 = useRef();


    const onChangeValue = (date, keyName1, keyName2) => {
        if (keyName1 === 'ds') {
            if (keyName2 === 'start') {
                setStartDateDs(date)
                dispatch(loadStatisticalDS({ startDate: convertDate(date), endDate: convertDate(endDateDs) }))
                // console.log(convertDate(date))
            } else {
                setEndDateDs(date)
                dispatch(loadStatisticalDS({ startDate: convertDate(startDateDs), endDate: convertDate(date) }))
                // console.log(convertDate(date))
            }
        }
    }
    // console.log(statisticalReaderExpired)
    return (
        <>
            <HomePage>
                {/* <h3>THỐNG KÊ</h3> */}
                <Row className='m-3 pl-5 pr-5'>
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

                            <ComponentToPrintDs ref={componentRef1} value={statisticalDS} />
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
                                                onChange={(date) => setStartDateReaders(date)}
                                                selectsStart
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReaders}
                                                endDate={endDateReaders}
                                            />
                                        </Col>
                                        <Col>
                                            <DatePicker
                                                selected={endDateReaders}
                                                onChange={(date) => setEndDateReaders(date)}
                                                selectsEnd
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReaders}
                                                endDate={endDateReaders}
                                                minDate={startDateReaders}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <ComponentToPrintReader ref={componentRef2} value={statisticalReaders} />
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
                                                onChange={(date) => setStartDateReadersExpire(date)}
                                                selectsStart
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReadersExpire}
                                                endDate={endDateReadersExpire}
                                            />
                                        </Col>
                                        <Col>
                                            <DatePicker
                                                selected={endDateReadersExpire}
                                                onChange={(date) => setEndDateReadersExpire(date)}
                                                selectsEnd
                                                dateFormat="dd/MM/yyyy"
                                                startDate={startDateReadersExpire}
                                                endDate={endDateReadersExpire}
                                                minDate={startDateReadersExpire}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <ComponentToPrintReaderExpired ref={componentRef3} value={statisticalReaderExpired} />
                        </div>
                    </Col>
                </Row>
                {/* <Row className='mb-3'>
                    <Col>
                        <Card>
                            <Card.Header className='text-center' style={{ fontWeight: 'bold', backgroundColor: 'yellow' }}>Số sách được mượn trong ngày</Card.Header>
                            <Row>
                                <Col className="pr-0 text-center">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <i className="fa-solid fa-book-quran fa-5x p-2"></i>
                                    </Card.Body>
                                </Col>
                                <div style={{ width: 1, height: '100%', backgroundColor: 'gray' }}></div>
                                <Col className="pl-0">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <Col className='p-0 m-0 text-center' >
                                            <p style={{ fontSize: '4rem' }}>{statisticalDsDay?.amount_book || 0}</p>
                                        </Col>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className='text-center' style={{ fontWeight: 'bold', backgroundColor: 'yellow' }}>Số độc giả mượn sách trong ngày</Card.Header>
                            <Row>
                                <Col className="pr-0 text-center">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <i className="fa-solid fa-user-astronaut fa-5x p-2"></i>
                                    </Card.Body>
                                </Col>
                                <div style={{ width: 1, height: '100%', backgroundColor: 'gray' }}></div>
                                <Col className="pl-0">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <Col className='p-0 m-0 text-center' >
                                            <p style={{ fontSize: '4rem' }}>{statisticalReadersDay}</p>
                                        </Col>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className='text-center' style={{ fontWeight: 'bold', backgroundColor: 'yellow' }}>Số sách mà độc giả làm thất lạc</Card.Header>
                            <Row>
                                <Col className="pr-0 text-center">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <i className="fa-solid fa-book-quran fa-5x p-2"></i>
                                    </Card.Body>
                                </Col>
                                <div style={{ width: 1, height: '100%', backgroundColor: 'gray' }}></div>
                                <Col className="pl-0">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <Col className='p-0 m-0 text-center' >
                                            <p style={{ fontSize: '4rem' }}>{2}</p>
                                        </Col>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className='text-center' style={{ fontWeight: 'bold', backgroundColor: 'yellow' }}>Số sách quá hạn chưa được trả</Card.Header>
                            <Row>
                                <Col className="pr-0 text-center">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <i className="fa-solid fa-book-quran fa-5x p-2"></i>
                                    </Card.Body>
                                </Col>
                                <div style={{ width: 1, height: '100%', backgroundColor: 'gray' }}></div>
                                <Col className="pl-0">
                                    <Card.Body style={{ backgroundColor: 'aqua' }}>
                                        <Col className='p-0 m-0 text-center' >
                                            <p style={{ fontSize: '4rem' }}>{2}</p>
                                        </Col>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row> */}
                {/* <Row className='mb-3'>
                    <Col>
                        <Card className='align-items-center'>
                            <Card.Header style={{ fontWeight: 'bold' }}>Thống kê top 5 sách được mượn nhiều nhất tuần</Card.Header>
                            <Card.Body>
                                <BaseChart labels={['Quốc Âm Thi Tập', 'Chí Phèo', 'Trạng Quỳnh', 'Truyện Kiều', 'Khám phá vũ trụ'] || []} series={[15, 20, 25, 30, 40] || []} type="donut"
                                    width="500" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='align-items-center'>
                            <Card.Header style={{ fontWeight: 'bold' }}>Thống kê top 5 sách được mượn nhiều nhất tháng</Card.Header>
                            <Card.Body>
                                <BaseChart labels={['a', 'b', 'c'] || []} series={[1, 2, 3] || []} type="donut"
                                    width="400" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BasicTable columns={columnsDS} data={statisticalDS} titleTable="THỐNG KÊ SỐ LƯỢNG SÁCH ĐƯỢC MƯỢN" />
                    </Col>
                    <Col>
                        <BasicTable columns={columnsReaders} data={statisticalReaders} titleTable="THỐNG KÊ SỐ LƯỢNG SÁCH MÀ ĐỌC GIẢ MƯỢN" />
                    </Col>
                </Row> */}
            </HomePage>
        </>
    )
}

export default StatisticalPage