import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Order from './Order'

class Product extends Component {
	render() {    
		return (
			<ListItem
				className="model"
				store={this.props.data.store}
				key={this.props.data.model}>
				<ListItemText primary={this.props.data.model} />
				<ListItemText primary={this.props.data.inventory} />
				<Order />
			</ListItem>
		)
	}
}

Product.propTypes = { data: PropTypes.object }

export default Product