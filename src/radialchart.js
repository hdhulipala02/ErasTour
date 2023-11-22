import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './taylor_swift_spotify.csv'; // Import your local CSV file

const RadialChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = 460 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    const innerRadius = 80;
    const outerRadius = Math.min(width, height) / 2;

    // append the svg object to the chartRef
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2 + 100})`);

    d3.csv(data).then(data => { // Use the imported local CSV data
      // Your existing code remains mostly the same...
      const x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain(data.map(d => d.name)); // Change 'Country' to 'name'

      const y = d3.scaleRadial()
        .range([innerRadius, outerRadius])
        .domain([0, d3.max(data, d => +d.energy)]); // Change 'Value' to 'energy'

      svg.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('fill', '#69b3a2')
        .attr('d', d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(d => y(d.energy)) // Change 'Value' to 'energy'
          .startAngle(d => x(d.name)) // Change 'Country' to 'name'
          .endAngle(d => x(d.name) + x.bandwidth()) // Change 'Country' to 'name'
          .padAngle(0.01)
          .padRadius(innerRadius));
    });
  }, []);

  return (
    <div ref={chartRef}></div>
  );
};

export default RadialChart;
