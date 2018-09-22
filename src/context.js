import React, { Component } from 'react'

import { stores } from './static/stores'
import { models } from './static/models'

export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

const BASE_NUMBER = 100

export class AppProvider extends Component {
	constructor () {
		super()

		this.state = {
			products: [],
			stores: stores,
			models: models
		}
	}

	setGlobalState(obj) {
		this.setState(obj)
	}

	initProducts() {
		const products = []
		for (let store of stores) {
			for (let model of models) {
				products.push({
					store: store,
					model: model,
					inventory: BASE_NUMBER
				})
			}
		}
		return products
	}

	componentDidMount() {
		this.setState({
			products: this.initProducts()
		})
	}

	render () {
		return (
			<AppContext.Provider
				value={{
					stores: this.state.stores,
					models: this.state.models,
					products: this.state.products,
					setGlobalState: this.setGlobalState
				}}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}