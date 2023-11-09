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
            <div>
                <h3>Surprise Songs:</h3>
                {city.shows.map((show, index) => (
                    <div key={index}>
                        <strong>{show.date}:</strong> {show.surpriseSongs.join(' and ')}
                    </div>
                ))}
            </div>
            <br />
            <div className="night-buttons">
                {[...Array(nightsToShow).keys()].map((night) => (
                    <button className='night-button' key={night} onClick={() => handleNightClick(night + 1)}>
                        Night {night + 1}
                    </button>
                ))}
                {city.days >= 3 && (
                    <button className='night-button' onClick={() => handleNightClick('Nights 3+')}>
                        Nights 3+
                    </button>
                )}
            </div>
            {selectedNight && (
                <div>
                    {/* Render content for selected night */}
                    {selectedNight === 'Nights 3+' ? (
                        <div>Content for Nights 3+</div>
                    ) : (
                        <div>Content for Night {selectedNight}</div>
                    )}
                </div>
            )}
            <br />
            <button className='city-button' onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default CityDetails;
