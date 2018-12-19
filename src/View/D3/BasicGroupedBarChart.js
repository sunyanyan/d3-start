import React from 'react';
import * as d3 from 'd3';

export default class extends React.Component {

    componentDidMount() {
        this._setup();
    }
    componentDidUpdate() {
        this._setup();
    }

    render() {
        return (
            <div id="graph" />
        )
    }

    _setupD3 = (data) => {

        let keys = data.columns.slice(1);
        //设置宽高边距等信息
        let width = document.getElementById("graph").clientWidth, height = 500,
            margin = ({ top: 20, right: 20, bottom: 30, left: 40 }),
            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,

            x0 = d3.scaleBand()//创建一个序数分段比例尺.
                .domain(data.map(d => d.State))
                .rangeRound([0, innerWidth])
                .paddingInner(0, 1),
            x1 = d3.scaleBand()//创建一个序数分段比例尺.
                .domain(keys)
                .rangeRound([0, x0.bandwidth()])
                .padding(0.05),
            y = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })])
                .nice()
                .rangeRound([innerHeight, 0]),
            colorScale = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]),
            //x轴
            xAxis = g => g
                .attr("transform", `translate(0,${innerHeight})`)//坐标轴的位置
                .call(d3.axisBottom(x0))//创建一个新的刻度在下的坐标轴生成器                        
                .call(g => g.select(".domain").remove()),//隐藏坐标轴 只留刻度

            //y轴
            yAxis = g => g
                .attr("transform", `translate(0,0)`)//坐标轴的位置
                .call(d3.axisLeft(y).ticks(null, "s"))// 创建一个新的刻度在左的坐标轴生成器
                .call(g => g.select(".domain").remove());//隐藏坐标轴 只留刻度



        d3.select("#graph").select("svg").remove();
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)//设置宽度
            .attr("height", height);//设置高度

        let g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d) => {
                let xxxx = x0(d.State);
                let t = `translate(${x0(d.State)},0)`;
                console.log({ d, xxxx, x0, t })
                return `translate(${x0(d.State)},0)`;
            })
            .selectAll("rect")
            .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter()
            .append("rect")
            .attr("x", function (d) { return x1(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) { return innerHeight -y(d.value); })
            .attr("fill", function (d) { return colorScale(d.key); });

        g.append("g").call(xAxis);
        g.append("g").call(yAxis);
        // .append("text")
        // .attr("x", 2)
        // .attr("y", y(y.ticks().pop()) + 0.5)
        // .attr("dy", "0.32em")
        // .attr("fill", "#000")
        // .attr("font-weight", "bold")
        // .attr("text-anchor", "start")
        // .text("Population");

        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return `translate(0,${i * 20})`; });

        legend.append("rect")
            .attr("x", innerWidth - 19  )
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", colorScale);

        legend.append("text")
            .attr("x", innerWidth - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) { return d; });
    }

    _setup = () => {
        d3.csv("./groupBarData.csv", (d, i, columns) => {
            for (let i = 1, n = columns.length; i < n; ++i)
                d[columns[i]] = +d[columns[i]];
            return d;
        })
            .then(data => this._setupD3(data))
            .catch(err => console.log("grouped bar chart err", err))
    }

}
