import React, { useState } from 'react';
import '../style.css';

const CityDetails = ({ city, onClose }) => {
  const [selectedNight, setSelectedNight] = useState(null);

  const handleNightClick = (night) => {
    setSelectedNight(night);
  };

  const nightsToShow = Math.min(city.days, 2);

  return (
    <div className='city-popup'>
      <h1 className='city-name'>{city.name} Statistics</h1>
      <p>Days spent: {city.days}</p>
      {selectedNight && (
        <div>
          <h3>Surprise Songs:</h3>
          {selectedNight === 'Nights 3+' && city.name === 'Los Angeles' ? (
            <div>
              {city.shows.slice(2).map((show, index) => (
                <div key={index}>
                  <div><strong>{show.date}:</strong></div>
                  {show.surpriseSongs.map((song, index) => (
                    <div key={index}>{song}</div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {selectedNight === 'Nights 3+' && city.name !== 'Los Angeles' ? (
                <div>
                  {city.shows.slice(2).map((show, index) => (
                    <div key={index}>
                      {show.surpriseSongs.map((song, index) => (
                        <div key={index}>{song}</div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {city.shows[selectedNight - 1]?.surpriseSongs.map((song, index) => (
                    <div key={index}>{song}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <br />
      <div className='night-buttons'>
        {city.shows.slice(0, nightsToShow).map((show, night) => (
          <button className='night-button' key={night + 1} onClick={() => handleNightClick(night + 1)}>
            {show.date}
          </button>
        ))}
        {city.days >= 3 && (
          <button className='night-button' onClick={() => handleNightClick('Nights 3+')}>
            {city.name === 'Los Angeles' ? 'August 5+' : city.shows[2].date}
          </button>
        )}
      </div>
      <button className='city-button' onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CityDetails;