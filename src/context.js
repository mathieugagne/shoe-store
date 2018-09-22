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
			productsData: []
		}
	}

	setGlobalState(obj) {
		this.setState(obj)
	}

	initProducts() {
		const products = []
		for (let store of stores) {
			for (let model of models) {
				const product = {
					store: store,
					model: model,
					inventory: BASE_NUMBER
				}
				products.push(product)
			}
		}
		return products
	}

	componentDidMount() {
		this.setState({
			productsData: this.initProducts()
		})
	}

	render () {
		return (
			<AppContext.Provider
				value={{
					products: this.state.productsData,
					setGlobalState: this.setGlobalState
				}}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}