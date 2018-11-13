import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';

import Paliwo from './containers/Paliwo/Paliwo';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Paliwo/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
