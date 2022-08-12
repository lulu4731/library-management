import React from 'react'
import Chart from 'react-apexcharts'

const BaseChart = ({ labels, size, series, type, width }) => {
    return (
        <>
            <Chart
                options={{
                    labels: labels,
                    plotOptions: {
                        pie: {
                            donut: {
                                size: size,
                                background: 'transparent',
                                labels: {
                                    show: true,
                                    total: {
                                        show: true,
                                        showAlways: false,
                                        label: 'Tổng',
                                        fontSize: '22px',
                                        fontWeight: 600,
                                        color: 'blue',
                                        formatter: function (w) {
                                            return w.globals.seriesTotals.reduce((a, b) => {
                                                return a + b
                                            }, 0)
                                        }
                                    }
                                }
                            },
                        }
                    }
                }}
                series={series}
                type={type}
                width={width}
            />
        </>
    )
}

export default BaseChart