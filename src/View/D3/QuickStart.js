import React from 'react';
import * as d3 from 'd3';

export default class QuickStart extends React.Component {
    componentDidMount() {
        this._setupD3();
    }
    render() {
        return (
            //1. 准备根元素 ; 
            <div id="graph" />
        )
    }

    _setupD3 = () => {
        //2. 设置画布
        //D3 虽然没有明文规定一定要在 SVG 中绘图，但是 D3 提供了众多的 SVG 图形的生成器，它们都是只支持 SVG 的。因此，建议使用 SVG 画布。
        /*
        SVG，指可缩放矢量图形（Scalable Vector Graphics），
        是用于描述二维矢量图形的一种图形格式，是由万维网联盟制定的开放标准。
        SVG 使用 XML 格式来定义图形，可将 SVG 文本直接嵌入 HTML 中显示。
        
        SVG 有如下特点：

        SVG 绘制的是矢量图，因此对图像进行放大不会失真。
        基于 XML，可以为每个元素添加 JavaScript 事件处理器。
        每个图形均视为对象，更改对象的属性，图形也会改变。
        不适合游戏应用。
        */
        let svg = d3.select("#graph")
            .append("svg")//获取到画布
            .attr("width", 500)//设置宽度
            .attr("height", 500);//设置高度

        //3. 设置比例尺
        //为什么要设置比例尺？直接使用输入的数值当成矩形的长度 如果数值过大或过小 可能画布没有这么大，或者根本看不见
        let linear = d3.scaleLinear()//返回线性比例尺
            .domain([0, 2500])// 0-2500 映射到 0-100
            .range([0, 250]);//这里0 2500对应输入数据的最小最大值    

        //4. 设置矩形 
        // 添加了与 data 数组的长度相同数量的矩形
        svg.selectAll("rect")   //选择svg内所有的矩形
            .data(this.props.data)  //绑定数组
            .enter()        //指定选择集的enter部分
            .append("rect") //添加足够数量的矩形元素 rect表示矩形
            //设置各个矩形的坐标和长宽
            .attr("x", 25) //每个矩形的x坐标
            .attr("y", (d, i) => i * 40) //每个矩形的y坐标
            //将比例尺应用到width
            .attr("width", (d, i) => {
                console.log("{d,i}", { d, i })
                console.log("linear(d)", linear(d))
                return linear(d);
            })
            .attr("height", 25)
            //设置颜色
            .attr("fill", "#66ccff");

        //5. 设置坐标轴
        let g = svg.append("g")
        //设置x轴
        g.append("g")//定义了坐标轴之后，只需要在 SVG 中添加一个分组元素 <g>，再将坐标轴的其他元素添加到这个 <g> 里即可
            .attr("transform", "translate(25,0)")//坐标轴的位置，可以通过 transform 属性来设定。
            .call(
                d3.axisBottom(linear)//axisBottom表示刻度向下的坐标轴
                .ticks(5)//刻度的数量
            )
        //设置y轴
        // 	svg.append("g").call(axis); 等价于  axis(svg.append(g));
        g.append("g")
            .attr("transform", "translate(25,0)")
            .call(d3.axisLeft(linear).ticks(0))



        //看到这里或许你会对 react/g x/y/width/height/fill 以及 svg坐标系产生好奇：
        //这里就推荐 MDN 的文档了 :
        // [SVG元素参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element)
        // [SVG属性参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute)
        // [SVG教程](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)

    }

    static defaultProps = {
        data: [2500, 2100, 1700, 1300, 900],
    }
}