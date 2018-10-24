import PropTypes from 'prop-types'
import React from 'react'

import './AddWaterpoint.css'

const AddWaterpoint = ({}) => (
	<div className="AddWaterpoint">
        <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
	</div>
)

export default AddWaterpoint