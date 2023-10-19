import React from 'react';

const CityDetails = ({ city, onClose }) => (
    <div>
        <h1>{city.name}</h1>
        <p>Days spent: {city.days}</p>
        <button onClick={onClose}>Close</button>
    </div>
);

export default CityDetails;
