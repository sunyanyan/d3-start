import React from 'react';
import * as d3 from 'd3';
import FetchDataPromise from '../../res/basicMutiLineChartData'

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

    _setup = () => {
        FetchDataPromise().then(data => this._setupD3(data))
    }

    _setupD3 = (data) => {

        //设置宽高边距等信息
        let width = document.getElementById("graph").clientWidth, height = 500,
            margin = ({ top: 20, right: 0, bottom: 30, left: 40 }),
            //x轴比例尺
            x = d3.scaleTime()//时间-位置映射比例尺
                .domain(d3.extent(data.dates))//d3.extent - 计算数组中的最大值和最小值.
                .range([margin.left, width - margin.right]),
            //y轴比例尺    
            y = d3.scaleLinear()//线性比例尺
                .domain([0, d3.max(data.series, d => d3.max(d.values))])
                .nice()//扩展 domain 使其为整;                
                .range([height - margin.bottom, margin.top]),
            //x轴
            xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)//坐标轴的位置
                //axisBottom: 刻度在下的坐标轴 ; ticks : 自定义刻度的显示方式以及格式化刻度 ；tickSizeOuter：外侧(坐标轴两端)刻度大小.
                .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0)),

            //y轴
            yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)//坐标轴的位置
                .call(d3.axisLeft(y))
                .call(g => g.select(".domain").remove()),//隐藏坐标轴 只留刻度

            //创建一个新的线条生成器.
            line = d3.line()
                .defined(d => !isNaN(d))
                .x((d, i) => x(data.dates[i]))
                .y(d => y(d))

        d3.select("#graph").select("svg").remove();
        let svg = d3.select("#graph").append("svg")
            .attr("width", width)//设置宽度
            .attr("height", height);//设置高度

            //在svg上添加x y 轴
        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);

        //添加多线条
        const path = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("path")
            .data(data.series)
            .enter().append("path")
            .style("mix-blend-mode", "multiply")
            .attr("d", d => line(d.values));

        //添加鼠标悬浮多线条之上的动作
        this.hover(svg,path,x,y,data);
    }

    hover = (svg, path, x, y, data) => {
        svg.style("position", "relative");

        //添加事件监听器.
        if ("ontouchstart" in document)
            svg.style("-webkit-tap-highlight-color", "transparent")
                .on("touchmove", moved)
                .on("touchstart", entered)
                .on("touchend", left)
        else
            svg.on("mousemove", moved)
                .on("mouseenter", entered)
                .on("mouseleave", left);

        const dot = svg.append("g")
            .attr("display", "none");

        dot.append("circle")
            .attr("r", 2.5);

        dot.append("text")
            .style("font", "10px sans-serif")
            .attr("text-anchor", "middle")
            .attr("y", -8);

        function moved() {
            d3.event.preventDefault();
            const ym = y.invert(d3.event.layerY);//invert - 根据输出值计算对应的输入值.
            const xm = x.invert(d3.event.layerX);
            const i1 = d3.bisectLeft(data.dates, xm, 1);//bisectLeft - 二分查找有序数组中指定元素的索引
            const i0 = i1 - 1;
            const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
            //找到最接近鼠标的数据
            const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);            
            //stroke属性定义了给定图形元素的外轮廓的颜色
            //filter - 基于数据对元素进行过滤
            //raise - 将每个选中的元素重新排列为其对应父节点的最后一个子元素
            //那么合起来的意思就是 ：将鼠标对应的线条置于图形最前面，并将其他线条颜色置灰（ #ddd）
            path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
            //dot 对应就是显示在鼠标对应的点，并在点上显示该线条的名字
            dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
            dot.select("text").text(s.name);
        }

        function entered() {
            //鼠标刚进入svg 置灰所有线条
            path.style("mix-blend-mode", null).attr("stroke", "#ddd");
            dot.attr("display", null);
        }

        function left() {
            //鼠标刚离开svg 重置所有线条
            path.style("mix-blend-mode", "multiply").attr("stroke", null);
            dot.attr("display", "none");
        }
    }
}
