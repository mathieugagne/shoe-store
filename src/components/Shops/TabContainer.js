import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { AppConsumer } from '../../context'
import Shop from './Shop'

class TabContainer extends PureComponent {
  getProducts (context, store) {
    if (context.shops.length) {
      const index = context.shops.findIndex(shop => shop.store === this.props.store)
      const products = context.shops[index].products
      return products.filter(product => product.inventory <= context.limit)
    }
  }

  render () {
    return (
      <AppConsumer>
        { context =>
          <Shop
            key={`shop-${this.props.store}`}
            store={this.props.store}
            products={this.getProducts(context, this.props.store)} />
        }
      </AppConsumer>
    )
  }
}

TabContainer.propTypes = { store: PropTypes.string }

export default TabContainer
