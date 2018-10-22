import React, { Component } from 'react';

import './App.css';

import WaterpointsList from './WaterpointsList'
import WaterpointDetails from './WaterpointDetails'

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  waterpoints: [],
		  selectedWaterpoint: null,
		};

		this.handleListItemClick = this.handleListItemClick.bind(this);
	}

	componentDidMount() {
		fetch('http://localhost:3000/waterpoints') //, {'mode': 'no-cors'}
		  .then(response => response.json())
		  .then(data => this.setState({ waterpoints: data.waterpoints }));
	}    

	handleListItemClick (waterpoint) {
		console.log(waterpoint);
		this.setState({
			selectedWaterpoint: waterpoint,
		})
	}

  render() {
  	
  	const { waterpoints, selectedWaterpoint } = this.state;

    return (
    	<div>
      		<WaterpointsList waterpoints={waterpoints} onClick={this.handleListItemClick} />
      		{selectedWaterpoint && <WaterpointDetails selectedWaterpoint={selectedWaterpoint}/>}
      	</div>
    )
  }

}

export default App;