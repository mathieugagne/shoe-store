import React, { Component } from 'react'
import update from 'react-addons-update'

import { stores } from './static/stores'
import { models } from './static/models'

export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

const BASE_INVENTORY = 100

export class AppProvider extends Component {
	constructor () {
		super()

		this.state = {
			products: [],
			stores: stores,
			models: models,
			status: null
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
					inventory: BASE_INVENTORY
				})
			}
		}
		return products
	}

	initSocket() {
		this.ws = new WebSocket('ws://localhost:8080')
		this.ws.onopen = _ => this.setState({ status: 'Opened connection' })
		this.ws.onerror = _ => this.setState({ status: 'WebSocket error' })
		this.ws.onclose = event => {
			!event.wasClean && this.setState({
				status: `WebSocket error: ${event.code} ${event.reason}`
			})
		}

		this.ws.onmessage = event => {
			const data = JSON.parse(event.data)
			const index = this.state.products.findIndex(element => {
				return element.store === data.store && element.model === data.model
			})
			const upgrade = update(this.state, {
				products: {
					[index]: {
						$set: {
							store: data.store,
							model: data.model,
							inventory: data.inventory
						}
					}
				}
			})
			this.setState({
				status: 'App running',
				products: upgrade.products
			})
		}
	}

	componentDidMount() {
		this.setState({
			products: this.initProducts()
		}, _ => {
			this.initSocket() 
		})
	}

	render () {
		return (
			<AppContext.Provider
				value={{
					stores: this.state.stores,
					models: this.state.models,
					products: this.state.products,
					status: this.state.status,
					setGlobalState: this.setGlobalState
				}}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}