import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useMemo } from 'react';
import { Box } from '@mui/material';

export default function Visualization({data}){
    console.log(data, "data in visualization");
    const xAxisOptions = ["First", "Second", "Third"]
    // const xAxisOptions = Object.keys(data || {});
    console.log(xAxisOptions, "=======xaxis");
    // const legend = useMemo(() => Object.keys(data?.[xAxisOptions?.[0]] || {}), [xAxisOptions])
    const legend = ["Orange", "Red", "Green"]
    console.log(legend, "===legend");

    const colors = {
        'Green': {
            1: 'rgb(255, 191, 0)',
            2: 'rgb(224, 62, 76)'
        },
        'Red': {
            1: 'rgb(255, 0, 0)',
            2: 'rgb(219, 97, 14)'
        },
        "Orange": {
            1: 'rgb(128, 255, 165)',
            2: 'rgb(1, 191, 236)'
        }
    }


    const series = legend?.map((name, index) => {
        return {
            name: name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: colors[name][1]
                },
                {
                    offset: 1,
                    color: colors[name][2]
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: xAxisOptions?.map(item => data?.[item]?.[name] || 0) || [0,0,0]
        }
    })

    console.log(series);

    const echartOptions = {
        color: ['orange', 'red', 'green'],
        title: {
            text: 'Gradient Stacked Area Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Orange', 'Red', 'Green']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xAxisOptions
        }],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: series
    }

    console.log(echartOptions);
    console.log(Object.keys(data || {})?.length, "-----------------");

    return (
        <Box marginTop={"1rem"}>
            {Object.keys(data || {})?.length > 0 && (<ReactECharts option={echartOptions} />)}
        </Box>
    );

}