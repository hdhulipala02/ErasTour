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


class CityDetails extends React.Component {
  render() {
    const { city, onClose } = this.props;

    return (
      <div>
        <h1>{city.name}</h1>
        <p>Days spent: {city.days}</p>
        <button onClick={onClose}>Close</button>
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
      selectedCity: null, // Add a new state for selected city
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

  handleCityClick = (city) => {
    this.setState({ selectedCity: city });
  };

  handleCloseCityDetails = () => {
    this.setState({ selectedCity: null });
  };

  handleMapClose = () => {
    this.setState({ selectedState: null, imageUrl: '' });
  };

  render() {
    const { selectedState, imageUrl, selectedCity } = this.state;

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

    const cities = [
      { name: 'Glendale', coords: [-112.1859, 33.5387], days: 2 },
      { name: 'Las Vegas', coords: [-115.1398, 36.1699], days: 2 },
      { name: 'Arlington', coords: [-97.1091, 32.7357], days: 3 },
      { name: 'Tampa', coords: [-82.4572, 27.9506], days: 3 },
      { name: 'Houston', coords: [-95.3698, 29.7604], days: 3 },
      { name: 'Atlanta', coords: [-84.3879, 33.7490], days: 3 },
      { name: 'Nashville', coords: [-86.7844, 36.1627], days: 3 },
      { name: 'Philadelphia', coords: [-75.1652, 39.9526], days: 3 },
      { name: 'Foxborough', coords: [-71.2662, 42.0654], days: 3 },
      { name: 'East Rutherford', coords: [-74.0776, 40.8128], days: 3 },
      { name: 'Chicago', coords: [-87.6298, 41.8781], days: 3 },
      { name: 'Detroit', coords: [-83.0458, 42.3314], days: 2 },
      { name: 'Pittsburgh', coords: [-79.9959, 40.4406], days: 2 },
      { name: 'Minneapolis', coords: [-93.2650, 44.9778], days: 2 },
      { name: 'Cincinnati', coords: [-84.5120, 39.1031], days: 2 },
      { name: 'Kansas City', coords: [-94.5786, 39.0997], days: 2 },
      { name: 'Denver', coords: [-104.9903, 39.7392], days: 2 },
      { name: 'Seattle', coords: [-122.3321, 47.6062], days: 2 },
      { name: 'Santa Clara', coords: [-121.9552, 37.3541], days: 2 },
      { name: 'Los Angeles', coords: [-118.2437, 34.0522], days: 5 }
    ];

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
                  onMouseEnter={(e) => {
                    select(e.target).attr('fill', '#fff');
                  }}
                  onMouseOut={(e) => {
                    select(e.target).attr('fill', '#eee');
                  }}
                />
              ))}
            </g>
            {cities.map((city, index) => (
              <circle
                key={index}
                cx={projection(city.coords)[0]}
                cy={projection(city.coords)[1]}
                r="5"
                fill={city.days === 2 ? 'purple' : 'hotpink'}
                onClick={() => this.handleCityClick(city)}
                onMouseEnter={(e) => {
                  select(e.target).attr('r', '7');
                  select(e.target).attr('fill', city.days === 2 ? 'purple' : 'hotpink');
                }}
                onMouseOut={(e) => {
                  select(e.target).attr('r', '5');
                  select(e.target).attr('fill', city.days === 2 ? 'purple' : 'hotpink');
                }}
              >
                <title>{city.name}</title>
              </circle>
            ))}
          </svg>
        )}
        {selectedCity && (
          <div className="city-details-popup">
            <CityDetails city={selectedCity} onClose={this.handleCloseCityDetails} />
          </div>
        )}
      </div>
    );
  }
}