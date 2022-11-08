import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../components/home/HomePage'
import { loadStatisticalTopBookMonth, loadStatisticalTopBookWeek, statisticalTopBookMonthSelector, statisticalTopBookWeekSelector } from '../../reducers/statistical';
import { checkLogin } from '../../reducers/librarian';
import BaseChart from '../../components/base-chart'

const StatisticalPage = () => {
    const dispatch = useDispatch()
    const statisticalTopBookWeek = useSelector(statisticalTopBookWeekSelector)
    const statisticalTopBookMonth = useSelector(statisticalTopBookMonthSelector)

    useEffect(() => {
        dispatch(checkLogin())
        dispatch(loadStatisticalTopBookWeek())
        dispatch(loadStatisticalTopBookMonth())
    }, [dispatch])

    return (
        <>
            <HomePage>
                <Row className='m-3'>
                    <Col className='mb-4'>
                        <Card className='align-items-center card-statistical'>
                            <Card.Header style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>THỐNG KÊ TOP 5 SÁCH ĐƯỢC MƯỢN NHIỀU NHẤT TUẦN</Card.Header>
                            {/* <div style={{ height: 1, width: '100%', backgroundColor: 'darkgray' }}></div> */}
                            <Card.Body className='align-items-center'>
                                <BaseChart labels={statisticalTopBookWeek?.books || []} series={statisticalTopBookWeek?.amount || []} type="donut"
                                    width="600" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className='mb-4'>
                        <Card className='align-items-center card-statistical'>
                            <Card.Header style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>THỐNG KÊ TOP 5 SÁCH ĐƯỢC MƯỢN NHIỀU NHẤT THÁNG</Card.Header>
                            {/* <div style={{ height: 1, width: '100%', backgroundColor: 'darkgray' }}></div> */}
                            <Card.Body className='align-items-center'>
                                <BaseChart labels={statisticalTopBookMonth?.books || []} series={statisticalTopBookMonth?.amount || []} type="donut"
                                    width="600" size='65%' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </HomePage>
        </>
    )
}

export default StatisticalPage