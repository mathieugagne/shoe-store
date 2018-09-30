import React, { Component } from 'react'
import update from 'react-addons-update'

import { stores } from './static/stores'
import { models } from './static/models'
import { inventory, maxLimitView } from './static/inventory'

export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

export class AppProvider extends Component {
  constructor () {
    super()

    this.state = {
      products: [],
      stores: stores,
      models: models,
      status: null,
      websocket: null,
      limit: maxLimitView
    }
  }

  componentDidMount () {
    this.setState({
      products: this.initProducts()
    }, _ => {
      this.initSocket()
    })
  }

  componentWillUnmount () {
    this.state.ws.close()
  }

  initProducts () {
    const products = []
    for (let store of stores) {
      for (let model of models) {
        products.push({
          store: store,
          model: model,
          inventory: inventory
        })
      }
    }
    return products
  }

  initSocket () {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onopen = _ => this.setState({ status: 'Opened connection' })
    ws.onerror = _ => this.setState({ status: 'WebSocket error' })
    ws.onclose = event => {
      !event.wasClean && this.setState({
        status: `WebSocket error: ${event.code} ${event.reason}`
      })
    }
    ws.onmessage = event => { this.updateProducts(event.data) }
    this.setState({websocket: ws})
  }

  updateProducts (data) {
    data = JSON.parse(data)
    const index = this.state.products.findIndex(product => {
      return product.store === data.store && product.model === data.model
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

  setLimit (value) {
    this.setState({limit: value})
  }

  render () {
    return (
      <AppContext.Provider
        value={{
          stores: this.state.stores,
          models: this.state.models,
          products: this.state.products,
          status: this.state.status,
          websocket: this.state.websocket,
          limit: this.state.limit,
          updateProducts: this.updateProducts,
          setLimit: this.setLimit
        }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
