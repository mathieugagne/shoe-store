import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'

import { AppConsumer } from '../../context'
import { inventory } from '../../static/inventory'

class Order extends Component {
  constructor (props) {
    super(props)

    this.state = {
      store: props.data.store,
      model: props.data.model,
      inventory: inventory,
      quantity: 0
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.data.inventory !== prevState.inventory) {
      this.setState({ inventory: prevProps.data.inventory })
    }
  }

  setQuantity (quantity) {
    this.setState({ quantity: this.state.quantity + quantity })
  }

  sendQuantity (ws, updateProducts) {
    const data = JSON.stringify({
      store: this.state.store,
      model: this.state.model,
      inventory: this.state.inventory + this.state.quantity
    })
    ws.send(data)
    updateProducts(data)
    this.setState({ quantity: 0 })
  }

  render () {
    return (
      <div>
        <IconButton
          color='primary'
          aria-label='Remove one article'
          onClick={_ => this.setQuantity(-1)}>
          <RemoveShoppingCartIcon />
        </IconButton>

        <IconButton
          color='primary'
          aria-label='Add one article'
          onClick={_ => this.setQuantity(1)}>
          <AddShoppingCartIcon />
        </IconButton>

        <AppConsumer>
          { context => {
            return (
              <IconButton
                aria-label='Send stock movement to database'
                disabled={this.state.quantity === 0}
                onClick={_ => this.sendQuantity(context.websocket, context.updateProducts)}>
                <Badge badgeContent={this.state.quantity} color='primary'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )
          }}
        </AppConsumer>
      </div>
    )
  }
}

Order.propTypes = { data: PropTypes.object }

export default Order
