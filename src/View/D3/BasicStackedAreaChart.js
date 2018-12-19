import React from 'react';
import * as d3 from 'd3';
const data = require('../../res/basicStackedAreaChartData.json')

const convertData = data.map(d => {
    let values = d.values.map(v => +v)
    return { date: new Date(d.date), value: +d.value, name: d.name, values: values }
})
const color = d3.scaleOrdinal(d3.schemeCategory10).domain(convertData.map(d => d.name))

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
            margin = ({ top: 20, right: 40, bottom: 30, left: 40 }),
            //x轴比例尺
            x = d3.scaleTime()//时间-位置映射比例尺
                .domain(d3.extent(convertData, d => d.date))//d3.extent - 计算数组中的最大值和最小值.
                .range([margin.left, width - margin.right]),
            //y轴比例尺    
            y = d3.scaleLinear()//线性比例尺
                .domain([0, d3.max(convertData, d => d.values[1])])
                .nice()//扩展 domain 使其为整;
                .range([height - margin.bottom, margin.top]),
            //x轴
            xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)//坐标轴的位置
                //axisBottom: 刻度在下的坐标轴 ; ticks : 自定义刻度的显示方式以及格式化刻度 ；tickSizeOuter：外侧(坐标轴两端)刻度大小.
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0)),
            //y轴
            yAxis = g => g
                .attr("transform", `translate(${width - margin.right},0)`)//坐标轴的位置
                .call(d3.axisRight(y))
                .call(g => g.select(".domain").remove()),//隐藏坐标轴 只留刻度

            //创建一个新的区域生成器
            area = d3.area()
                .curve(d3.curveStep)// 设置曲线插值方式.
                .x(d => x(d.date))//设置 x0 和 x1 访问器.
                .y0(d => y(d.values[0]))//设置基线 y 访问器.
                .y1(d => y(d.values[1]))//设置顶线 y 访问器.

        d3.select("#graph").select("svg").remove();
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)//设置宽度
            .attr("height", height);//设置高度

        svg.append("g")
            .selectAll("path")
            .data([...this._multimap(convertData.map(d => [d.name, d]))])
            .enter().append("path")
            .attr("fill", ([name]) => color(name))
            .attr("d", ([, values]) => area(values))
            .append("title")
            .text(([name]) => name);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("g")
            .attr("transform", `translate(${margin.left + 1},${margin.top})`)
            .call(this._legend);
    }

    _legend = svg => {
        const g = svg
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(color.domain().slice().reverse())
            .enter().append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        g.append("rect")
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

        g.append("text")
            .attr("x", 24)
            .attr("y", 9.5)
            .attr("dy", "0.35em")
            .text(d => d);
    }

    _multimap = (entries, reducer = (p, v) => (p.push(v), p), initializer = () => []) => {
        const map = new Map();
        for (const [key, value] of entries) {
            map.set(key, reducer(map.has(key) ? map.get(key) : initializer(), value));
        }
        return map;
    }
}
