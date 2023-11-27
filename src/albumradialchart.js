import React, { useState } from 'react';
import RadialChart from './radialchart'; // Update the path to your RadialChart component
import "./radialchart.css"

const AlbumRadialChart = () => {
  const [column, setColumn] = useState('danceability');
  const [selectedAlbum, setSelectedAlbum] = useState('Taylor Swift');
  const [showChart, setShowChart] = useState(true);
  const albums = [
    'Taylor Swift',
    'Fearless',
    'Speak Now',
    'Red',
    '1989',
    'reputation',
    'Lover',
    'folklore',
    'evermore',
    'Midnights'
  ];
    const columns = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'loudness',
    'speechiness',
    'tempo',
    'popularity',
    'duration_ms'
  ];
  const handleColumnChange = (e) => {
    setColumn(e.target.value);
  };

  const handleAlbumChange = (e) => {
    setSelectedAlbum(e.target.value);
    setShowChart(true)
  };

  const handleShowChart = () => {
    setShowChart(true);
  };

  return (
    <div className="container">
      <div className="select-container">
        <label htmlFor="columnSelect" className="select-label">Select a Metric:</label>
        <select id="columnSelect" value={column} onChange={handleColumnChange}>
          {columns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="albumSelect" className="select-label">Select an Album:</label>
        <select id="albumSelect" value={selectedAlbum} onChange={handleAlbumChange}>
          <option value="" disabled>Select an album</option>
          {albums.map((album, index) => (
            <option key={index} value={album}>
              {album}
            </option>
          ))}
        </select>
      </div>

      {showChart && selectedAlbum && (
        <div className="radial-chart-container">
          <h2>{column} of {selectedAlbum}</h2>
          <RadialChart key={`${selectedAlbum}_${column}`} column={column} selectedAlbum={selectedAlbum} />
        </div>
      )}
    </div>
  );
};

export default AlbumRadialChart;