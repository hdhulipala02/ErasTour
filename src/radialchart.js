import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './taylor_swift_spotify.csv'; // Import your local CSV file
const RadialChart = ({ column, selectedAlbum }) => {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const width = 700 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;
    const innerRadius = 90;
    const outerRadius = Math.min(width, height) / 2;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const albumColors = {
      "Taylor Swift": '#34f3ff',
      "Fearless": '#f6ed95',
      "Red": '#951e1a',
      "Speak Now": '#e2b7ce',
      "1989": '#d6e9ff',
      "reputation": '#2b2b2b',
      "Lover": '#AA336A',
      "folklore": '#ccc494',
      "evermore": '#d97c28',
      "Midnights": '#00008B',
      // Add more albums and colors as needed
    };

    d3.csv(data).then(csvData => {
      const filteredData = csvData.filter(
        d => d.album === selectedAlbum && !isNaN(parseFloat(d[column]))
      );

      const x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0)
        .domain(filteredData.map(d => d.name));

      const y = d3.scaleRadial()
        .range([innerRadius, outerRadius])
        .domain([0, d3.max(filteredData, d => +d[column])]);

      const arcGenerator = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(d => y(+d[column]))
        .startAngle(d => x(d.name))
        .endAngle(d => x(d.name) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius);

      

      const bars = svg.selectAll(null)
        .data(filteredData)
        .enter()
        .append('path')
        .attr('fill', (d) => albumColors[selectedAlbum])
        .attr('d', arcGenerator);
      
      
       const labels = svg.selectAll(null)
        .data(filteredData)
        .enter()
        .append('text')
        .attr('opacity', 0)
        .attr('transform', d => {
          const angle = x(d.name) - Math.PI / 2;
          const labelRadius = outerRadius + 20;
          const xPosition = Math.cos(angle) * labelRadius;
          const yPosition = Math.sin(angle) * labelRadius;
          return `translate(${xPosition}, ${yPosition})`;
        })
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '20px')
        .text(d => d.name);

      bars.on('mouseover', function (event, d) {
        const barIndex = filteredData.findIndex(item => item === d);
        svg.selectAll('text')
          .filter((label, index) => index === barIndex)
          .attr('opacity', 1);
      }).on('mouseout', function (event, d) {
        const barIndex = filteredData.findIndex(item => item === d);
        svg.selectAll('text')
          .filter((label, index) => index === barIndex)
          .attr('opacity', 0);
      });
    });
  }, [column, selectedAlbum]);

  return (
    <div ref={chartRef}></div>
  );
};

export default RadialChart;
