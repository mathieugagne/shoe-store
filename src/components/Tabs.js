import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import TabContainer from './TabContainer'

class Store extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 0,
			stores: props.stores
		}
	}

	handleChange = (event, value) => {
		this.setState({ value })
	}

	render() {

		return (
			<div>
				<AppBar position="static" color="default">
					<Tabs
						className="stores"
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						scrollable
						fullWidth>
						{ this.state.stores.map((store, index) =>
							<Tab key={index} label={store} />
						)}
					</Tabs>
				</AppBar>
				{ this.state.stores.map((store, index) =>
					index === this.state.value && <TabContainer key={index} store={store}>{store}</TabContainer>
				)}
			</div>
		)
	}
}

Store.propTypes = { stores: PropTypes.array }

export default Store