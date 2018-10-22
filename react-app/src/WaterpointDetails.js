import PropTypes from 'prop-types'
import React from 'react'

import './WaterpointDetails.css'

const WaterpointDetails = ({selectedWaterpoint}) => (
	<div className="Details">
		<img src={selectedWaterpoint.picture} alt={selectedWaterpoint.name} />
		<h1>{selectedWaterpoint.name}</h1>
		<ul>
			<li>Type: {selectedWaterpoint.type}</li>
			<li>Location: {selectedWaterpoint.location.coordinates[0][0]}, {selectedWaterpoint.location.coordinates[0][1]}</li>
		</ul>
	</div>
)

WaterpointDetails.propTypes = {
	selectedWaterpoint: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		location: PropTypes.shape({
			coordinates: PropTypes.arrayOf(
				PropTypes.arrayOf(
					PropTypes.number.isRequired).isRequired).isRequired,
			type: PropTypes.string.isRequired,
		}).isRequired,
		name: PropTypes.string.isRequired,
		picture: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	})
} 

export default WaterpointDetails