import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class Store extends Component {
	render() {
		return ( 
			<div>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit">
                Shoe Store Inventory
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default Store