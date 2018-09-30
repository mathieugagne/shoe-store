import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'

import Product from './Product'

class Shop extends PureComponent {
  render () {
    return (
      <List className='models'>
        { this.props.products.map((product, index) => {
          return (
            <Product
              key={`product-${index}`}
              store={this.props.store}
              product={product} />
          )
        })}
      </List>
    )
  }
}

Shop.defaultProps = {
  products: []
}

Shop.propTypes = {
  products: PropTypes.array,
  store: PropTypes.string
}

export default Shop
