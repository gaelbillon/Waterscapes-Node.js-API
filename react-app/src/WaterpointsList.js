import PropTypes from 'prop-types'
import React from 'react'

import './WaterpointsList.css'

const WaterpointsList = ({ waterpoints, apiUrl, onClick}) => (
	<div className="List">
	  <ul>
	    {waterpoints.map(waterpoint =>
	      <li 
	      key={waterpoint._id}
	      onClick={ () => onClick(waterpoint)}
	      >
	        <div>
						<img src={apiUrl + waterpoint.picturePath + "/" + waterpoint.picture} alt={waterpoint.name} />
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
)

// Typechecking
WaterpointsList.propTypes = {
	waterpoint: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		location: PropTypes.shape({
			coordinates: PropTypes.arrayOf(
				PropTypes.arrayOf(
					PropTypes.number.isRequired).isRequired).isRequired,
			type: PropTypes.string.isRequired,
		}).isRequired,
		name: PropTypes.string.isRequired,
		picture: PropTypes.string.isRequired,
		picturePath: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
	})
} 

export default WaterpointsList