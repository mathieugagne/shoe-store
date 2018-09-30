import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'

import Product from './Product'

class Shop extends PureComponent {
  render () {
    return (
      <List className='models'>
        { this.props.products.map(product => {
          return <Product key={product.model} data={product} />
        }) }
      </List>
    )
  }
}

Shop.propTypes = { product: PropTypes.array }

export default Shop
