import React from 'react';
import '../style.css'

const CityDetails = ({ city, onClose }) => (
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
        <br></br>
        <button className='city-button' onClick={onClose}>Close</button>
    </div>
);

export default CityDetails;
