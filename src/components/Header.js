import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { AppConsumer } from '../context'
import Status from '../components/Status'

class Store extends Component {	
	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit">
							Shoe Store Inventory
					</Typography>
				</Toolbar>

				<AppConsumer>
					{ context => <Status message={context.status} /> }
				</AppConsumer>

			</AppBar>
		)
	}
}

export default Store