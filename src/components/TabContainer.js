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
              const store = product.store.includes(this.state.store)
              const inventory = context.limit >= product.inventory
              if (store & inventory) {
                return <Product key={product.model} data={product} />
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
