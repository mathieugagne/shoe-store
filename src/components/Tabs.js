import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import TabContainer from './TabContainer'
import { stores } from '../static/stores'

class Store extends Component {
	constructor(props) {
		super(props)

		this.state = {
			stores: stores,
			currentStore: 0
		}
	}

	handleChange(event, currentStore) {
		this.setState({ currentStore })
	}

	render() {		
		return ( 
			<div>
				<AppBar position="static" color="default">
					<Tabs
						value={this.state.currentStore}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						fullWidth>
						{this.state.stores.map((store, index) =>
							<Tab key={index} label={store} />
						)}
					</Tabs>
				</AppBar>
				{this.state.stores.map((store, index) =>
					index === this.state.currentStore && <TabContainer key={index}>{store}</TabContainer>
				)}	
			</div>
		)
	}
}

export default Store