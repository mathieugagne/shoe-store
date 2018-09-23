import React, { Component } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'

import { AppConsumer } from '../context'
import Product from './Product'

class TabContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			store: props.store,
			products: []
		}
	}
  
	render() {
		return (
			<AppConsumer>
				{ context => 
					<List className="models">
						{ context.products.map(product => {
							if (product.store.includes(this.state.store)) {
								return <Product key={product} data={product} />
							}
						}) }
					</List>
				}
			</AppConsumer>
		)
	}
}

TabContainer.propTypes = { store: PropTypes.string }

export default TabContainer