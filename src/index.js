import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './map';
import RadialChart from './radialchart';

import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div className='canvas'>
        <h1 className='title'>The Era's Tour: Shipman's Version</h1>
        {/* <h1 class='title bottom-right'>Shipman's Version</h1> */}
        <div class="box">
          <div className='map-container'>
            <Map name={this.state.name} />
          </div>
          <div className='radialchart-container'>
            <RadialChart name={this.state.name} />
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

