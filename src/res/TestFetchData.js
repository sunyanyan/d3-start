// import * as d3 from 'd3';

// function multimap(entries, reducer = (p, v) => (p.push(v), p), initializer = () => []) {
//     const map = new Map();
//     for (const [key, value] of entries) {
//         map.set(key, reducer(map.has(key) ? map.get(key) : initializer(), value));
//     }
//     return map;
// }

// function multisum(entries) {
//     return multimap(entries, (p, v) => p + v, () => 0);
// }

// const FetchDataPromise = async () => {
//     let data = (await d3.json("https://raw.githubusercontent.com/vega/vega-lite/b2338345973f4717979ad9140c06ee0970c20116/data/unemployment-across-industries.json")).map(({series, count, date}) => ({name: series, value: count, date: new Date(date)}));

//   // Compute the top nine industries, plus an “Other” category.
//   const top = [...multisum(data.map(d => [d.name, d.value]))]
//       .sort((a, b) => b[1] - a[1])
//     .slice(0, 9)
//     .map(d => d[0])
//     .concat("Other");

//   // Group the data by industry, then re-order the data by descending value.
//   const series = multimap(data.map(d => [d.name, d]));
//   data = [].concat(...top.map(name => series.get(name)));

//   // Fold any removed (non-top) industries into the Other category.
//   const other = series.get("Other");
//   for (const [name, data] of series) {
//     if (!top.includes(name)) {
//       for (let i = 0, n = data.length; i < n; ++i) {
//         if (+other[i].date !== +data[i].date) throw new Error();
//         other[i].value += data[i].value;
//       }
//     }
//   }

//   // Compute the stack offsets.
//   const stack = d3.stack()
//       .keys(top)
//       .value((d, key) => d.get(key).value)
//     (Array.from(
//       multimap(
//         data.map(d => [+d.date, d]),
//         (p, v) => p.set(v.name, v),
//         () => new Map()
//       ).values()
//     ));

//   // Copy the offsets back into the data.
//   for (const layer of stack) {
//     for (const d of layer) {
//       d.data.get(layer.key).values = [d[0], d[1]];
//     }
//   }
//   console.log(" data ",JSON.stringify(data))
//   return data;
// }
// // FetchDataPromise().then(r => console.log(" r ",r))
// export default FetchDataPromise;