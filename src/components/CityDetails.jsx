import React from 'react';
import '../style.css'

const CityDetails = ({ city, onClose }) => (
    <div className='city-popup'>
        <h1 className='city-name'>{city.name} Statistics</h1>
        <p>Days spent: {city.days}</p>
        <button className='city-button' onClick={onClose}>Close</button>
    </div>
);

export default CityDetails;
