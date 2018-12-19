import * as d3 from 'd3';

const FetchDataPromise = async ()=>{
    // const data = await d3.tsv("./unemployment.tsv", (d, i, columns) => {
    const data = await d3.tsv("./unemployment.tsv", (d, i, columns) => {
        // console.log("{d, i, columns}",{d, i, columns})
        return {            
            name: d.name.replace(/, ([\w-]+).*/, " $1"),
            values: columns.slice(1).map(k => +d[k])
        };
    });
    return {
        y: "% Unemployment",
        series: data,
        dates: data.columns.slice(1).map(d3.timeParse("%Y-%m"))
      };
}
// FetchDataPromise().then(r => console.log(" r ",r))
export default FetchDataPromise ;