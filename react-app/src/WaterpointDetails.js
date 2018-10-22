import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './WaterpointDetails.css'

const WaterpointDetails = ({selectedWaterpoint}) => (
	<div className="Details">
		<ul>
			<li>Name: {selectedWaterpoint.name}</li>
			<li>Type: {selectedWaterpoint.type}</li>
			<li>Id: {selectedWaterpoint._id}</li>
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