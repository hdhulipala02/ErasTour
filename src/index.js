import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './map';
import AlbumRadialChart from './albumradialchart'; // Check if the import path is correct
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      isRadialChartVisible: false,
    };
  }

  toggleComponent = () => {
    this.setState((prevState) => ({
      isRadialChartVisible: !prevState.isRadialChartVisible,
    }));
  };

  render() {
    return (
      <div className='canvas'>
        <div className="box">
          <button className="toggle-button" onClick={this.toggleComponent}>
            {this.state.isRadialChartVisible ? 'Show Map' : 'Show Radial Chart'}
          </button>
          {this.state.isRadialChartVisible ? (
            <div className='radialchart-container'>
              <AlbumRadialChart /> {/* Render the AlbumRadialChart component here */}
            </div>
          ) : (
            <div className='map-container'>
              <Map name={this.state.name} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
