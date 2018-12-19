import React from 'react';
import * as d3 from 'd3';
import { data } from '../../res/basicBandChartData'

// const parseDate = d3.timeParse("%Y%m%d")//时间类型的解析个格式化。
const convertData = data.map(d => {
    return { date: new Date((d.date)), high: +d.high, low: +d.low }
})

export default class extends React.Component {

    componentDidMount() {
        this._setupD3();
    }

    componentDidUpdate() {
        this._setupD3();
    }

    render() {
        return (
            <div id="graph" />
        )
    }

    _setupD3 = () => {

        //设置宽高边距等信息
        let width = document.getElementById("graph").clientWidth, height = 500,
            margin = ({ top: 20, right: 0, bottom: 30, left: 40 }),
            //x轴比例尺
            x = d3.scaleTime()//时间-位置映射比例尺
                .domain(d3.extent(convertData, d => d.date))//d3.extent - 计算数组中的最大值和最小值.
                .range([margin.left, width - margin.right]),
            //y轴比例尺    
            y = d3.scaleLinear()//线性比例尺
                .domain([d3.min(convertData, d => d.low), d3.max(convertData, d => d.high)])
                .nice(5)//扩展 domain 使其为整;                
                .range([height - margin.bottom, margin.top]),
            //x轴
            xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)//坐标轴的位置
                //axisBottom: 刻度在下的坐标轴 ; ticks : 自定义刻度的显示方式以及格式化刻度 ；tickSizeOuter：外侧(坐标轴两端)刻度大小.
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
                .call(g => g.select(".domain").remove()),//隐藏坐标轴 只留刻度
            //y轴
            yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)//坐标轴的位置
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove()),//隐藏坐标轴 只留刻度

            //创建一个新的区域生成器.
            area = d3.area()
                .curve(d3.curveStep)//设置曲线插值方式.
                .x(d => x(d.date))// 设置 x0 和 x1 访问器.
                .y0(d => y(d.low))// 设置基线 y 访问器.
                .y1(d => y(d.high))//设置顶线 y 访问器.

            

        d3.select("#graph").select("svg").remove();
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)//设置宽度
            .attr("height", height);//设置高度

        svg.append("path")
            .datum(convertData)
            .attr("fill", "steelblue")
            .attr("d", area);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


    }
}
