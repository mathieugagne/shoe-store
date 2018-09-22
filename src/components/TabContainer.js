import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { models } from '../static/models'

class TabContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			models: models
		}
	}
  
	render() {
		return (
			<List className="models">
				{this.state.models.map((model) =>
					<ListItem className="model" key={model}>
						<ListItemText primary={model} />
            <ListItemText primary="100" />
					</ListItem>
				)}
			</List>
		)
	}
}

export default TabContainer