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
  const [popmapToggle, setHPopmapToggle] = useState(false);
  const [selectedYearPop, setSelectedYearPop] = useState('');
  const [venueToggle, setVenueToggle] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState('');
  

  const albums = ['Folklore', 'Lover', 'Speak Now', 'Red', '1989', 'Reputation', 'Evermore', 'Taylor Swift', 'Fearless'];
  const years = ["2008","2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
  const capacities = [
    "60000",
    "65000",
    "70000",
    "75000",
    "80000",
    "85000",
    "90000",
    "95000",
    "100000",
    "105000",
    "110000"
  ];
  

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
  const red = '#951e1a'
  const ninteen89 = '#d6e9ff'
  const fearless = '#f6ed95'
  const reputation = '#2b2b2b'

  const albumColors = {
    "Fearless": '#f6ed95',
    "Red": '#951e1a',
    "Speak Now": '#e2b7ce',
    "1989": '#d6e9ff',
    "Reputation": '#2b2b2b',
    // "Lover": '#ffd6e4',
    "Lover": '#AA336A',
    "Folklore": '#ccc494',
    "Evermore": '#d97c28',
    "Midnights": '#00008B', // Placeholder, replace with the actual color code for "Midnights"
    // Add more albums and colors as needed
  };


  /////////////////////////////////////////////////////////////////////////// HEATMAP START
  const [stateColors, setStateColors] = useState({}); // Initialize state

  useEffect(() => {
    // Fetch heatmap data within the effect
    generateHeatMap('Folklore', '2002')
      .then(result => {
        setStateColors(result); // Update state with heatmap data
      })
      .catch(error => {
        console.error(error); // Handle errors here
      });
  }, []); // Run once on initial component mount
  
  function generateHeatMap(album, year) {
    var file = "Popularity_Heatmap_CSVs/" + album + '-' + year + ".csv";
    var baseColor = albumColors[album];
    var myColorScale = d3.scaleLinear().range(["white", baseColor]).domain([0, 100]);
    // var heatmap = {
    //   Alabama: '#FFFFFF',
    //   Arizona: speaknow,
    //   Arkansas: ninteen89,
    //   California: folklore,
    //   Colorado: speaknow,
    //   Connecticut: fearless,
    //   Delaware: ninteen89,
    //   Florida: speaknow,
    //   Georgia: folklore,
    //   Hawaii: speaknow,
    //   Idaho: folklore,
    //   Illinois: folklore,
    //   Indiana: fearless,
    //   Iowa: fearless,
    //   Kansas: evermore,
    //   Kentucky: fearless,
    //   Louisiana: fearless,
    //   Maine: speaknow,
    //   Maryland: evermore,
    //   Massachusetts: speaknow,
    //   Michigan: folklore,
    //   Minnesota: taylorswift,
    //   Mississippi: folklore,
    //   Missouri: folklore,
    //   Montana: reputation,
    //   Nebraska: red,
    //   Nevada: evermore,
    //   'New Hampshire': folklore,
    //   'New Jersey': folklore,
    //   'New Mexico': folklore,
    //   'New York': folklore,
    //   'North Carolina': folklore,
    //   'North Dakota': evermore,
    //   Ohio: evermore,
    //   Oklahoma: speaknow,
    //   Oregon: evermore,
    //   Pennsylvania: speaknow,
    //   'Rhode Island': lover,
    //   'South Carolina': speaknow,
    //   'South Dakota': folklore,
    //   Tennessee: taylorswift,
    //   Texas: taylorswift,
    //   Utah: evermore,
    //   Vermont: red,
    //   Virginia: evermore,
    //   Washington: folklore,
    //   'West Virginia': evermore,
    //   Wisconsin: speaknow,
    //   Wyoming: evermore
    // };
    var heatmap = {
      Alabama: '#FFFFFF',
      Arizona: '#FFFFFF',
      Arkansas: '#FFFFFF',
      California: '#FFFFFF',
      Colorado: '#FFFFFF',
      Connecticut: '#FFFFFF',
      Delaware: '#FFFFFF',
      Florida: '#FFFFFF',
      Georgia: '#FFFFFF',
      Hawaii: '#FFFFFF',
      Idaho: '#FFFFFF',
      Illinois: '#FFFFFF',
      Indiana: '#FFFFFF',
      Iowa: '#FFFFFF',
      Kansas: '#FFFFFF',
      Kentucky: '#FFFFFF',
      Louisiana: '#FFFFFF',
      Maine: '#FFFFFF',
      Maryland: '#FFFFFF',
      Massachusetts: '#FFFFFF',
      Michigan: '#FFFFFF',
      Minnesota: '#FFFFFF',
      Mississippi: '#FFFFFF',
      Missouri: '#FFFFFF',
      Montana: '#FFFFFF',
      Nebraska: '#FFFFFF',
      Nevada: '#FFFFFF',
      'New Hampshire': '#FFFFFF',
      'New Jersey': '#FFFFFF',
      'New Mexico': '#FFFFFF',
      'New York': '#FFFFFF',
      'North Carolina': '#FFFFFF',
      'North Dakota': '#FFFFFF',
      Ohio: '#FFFFFF',
      Oklahoma: '#FFFFFF',
      Oregon: '#FFFFFF',
      Pennsylvania: '#FFFFFF',
      'Rhode Island': '#FFFFFF',
      'South Carolina': '#FFFFFF',
      'South Dakota': '#FFFFFF',
      Tennessee: '#FFFFFF',
      Texas: '#FFFFFF',
      Utah: '#FFFFFF',
      Vermont: '#FFFFFF',
      Virginia: '#FFFFFF',
      Washington: '#FFFFFF',
      'West Virginia': '#FFFFFF',
      Wisconsin: '#FFFFFF',
      Wyoming: '#FFFFFF'
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
  
          for (let i = 3; i < parsedData.length; i++) {
            const row = parsedData[i];
            if (row.length >= 2) {
              const state = row[0].trim();
              const value = parseInt(row[1]);
              if (!isNaN(value)) {
                heatmap[state] = myColorScale(value);
              } else {
                heatmap[state] = myColorScale(0);
              }
            }
          }
          resolve(heatmap); // Resolve the Promise with the updated heatmap
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          reject(error); // Reject the Promise if there's an error
        });
    });
  }
  

  const updateHeatmap = () => {
    
    const stateColors = {
      Alabama: '#FFFFFF',
      Arizona: '#FFFFFF',
      Arkansas: '#FFFFFF',
      California: '#FFFFFF',
      Colorado: '#FFFFFF',
      Connecticut: '#FFFFFF',
      Delaware: '#FFFFFF',
      Florida: '#FFFFFF',
      Georgia: '#FFFFFF',
      Hawaii: '#FFFFFF',
      Idaho: '#FFFFFF',
      Illinois: '#FFFFFF',
      Indiana: '#FFFFFF',
      Iowa: '#FFFFFF',
      Kansas: '#FFFFFF',
      Kentucky: '#FFFFFF',
      Louisiana: '#FFFFFF',
      Maine: '#FFFFFF',
      Maryland: '#FFFFFF',
      Massachusetts: '#FFFFFF',
      Michigan: '#FFFFFF',
      Minnesota: '#FFFFFF',
      Mississippi: '#FFFFFF',
      Missouri: '#FFFFFF',
      Montana: '#FFFFFF',
      Nebraska: '#FFFFFF',
      Nevada: '#FFFFFF',
      'New Hampshire': '#FFFFFF',
      'New Jersey': '#FFFFFF',
      'New Mexico': '#FFFFFF',
      'New York': '#FFFFFF',
      'North Carolina': '#FFFFFF',
      'North Dakota': '#FFFFFF',
      Ohio: '#FFFFFF',
      Oklahoma: '#FFFFFF',
      Oregon: '#FFFFFF',
      Pennsylvania: '#FFFFFF',
      'Rhode Island': '#FFFFFF',
      'South Carolina': '#FFFFFF',
      'South Dakota': '#FFFFFF',
      Tennessee: '#FFFFFF',
      Texas: '#FFFFFF',
      Utah: '#FFFFFF',
      Vermont: '#FFFFFF',
      Virginia: '#FFFFFF',
      Washington: '#FFFFFF',
      'West Virginia': '#FFFFFF',
      Wisconsin: '#FFFFFF',
      Wyoming: '#FFFFFF'
    };
    if (heatmapToggle) {
      generateHeatMap(selectedAlbum, selectedYear)
        .then(result => {
          setStateColors(result);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setStateColors(stateColors); // Use the default stateColors when heatmapToggle is off
    }
  };

  useEffect(() => {
    updateHeatmap();
  }, [heatmapToggle, selectedAlbum, selectedYear]);

/////////////////////////////////////////////////////////////////////////// HEATMAP END 

/////////////////////////////////////////////////////////////////////////// MOST POPULAR ALBUM MAP START
// useEffect(() => {
//   // Fetch heatmap data within the effect
//   generatePopMap('2021')
//     .then(result => {
//       setStateColors(result); // Update state with heatmap data
//     })
//     .catch(error => {
//       console.error(error); // Handle errors here
//     });
// }, []); // Run once on initial component mount

function generatePopMap(year) {
  var file = "Most_Popular_Album.csv";


  var popMap = {
    Alabama: '#FFFFFF',
    Arizona: '#FFFFFF',
    Arkansas: '#FFFFFF',
    California: '#FFFFFF',
    Colorado: '#FFFFFF',
    Connecticut: '#FFFFFF',
    Delaware: '#FFFFFF',
    Florida: '#FFFFFF',
    Georgia: '#FFFFFF',
    Hawaii: '#FFFFFF',
    Idaho: '#FFFFFF',
    Illinois: '#FFFFFF',
    Indiana: '#FFFFFF',
    Iowa: '#FFFFFF',
    Kansas: '#FFFFFF',
    Kentucky: '#FFFFFF',
    Louisiana: '#FFFFFF',
    Maine: '#FFFFFF',
    Maryland: '#FFFFFF',
    Massachusetts: '#FFFFFF',
    Michigan: '#FFFFFF',
    Minnesota: '#FFFFFF',
    Mississippi: '#FFFFFF',
    Missouri: '#FFFFFF',
    Montana: '#FFFFFF',
    Nebraska: '#FFFFFF',
    Nevada: '#FFFFFF',
    'New Hampshire': '#FFFFFF',
    'New Jersey': '#FFFFFF',
    'New Mexico': '#FFFFFF',
    'New York': '#FFFFFF',
    'North Carolina': '#FFFFFF',
    'North Dakota': '#FFFFFF',
    Ohio: '#FFFFFF',
    Oklahoma: '#FFFFFF',
    Oregon: '#FFFFFF',
    Pennsylvania: '#FFFFFF',
    'Rhode Island': '#FFFFFF',
    'South Carolina': '#FFFFFF',
    'South Dakota': '#FFFFFF',
    Tennessee: '#FFFFFF',
    Texas: '#FFFFFF',
    Utah: '#FFFFFF',
    Vermont: '#FFFFFF',
    Virginia: '#FFFFFF',
    Washington: '#FFFFFF',
    'West Virginia': '#FFFFFF',
    Wisconsin: '#FFFFFF',
    Wyoming: '#FFFFFF'
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

const updatePopmap = () => {
  const stateColors = {
    Alabama: '#FFFFFF',
    Arizona: '#FFFFFF',
    Arkansas: '#FFFFFF',
    California: '#FFFFFF',
    Colorado: '#FFFFFF',
    Connecticut: '#FFFFFF',
    Delaware: '#FFFFFF',
    Florida: '#FFFFFF',
    Georgia: '#FFFFFF',
    Hawaii: '#FFFFFF',
    Idaho: '#FFFFFF',
    Illinois: '#FFFFFF',
    Indiana: '#FFFFFF',
    Iowa: '#FFFFFF',
    Kansas: '#FFFFFF',
    Kentucky: '#FFFFFF',
    Louisiana: '#FFFFFF',
    Maine: '#FFFFFF',
    Maryland: '#FFFFFF',
    Massachusetts: '#FFFFFF',
    Michigan: '#FFFFFF',
    Minnesota: '#FFFFFF',
    Mississippi: '#FFFFFF',
    Missouri: '#FFFFFF',
    Montana: '#FFFFFF',
    Nebraska: '#FFFFFF',
    Nevada: '#FFFFFF',
    'New Hampshire': '#FFFFFF',
    'New Jersey': '#FFFFFF',
    'New Mexico': '#FFFFFF',
    'New York': '#FFFFFF',
    'North Carolina': '#FFFFFF',
    'North Dakota': '#FFFFFF',
    Ohio: '#FFFFFF',
    Oklahoma: '#FFFFFF',
    Oregon: '#FFFFFF',
    Pennsylvania: '#FFFFFF',
    'Rhode Island': '#FFFFFF',
    'South Carolina': '#FFFFFF',
    'South Dakota': '#FFFFFF',
    Tennessee: '#FFFFFF',
    Texas: '#FFFFFF',
    Utah: '#FFFFFF',
    Vermont: '#FFFFFF',
    Virginia: '#FFFFFF',
    Washington: '#FFFFFF',
    'West Virginia': '#FFFFFF',
    Wisconsin: '#FFFFFF',
    Wyoming: '#FFFFFF'
  };

  if (popmapToggle) {
    generatePopMap(selectedYearPop)
      .then(result => {
        setStateColors(result);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    setStateColors(stateColors); // Use the default stateColors when heatmapToggle is off
  }
};

useEffect(() => {
  updatePopmap();
}, [popmapToggle, selectedYearPop]);


/////////////////////////////////////////////////////////////////////////// MOST POPULAR ALBUM MAP END

/////////////////////////////////////////////////////////////////////////// VENUE SLIDER START
// useEffect(() => {
//   // Fetch heatmap data within the effect
//   generateVenueMap('60000')
//     .then(result => {
//       setStateColors(result); // Update state with heatmap data
//     })
//     .catch(error => {
//       console.error(error); // Handle errors here
//     });
// }, []); // Run once on initial component mount

function generateVenueMap(venueCapacity) {
  var file = "Most_Popular_Album.csv";
  var map = {
    Alabama: "#FFFFFF",
    Arizona: "#FFFFFF",
    Arkansas: "#FFFFFF",
    California: "#FFFFFF",
    Colorado: "#FFFFFF",
    Connecticut: "#FFFFFF",
    Delaware: "#FFFFFF",
    Florida: "#FFFFFF",
    Georgia: "#FFFFFF",
    Hawaii: "#FFFFFF",
    Idaho: "#FFFFFF",
    Illinois: "#FFFFFF",
    Indiana: "#FFFFFF",
    Iowa: "#FFFFFF",
    Kansas: "#FFFFFF",
    Kentucky: "#FFFFFF",
    Louisiana: "#FFFFFF",
    Maine: "#FFFFFF",
    Maryland: "#FFFFFF",
    Massachusetts: "#FFFFFF",
    Michigan: "#FFFFFF",
    Minnesota: "#FFFFFF",
    Mississippi: "#FFFFFF",
    Missouri: "#FFFFFF",
    Montana: "#FFFFFF",
    Nebraska: "#FFFFFF",
    Nevada: "#FFFFFF",
    'New Hampshire': "#FFFFFF",
    'New Jersey': "#FFFFFF",
    'New Mexico': "#FFFFFF",
    'New York': "#FFFFFF",
    'North Carolina': "#FFFFFF",
    'North Dakota': "#FFFFFF",
    Ohio: "#FFFFFF",
    Oklahoma: "#FFFFFF",
    Oregon: "#FFFFFF",
    Pennsylvania: "#FFFFFF",
    'Rhode Island': "#FFFFFF",
    'South Carolina': "#FFFFFF",
    'South Dakota': "#FFFFFF",
    Tennessee: "#FFFFFF",
    Texas: "#FFFFFF",
    Utah: "#FFFFFF",
    Vermont: "#FFFFFF",
    Virginia: "#FFFFFF",
    Washington: "#FFFFFF",
    'West Virginia': "#FFFFFF",
    Wisconsin: "#FFFFFF",
    Wyoming: "#FFFFFF"
  };
  

  const venueData = {
    "Arizona": 61500,
    "Nevada": 65515,
    "Texas": 65878,
    "Florida": 68500,
    "Georgia": 69896,
    "Tennessee": 71835,
    "Pennsylvania": 72000,
    "Massachusetts": 73000,
    "New Jersey": 75000,
    "Illinois": 75000,
    "Michigan": 75000,
    "Pennsylvania": 76416,
    "Minnesota": 78000,
    "Ohio": 78600,
    "Missouri": 80000,
    "Colorado": 84000,
    "Washington": 88491,
    "California": 100240,
    "California": 105000
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
  
          for (const state in venueData) {
            if (venueData.hasOwnProperty(state)) {
                if (venueData[state] > venueCapacity) {
                    map[state] = "#00008B"; // Dark blue hex code
                } else {
                  map[state] = "#FFFFFF"; // White hex code
                }
            }
          }
    
          resolve(map); 
          
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          reject(error); // Reject the Promise if there's an error
        });
    });

      
}


const updateVenuemap = () => {
  var stateColors = {
    Alabama: "#FFFFFF",
    Arizona: "#FFFFFF",
    Arkansas: "#FFFFFF",
    California: "#FFFFFF",
    Colorado: "#FFFFFF",
    Connecticut: "#FFFFFF",
    Delaware: "#FFFFFF",
    Florida: "#FFFFFF",
    Georgia: "#FFFFFF",
    Hawaii: "#FFFFFF",
    Idaho: "#FFFFFF",
    Illinois: "#FFFFFF",
    Indiana: "#FFFFFF",
    Iowa: "#FFFFFF",
    Kansas: "#FFFFFF",
    Kentucky: "#FFFFFF",
    Louisiana: "#FFFFFF",
    Maine: "#FFFFFF",
    Maryland: "#FFFFFF",
    Massachusetts: "#FFFFFF",
    Michigan: "#FFFFFF",
    Minnesota: "#FFFFFF",
    Mississippi: "#FFFFFF",
    Missouri: "#FFFFFF",
    Montana: "#FFFFFF",
    Nebraska: "#FFFFFF",
    Nevada: "#FFFFFF",
    'New Hampshire': "#FFFFFF",
    'New Jersey': "#FFFFFF",
    'New Mexico': "#FFFFFF",
    'New York': "#FFFFFF",
    'North Carolina': "#FFFFFF",
    'North Dakota': "#FFFFFF",
    Ohio: "#FFFFFF",
    Oklahoma: "#FFFFFF",
    Oregon: "#FFFFFF",
    Pennsylvania: "#FFFFFF",
    'Rhode Island': "#FFFFFF",
    'South Carolina': "#FFFFFF",
    'South Dakota': "#FFFFFF",
    Tennessee: "#FFFFFF",
    Texas: "#FFFFFF",
    Utah: "#FFFFFF",
    Vermont: "#FFFFFF",
    Virginia: "#FFFFFF",
    Washington: "#FFFFFF",
    'West Virginia': "#FFFFFF",
    Wisconsin: "#FFFFFF",
    Wyoming: "#FFFFFF"
  };

  if (venueToggle) {
    generateVenueMap(selectedCapacity)
      .then(result => {
        setStateColors(result);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    setStateColors(stateColors); // Use the default stateColors when heatmapToggle is off
  }
};

useEffect(() => {
  updateVenuemap();
}, [venueToggle, selectedCapacity]);


/////////////////////////////////////////////////////////////////////////// VENUE SLIDER END 

  const cities = [
    {
      name: 'Glendale', coords: [-112.1859, 33.5387], days: 2, attendance: 157200,
      shows: [
        {
          date: 'March 17',
          surpriseSongs: ['Mirrorball', 'Tim McGraw'],
        },
        {
          date: 'March 18',
          surpriseSongs: ['State of Grace', 'This Is Me Trying'],
        }
      ]
    },
    {
      name: 'Las Vegas', coords: [-115.1398, 36.1699], days: 2, attendance: 143670,
      shows: [
        {
          date: 'March 24',
          surpriseSongs: ['Our Song', 'Snow On The Beach'],
        },
        {
          date: 'March 25',
          surpriseSongs: ['Cowboy Like Me (with Marcus Mumford)', 'White Horse'],
        }
      ]
    },
    {
      name: 'Arlington', coords: [-97.1091, 32.7357], days: 3, attendance: 315000,
      shows: [
        {
          date: 'March 31',
          surpriseSongs: ['Sad Beautiful Tragic', 'Ours'],
        },
        {
          date: 'April 1',
          surpriseSongs: ['Death By A Thousand Cuts', 'Clean'],
        },
        {
          date: 'April 2',
          surpriseSongs: ['Jump Then Fall', 'Lucky One'],
        }
      ]
    },
    {
      name: 'Tampa', coords: [-82.4572, 27.9506], days: 3, attendance: 225000,
      shows: [
        {
          date: 'April 13',
          surpriseSongs: ['Speak Now', 'Treacherous'],
        },
        {
          date: 'April 14',
          surpriseSongs: ['The Great War (with Aaron Dessner)', 'Youre On Your Own Kid'],
        },
        {
          date: 'April 15',
          surpriseSongs: ['Mad Woman (with Aaron Dessner)', 'Mean'],
        }
      ]
    },
    {
      name: 'Houston', coords: [-95.3698, 29.7604], days: 3, attendance: '240,000',
      shows: [
        {
          date: 'April 21',
          surpriseSongs: ['Wonderland', 'Youre Not Sorry'],
        },
        {
          date: 'April 22',
          surpriseSongs: ['A Place In This World', 'Today Aas A Fairytale'],
        },
        {
          date: 'April 23',
          surpriseSongs: ['Begin Again', 'Cold As You'],
        }
      ]
    },
    {
      name: 'Atlanta', coords: [-84.3879, 33.7490], days: 3, attendance: 225000,
      shows: [
        {
          date: 'April 28',
          surpriseSongs: ['The Other Side of the Door', 'Coney Island'],
        },
        {
          date: 'April 29',
          surpriseSongs: ['High Infidelity', 'Gorgeous'],
        },
        {
          date: 'April 30',
          surpriseSongs: ['I Bet You Think About Me', 'How You Get The Girl'],
        }
      ]
    },
    {
      name: 'Nashville', coords: [-86.7844, 36.1627], days: 3, attendance: 207429,
      shows: [
        {
          date: 'May 5',
          surpriseSongs: ['Sparks Fly', 'Teardrops On My Guitar'],
        },
        {
          date: 'May 6',
          surpriseSongs: ['Out Of The Woods', 'Fifteen'],
        },
        {
          date: 'May 7',
          surpriseSongs: ['Wouldve, Couldve, Shouldve (with Aaron Dessner)', 'Mine'],
        }
      ]
    },
    {
      name: 'Philadelphia', coords: [-75.1652, 39.9526], days: 3, attendance: 209688,
      shows: [
        {
          date: 'May 12',
          surpriseSongs: ['Gold Rush', 'Come Back...Be Here'],
        },
        {
          date: 'May 13',
          surpriseSongs: ['Forever & Always', 'This Love'],
        },
        {
          date: 'May 14',
          surpriseSongs: ['Hey Stephen', 'The Best Day'],
        }
      ]
    },
    {
      name: 'Foxborough', coords: [-71.2662, 42.0654], days: 3, attendance: 197634,
      shows: [
        {
          date: 'May 19',
          surpriseSongs: ['Shouldve Said No', 'Better Man'],
        },
        {
          date: 'May 20',
          surpriseSongs: ['Question...?', 'Invisible'],
        },
        {
          date: 'May 21',
          surpriseSongs: ['I Think He Knows', 'Red'],
        }
      ]
    },
    {
      name: 'East Rutherford', coords: [-74.0776, 40.8128], days: 3, attendance: 265473,
      shows: [
        {
          date: 'May 26',
          surpriseSongs: ['Getaway Car (with Jack Antonoff)', 'Maroon'],
        },
        {
          date: 'May 27',
          surpriseSongs: ['Holy Ground', 'False God'],
        },
        {
          date: 'May 28',
          surpriseSongs: ['Welcome To New York', 'Clean'],
        }
      ]
    },
    {
      name: 'Chicago', coords: [-87.6298, 41.8781], days: 3, attendance: 184500,
      shows: [
        {
          date: 'June 2',
          surpriseSongs: ['I Wish You Would', 'The Lakes'],
        },
        {
          date: 'June 3',
          surpriseSongs: ['You All Over Me (with Maren Morris)', 'I Dont Wanna Live Forever'],
        },
        {
          date: 'June 4',
          surpriseSongs: ['Hits Different', 'The Moment I Knew'],
        }
      ]
    },
    {
      name: 'Detroit', coords: [-83.0458, 42.3314], days: 2, attendance: 156000,
      shows: [
        {
          date: 'June 9',
          surpriseSongs: ['Haunted', 'I Almost Do'],
        },
        {
          date: 'June 10',
          surpriseSongs: ['All You Had To Do Was Stay', 'Breathe'],
        }
      ]
    },
    {
      name: 'Pittsburgh', coords: [-79.9959, 40.4406], days: 2, attendance: 150000,
      shows: [
        {
          date: 'June 16',
          surpriseSongs: ['Mr. Perfectly Fine', 'The Last Time'],
        },
        {
          date: 'June 17',
          surpriseSongs: ['Seven (with Aaron Dessner)', 'The Story Of Us'],
        }
      ]
    },
    {
      name: 'Minneapolis', coords: [-93.2650, 44.9778], days: 2, attendance: 146000,
      shows: [
        {
          date: 'June 23',
          surpriseSongs: ['Paper Rings', 'If This Was A Movie'],
        },
        {
          date: 'June 24',
          surpriseSongs: ['Dear John', 'Daylight'],
        }
      ]
    },
    {
      name: 'Cincinnati', coords: [-84.5120, 39.1031], days: 2, attendance: 131030,
      shows: [
        {
          date: 'June 30',
          surpriseSongs: ['Im Only Me When Im With You', 'Evermore'],
        },
        {
          date: 'July 1',
          surpriseSongs: ['Ivy (with Aaron Dessner)', 'Call It What You Want'],
        }
      ]
    },
    {
      name: 'Kansas City', coords: [-94.5786, 39.0997], days: 2, attendance: 152832,
      shows: [
        {
          date: 'July 7',
          surpriseSongs: ['Never Grow Up', 'When Emma Falls In Love'],
        },
        {
          date: 'July 8',
          surpriseSongs: ['Last Kiss', 'Dorothea'],
        }
      ]
    },
    {
      name: 'Denver', coords: [-104.9903, 39.7392], days: 2, attendance: 168000,
      shows: [
        {
          date: 'July 14',
          surpriseSongs: ['Picture To Burn', 'Timeless'],
        },
        {
          date: 'July 15',
          surpriseSongs: ['Starlight', 'Back To December'],
        }
      ]
    },
    {
      name: 'Seattle', coords: [-122.3321, 47.6062], days: 2, attendance: 144000,
      shows: [
        {
          date: 'July 22',
          surpriseSongs: ['This Is Why We Cant Have Nice Things', 'Everything Has Changed'],
        },
        {
          date: 'July 23',
          surpriseSongs: ['Message In A Bottle', 'Tied Together With A Smile'],
        }
      ]
    },
    {
      name: 'Santa Clara', coords: [-121.9552, 37.3541], days: 2, attendance: 137000,
      shows: [
        {
          date: 'July 28',
          surpriseSongs: ['Right Where You Left Me', 'Castles Crumbling'],
        },
        {
          date: 'July 29',
          surpriseSongs: ['Stay Stay Stay', 'All Of the Girls You Loved Before'],
        }
      ]
    },
    {
      name: 'Los Angeles', coords: [-118.2437, 34.0522], days: 6, attendance: 601440,
      shows: [
        {
          date: 'August 3',
          surpriseSongs: ['I Can See You', 'Maroon'],
        },
        {
          date: 'August 4',
          surpriseSongs: ['Our Song', 'You Are In Love'],
        },
        {
          date: 'August 5',
          surpriseSongs: ['Death By A Thousand Cuts', 'Youre On Your Kid'],
        },
        {
          date: 'August 7',
          surpriseSongs: ['Dress', 'Exile'],
        },
        {
          date: 'August 8',
          surpriseSongs: ['I Know Places', 'King Of My Heart'],
        },
        {
          date: 'August 9',
          surpriseSongs: ['New Romantics', 'New Years Day'],
        }
      ]
    }
  ];

  function generateLegendItems(labels, colors) {
    return labels.map((label, index) => (
      <div className="legend-item" key={label}>
        <div className="legend-color" style={{ backgroundColor: colors[index] }}></div>
        <div>{label}</div>
      </div>
    ));
  }

  // Function to adjust color slightly
  const adjustColor = (color, amount) => {
    // Check if the color exists and is a string
    if (color && typeof color === 'string') {
      // Parse the color value
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
  
      // Adjust the color slightly
      r = Math.min(255, Math.max(0, r - 50));
      g = Math.min(255, Math.max(0, g - 50));
      b = Math.min(255, Math.max(0, b - 50));
  
      // Convert back to hexadecimal
      const rHex = r.toString(16).padStart(2, '0');
      const gHex = g.toString(16).padStart(2, '0');
      const bHex = b.toString(16).padStart(2, '0');
  
      return `#${rHex}${gHex}${bHex}`;
    } else {
      // Return a default color or handle the undefined case as needed
      return '#000000'; // Replace with your default color or appropriate handling
    }
  };
  

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
      <div className="legend">
        <div className="legend-column">
          {generateLegendItems(['Folklore', 'Lover', 'Speak Now'], [folklore, lover, speaknow])}
        </div>
        <div className="legend-column">
          {generateLegendItems(['Red', '1989', 'Reputation'], [red, ninteen89, reputation])}
        </div>
        <div className="legend-column">
          {generateLegendItems(['Evermore', 'Taylor Swift', 'Fearlesss'], [evermore, taylorswift, fearless])}
        </div>
      </div>



      <div className="popularity2">
      <div>
        <label className="label2">Venue Capacities</label>
      </div>
        <label htmlFor="yearDropdown">Select Year:</label>
        <select
          id="yearDropdown"
          value={selectedCapacity}
          onChange={(e) => setSelectedCapacity(e.target.value)}
        >
          {capacities.map((capacity) => (
            <option key={capacity} value={capacity}>
              {capacity}
            </option>
          ))}
        </select>

        <label className="toggle-label">
        Venue Map: 
        <input
          type="checkbox"
          id="heatmapToggle"
          checked={venueToggle}
          onChange={() => setVenueToggle(!venueToggle)}
        />
      </label>
    </div>





      <div className="popularity1">
      <div>
        <label className="label1">Popularity of Albums in Selected Year</label>
      </div>
        <label htmlFor="yearDropdown">Select Year:</label>
        <select
          id="yearDropdown"
          value={selectedYearPop}
          onChange={(e) => setSelectedYearPop(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label className="toggle-label">
        Popularity Map: 
        <input
          type="checkbox"
          id="heatmapToggle"
          checked={popmapToggle}
          onChange={() => setHPopmapToggle(!popmapToggle)}
        />
      </label>
    </div>

      <div className="popularity">
      <div>
        <label className="label1">Popularity Distribution of Album in Selected Year</label>
      </div>
      <label htmlFor="albumDropdown">Select Album:</label>
      <select
        id="albumDropdown"
        value={selectedAlbum}
        onChange={(e) => setSelectedAlbum(e.target.value)}
      >
        {albums.map((album) => (
            <option key={album} value={album}>
              {album}
            </option>
          ))}
      </select>

      <label htmlFor="yearDropdown">Select Year:</label>
      <select
        id="yearDropdown"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
      </select>

      <label className="toggle-label">
        Heatmap: 
        <input
          type="checkbox"
          id="heatmapToggle"
          checked={heatmapToggle}
          onChange={() => setHeatmapToggle(!heatmapToggle)}
        />
      </label>
    </div>
      
    </div>
  );
};

export default Map;