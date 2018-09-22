import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'

class Order extends Component {
	constructor(props) {
		super(props)

		this.state = {
			quantity: 0
		}
	}

	setQuantity(quantity) {
		this.setState({quantity: this.state.quantity + quantity })
	}

	sendQuantity() {
		this.setState({quantity: 0})
	}
  
	render() {
		return (
			<div>
				<IconButton
					color="primary"
					aria-label="Remove one article"
					onClick={_ => this.setQuantity(-1)}>
					<RemoveShoppingCartIcon />
				</IconButton>

				<IconButton
					color="primary"
					aria-label="Add one article"
					onClick={_ => this.setQuantity(1)}>
					<AddShoppingCartIcon />
				</IconButton>

				<IconButton 
					aria-label="Send stock movement to database"
					disabled={this.state.quantity === 0}
					onClick={_ => this.sendQuantity()}>
					<Badge badgeContent={this.state.quantity} color="primary">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
			</div>
		)
	}
}

export default Order