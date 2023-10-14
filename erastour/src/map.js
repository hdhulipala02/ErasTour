import React from 'react';
import geojson from './geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

export default class Map extends React.Component {
  render() {
    const filteredFeatures = geojson.features.filter(
      (feature) =>
        feature.properties.NAME !== 'Alaska' &&
        feature.properties.NAME !== 'Hawaii'
    );

    const width = 1200;
    const height = width * 0.7;
    const projection = geoMercator().fitSize([width, height], {
      type: 'FeatureCollection',
      features: filteredFeatures,
    });
    const path = geoPath().projection(projection);

    const svgStyle = {
      display: 'block',
      margin: 'auto',
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <svg width={width} height={height} style={svgStyle}>
          <g className="geojson-layer">
            {filteredFeatures.map((d) => (
              <path
                key={d.properties.NAME}
                d={path(d)}
                fill="#eee"
                stroke="#0e1724"
                strokeWidth="1"
                strokeOpacity="0.5"
                onMouseEnter={(e) => {
                  select(e.target).attr('fill', '#000');
                }}
                onMouseOut={(e) => {
                  select(e.target).attr('fill', '#eee');
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
}
