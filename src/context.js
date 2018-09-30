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
      shops: [],
      status: null,
      websocket: null,
      limit: maxLimitView
    }
  }

  componentDidMount () {
    this.setState({
      shops: this.initShops()
    }, _ => {
      this.initSocket()
    })
  }

  componentWillUnmount () {
    this.state.ws.close()
  }

  initShops () {
    const shops = []
    for (let store of stores) {
      shops.push({
        store: store,
        products: this.initProducts()
      })
    }
    return shops
  }

  initProducts () {
    const products = []
    for (let model of models) {
      products.push({
        model: model,
        inventory: inventory
      })
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

  updateProducts = data => {
    data = JSON.parse(data)
    const indexStore = this.state.shops.findIndex(shop => {
      return shop.store === data.store
    })
    const indexProduct = models.findIndex(model => {
      return model === data.model
    })
    const upgrade = update(this.state, {
      shops: {
        [indexStore]: {
          products: {
            [indexProduct]: {
              $merge: {
                model: data.model,
                inventory: data.inventory
              }
            }
          }
        }
      }
    })
    this.setState({
      status: 'App running',
      shops: upgrade.shops
    })
  }

  setLimit = value => {
    this.setState({limit: value})
  }

  render () {
    return (
      <AppContext.Provider
        value={{
          shops: this.state.shops,
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
