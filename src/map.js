import React, { useState, useEffect} from 'react';
import geojson from './geojson.json';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import CityDetails from './components/CityDetails';
import SingleStateMap from "./components/SingleStateMap";
import './style.css';
import * as d3 from 'd3';
import {csv} from "d3"

const Map = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [highlightedState, setHighlightedState] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [heatmapToggle, setHeatmapToggle] = useState(false);

  const albums = ['Folklore', 'Lover', 'Speak Now', 'Red', '1989', 'Reputation', 'Evermore', 'Taylor Swift', 'Fearless'];
  const years = ["2008","2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleCloseCityDetails = () => {
    setSelectedCity(null);
  };

  const handleMapClose = () => {
    setSelectedState(null);
    setImageUrl('');
  };

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

  const folklore = '#ccc494'
  const lover = '#ffd6e4'
  const speaknow = '#e2b7ce'
  const evermore = '#d97c28'
  const taylorswift = '#deffe2'
  const red = '#ffbaba'
  const ninteen89 = '#dfc39d'
  const fearless = '#f4d5fd'
  const reputation = '#d4cfcf'

  const stateColors = {
    Alabama: fearless,
    Arizona: speaknow,
    Arkansas: ninteen89,
    California: folklore,
    Colorado: speaknow,
    Connecticut: fearless,
    Delaware: ninteen89,
    Florida: speaknow,
    Georgia: folklore,
    Hawaii: speaknow,
    Idaho: folklore,
    Illinois: folklore,
    Indiana: fearless,
    Iowa: fearless,
    Kansas: evermore,
    Kentucky: fearless,
    Louisiana: fearless,
    Maine: speaknow,
    Maryland: evermore,
    Massachusetts: speaknow,
    Michigan: folklore,
    Minnesota: taylorswift,
    Mississippi: folklore,
    Missouri: folklore,
    Montana: reputation,
    Nebraska: red,
    Nevada: evermore,
    'New Hampshire': folklore,
    'New Jersey': folklore,
    'New Mexico': folklore,
    'New York': folklore,
    'North Carolina': folklore,
    'North Dakota': evermore,
    Ohio: evermore,
    Oklahoma: speaknow,
    Oregon: evermore,
    Pennsylvania: speaknow,
    'Rhode Island': lover,
    'South Carolina': speaknow,
    'South Dakota': folklore,
    Tennessee: taylorswift,
    Texas: taylorswift,
    Utah: evermore,
    Vermont: red,
    Virginia: evermore,
    Washington: folklore,
    'West Virginia': evermore,
    Wisconsin: speaknow,
    Wyoming: evermore
  };

  // Create a Promise for the fetch operation
  return new Promise((resolve, reject) => {
    // Fetch the CSV file
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(csvData => {
        const parsedData = d3.csvParseRows(csvData);

        const yearIndex = parsedData[0].indexOf(year);
        for (let i = 1; i < parsedData.length; i++) {
          var row = parsedData[i];
          var state = row[0].trim(); 
          var albumForYear = row[yearIndex].trim(); 

          if (albumForYear.toLowerCase() === "none") {
            albumForYear = "#FFFFFF"; // Replace "None" with "White"
          }

          popMap[state] = albumColors[albumForYear]; 

        } 
        
        resolve(popMap); 
        
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        reject(error); // Reject the Promise if there's an error
      });
  });
}

/////////////////////////////////////////////////////////////////////////// MOST POPULAR ALBUM MAP END 

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
        <SingleStateMap selectedState={selectedState} imageUrl={imageUrl} onClose={handleMapClose} />
      ) : (
        <svg width={width} height={height} style={svgStyle}>
          <g className="geojson-layer">
            {filteredFeatures.map((d) => {
              const baseColor = stateColors[d.properties.NAME] || "#eee";
              return (
                <path
                  key={d.properties.NAME}
                  d={path(d)}
                  fill={highlightedState === d.properties.NAME ? adjustColor(stateColors[d.properties.NAME], 30) : stateColors[d.properties.NAME] || "#eee"}
                  stroke={highlightedState === d.properties.NAME ? adjustColor(stateColors[d.properties.NAME], 100) : "#0e1724"}
                  strokeOpacity="0.5"
                  onMouseEnter={() => setHighlightedState(d.properties.NAME)}
                  onMouseLeave={() => setHighlightedState(null)}
                />
              );
            })}
          </g>
          {cities.map((city, index) => (
            <circle
              key={index}
              cx={projection(city.coords)[0]}
              cy={projection(city.coords)[1]}
              r="5"
              fill={city.days === 2 ? 'purple' : 'hotpink'}
              onClick={() => handleCityClick(city)}
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
        <div className="city-details-popup" style={{ position: 'absolute', top: 'calc(100vh - 200px)', right: '0' }}>
          <CityDetails city={selectedCity} onClose={handleCloseCityDetails} />
        </div>
      )}
    </div>
  );
};

export default Map;