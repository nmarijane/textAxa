import React, {Component} from 'react';
import * as d3 from "d3";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.items.map((item) => {
        return {
          date: new Date(item.timestamp),
          value: item.stocks,
      };
      })
    };
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount() {
    this.createLineChart();
  }

  createLineChart() {
    const data = this.state.data;
    const svgWidth = 800, svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleTime()
        .rangeRound([0, width]);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const line = d3.line()
        .x((d) => x(d.date))
        .y((d) => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

    //define the x range
    x.domain(d3.extent(data,(d) => d.date));
    //define the y ranger with start at 0 and max at item.value max +5 (to look better)
    y.domain([0, Math.max.apply(Math, data.map(item => item.value)) + 5]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Stock price (€)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr("d", line);
  }


  render() {
    return <div>
      <h1>Stocks</h1>
      <svg width={800}
           height={400}>
      </svg>
    </div>;
  }
}
export default Chart;
