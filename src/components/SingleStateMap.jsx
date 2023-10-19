import React from "react";

const SingleStateMap = ({ selectedState, imageUrl, onClose }) => (
    <div>
        <h1>{selectedState.properties.NAME}</h1>
        <img src={imageUrl} alt={selectedState.properties.NAME} style={{ width: '200px', height: '200px' }} />
        <button onClick={onClose}>Close</button>
    </div>
);

export default SingleStateMap;