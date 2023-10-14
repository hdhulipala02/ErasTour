import React from 'react';
import geojson from './geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

class SingleStateMap extends React.Component {
  render() {
    const { selectedState, imageUrl } = this.props;

    return (
      <div>
        <h1>{selectedState.properties.NAME}</h1>
        <img src={imageUrl} alt={selectedState.properties.NAME} style={{ width: '200px', height: '200px' }} />
        <button onClick={this.props.onClose}>Close</button>
      </div>
    );
  }
}

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: null,
      imageUrl: '',
    };
  }

  handleStateClick = (state) => {
    const imageUrls = {
      California: 'https://example.com/california.jpg', // Example image URLs
      Texas: 'https://example.com/texas.jpg',
      // Add URLs for other states
    };

    this.setState({ selectedState: state, imageUrl: imageUrls[state.properties.NAME] });
  };

  handleMapClose = () => {
    this.setState({ selectedState: null, imageUrl: '' });
  };

  render() {
    const { selectedState, imageUrl } = this.state;

    const filteredFeatures = geojson.features.filter(
      (feature) =>
        feature.properties.NAME !== 'Alaska' &&
        feature.properties.NAME !== 'Hawaii' &&
        feature.properties.NAME !== 'Puerto Rico'
    );

    const width = 1000;
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
        {selectedState ? (
          <SingleStateMap selectedState={selectedState} imageUrl={imageUrl} onClose={this.handleMapClose} />
        ) : (
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
                  onClick={() => this.handleStateClick(d)}
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
        )}
      </div>
    );
  }
}
