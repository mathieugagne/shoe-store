import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Order from './Order'
import { limitViews } from '../../static/inventory'

class Product extends PureComponent {
  stockFeedback (quantity) {
    return limitViews.find(status => quantity <= status.limit).label
  }

  render () {
    const quantity = this.props.product.inventory

    return (
      <ListItem className='model'>
        <ListItemText primary={this.props.product.model} />
        <ListItemText
          className={this.stockFeedback(quantity)}
          primary={quantity} />
        <Order store={this.props.store} product={this.props.product} />
      </ListItem>
    )
  }
}

Product.propTypes = {
  store: PropTypes.string,
  product: PropTypes.object
}

export default Product
