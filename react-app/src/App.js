import React, { Component } from 'react';

import WaterpointsList from './WaterpointsList'
import WaterpointDetails from './WaterpointDetails'
// import AddWaterpoint from './AddWaterpoint'

import './App.css';

const API_URL = "http://localhost:3000/";

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  waterpoints: [],
			selectedWaterpoint: null,
		};
	}

	componentDidMount() {
		// TODO handle no response from server (eg: server down)
		// Get list of all wateroints
		fetch(API_URL + 'waterpoints')
		  .then(response => response.json())
			.then(data => this.setState({ waterpoints: data.waterpoints }));
	}    

	// Arrow fx for binding
	handleListItemClick = waterpoint => {
		this.setState({
			selectedWaterpoint: waterpoint,
		})
	}

	// Arrow fx for binding
	handleSubmit = event => {

		event.preventDefault();

		// retrieve form data for all form elements with a "name" attribute
		const data = new FormData(event.target);
		
		// Logging formdata
		// for (var pair of data.entries()) {
		// 	console.log(pair[0] + ': ' + pair[1]);
		// }

		fetch( API_URL + 'waterpoints', {
			method: 'POST',
			body: data,
		});
	}

  render() {
  	
  	const { waterpoints, selectedWaterpoint } = this.state;

		return (
			<div>
				
				<WaterpointsList waterpoints={waterpoints} apiUrl={API_URL} onClick={this.handleListItemClick} />
				
				{selectedWaterpoint && <WaterpointDetails selectedWaterpoint={selectedWaterpoint} apiUrl={API_URL} />}

				<form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data" >
					<label>Name:<input type="text" name="name" required /></label>

					<label>Type:
						<select name="type" required>
							<option value="Lake">Lake</option>
							<option value="Waterfall">Waterfall</option>
							<option value="Hot spring">Hot spring</option>
						</select>
					</label>

					
					<label>Picture URL:<input type="file" name="picture" required /></label>
					<label>Latitude:<input type="number" step="0.0000001" name="latitude" required /></label>
					<label>Longitude:<input type="number" step="0.0000001" name="longitude" required /></label>

					<button type="submit" >Send data!</button>
				
				</form>
			</div>
    )
  }
}

export default App;