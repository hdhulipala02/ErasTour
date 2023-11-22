import React, { useState } from 'react';
import RadialChart from './radialchart'; // Update the path to your RadialChart component

const AlbumRadialChart = () => {
  const [column, setColumn] = useState('danceability');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [showChart, setShowChart] = useState(false);
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
  };

  const handleShowChart = () => {
    setShowChart(true);
  };

  return (
    <div>
      <div>
        <label htmlFor="columnSelect">Select a Column:</label>
        <select id="columnSelect" value={column} onChange={handleColumnChange}>
          {columns.map((col, index) => (
            <option key={index} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="albumSelect">Select an Album:</label>
        <select id="albumSelect" value={selectedAlbum} onChange={handleAlbumChange}>
          <option value="" disabled>Select an album</option>
          {albums.map((album, index) => (
            <option key={index} value={album}>
              {album}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleShowChart}>Show Radial Barchart</button>

      {showChart && selectedAlbum && (
        <div>
          <h2>Radar Chart for {selectedAlbum}</h2>
          <RadialChart key={`${selectedAlbum}_${column}`} column={column} selectedAlbum={selectedAlbum} />
        </div>
      )}
    </div>
  );
};

export default AlbumRadialChart;
