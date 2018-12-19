import React from 'react';
import * as d3 from 'd3';

export default class extends React.Component {

    componentDidMount() {
        this._setupD3();
    }
    componentDidUpdate() {
        this._setupD3();
    }

    render() {
        return (
            <div style={{display:"flex",flexDirection:"column"}}>
            <div><a href="">代码链接</a></div>
            <div id="graph" />
            </div>
        )
    }

    _setupD3 = () => {

        console.log("this.props.data.map(d => d.name)",this.props.data.map(d => d.name))
        //设置宽高边距等信息
        let width = document.getElementById("graph").clientWidth,
            height = 500,
            margin = ({ top: 20, right: 0, bottom: 30, left: 40 }),            
            //x轴比例尺                        
            x = d3.scaleBand()//创建一个序数分段比例尺.            
                .domain(this.props.data.map(d => d.name))//将d.name按序均匀分散到range上
                .range([margin.left, width - margin.right])
                .padding(0.1),//设置分段之间的间隔比例

            //y轴比例尺
            y = d3.scaleLinear()//创建一个线性比例尺
                .domain([0, d3.max(this.props.data, d => d.value)])
                .nice()//扩展 domain 使其为整;计算后的 domain 为 [0.201479…, 0.996679…] 时，在经过取整之后会被扩展为 [0.2, 1.0]
                .range([height - margin.bottom, margin.top]),

            //x轴
            xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)//坐标轴的位置
                .call(
                    d3.axisBottom(x)//创建一个新的刻度在下的坐标轴生成器
                        .tickSizeOuter(10)//设置外侧(坐标轴两端)刻度大小.
                ),

            //y轴
            yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)//坐标轴的位置
                .call(d3.axisLeft(y))// 创建一个新的刻度在左的坐标轴生成器
                .call(g => g.select(".domain").remove());//隐藏坐标轴 只留刻度



        d3.select("#graph").select("svg").remove();
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)//设置宽度
            .attr("height", height);//设置高度

        svg.append("g")
            .attr("fill", "#66ccff")
            .selectAll("rect").data(this.props.data).enter().append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("height", d => y(0) - y(d.value))
            .attr("width", x.bandwidth());

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);


    }
    static defaultProps = {
        data: [
            { name: "E", value: 0.12702 },
            { name: "T", value: 0.09056 },
            { name: "A", value: 0.08167 },
            { name: "O", value: 0.07507 },
            { name: "I", value: 0.06966 },
            { name: "N", value: 0.06749 },
            { name: "S", value: 0.06327 },
            { name: "H", value: 0.06094 },
            { name: "R", value: 0.05987 },
            { name: "D", value: 0.04253 },
            { name: "L", value: 0.04025 },
            { name: "C", value: 0.02782 },
            { name: "U", value: 0.02758 },
            { name: "M", value: 0.02406 },
            { name: "W", value: 0.0236 },
            { name: "F", value: 0.02288 },
            { name: "G", value: 0.02015 },
            { name: "Y", value: 0.01974 },
            { name: "P", value: 0.01929 },
            { name: "B", value: 0.01492 },
            { name: "V", value: 0.00978 },
            { name: "K", value: 0.00772 },
            { name: "J", value: 0.00153 },
            { name: "X", value: 0.0015 },
            { name: "Q", value: 0.00095 },
            { name: "Z", value: 0.00074 },
        ]
    }
}
