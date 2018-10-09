import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        waterpoints: [],
      };
    }

    componentDidMount() {
      fetch('http://localhost:3000/waterpoints') //, {'mode': 'no-cors'}
        .then(response => response.json())
        .then(data => this.setState({ waterpoints: data.waterpoints }));
    }    

  render() {
    const { waterpoints } = this.state;

    return (
      <div className="List">
        <ul>
          {waterpoints.map(waterpoint =>
            <li key={waterpoint._id}>
              <div>
                <img src={waterpoint.picture} alt={waterpoint.name} />
              </div>   
              <div className="ListText">
                <p>
                  {waterpoint.name} - 
                  {waterpoint.type}
                </p>
              </div> 
            </li>
          )}
        </ul>
      </div>
    );

  }
}

export default App;
