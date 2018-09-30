import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Order from './Order'

class Product extends PureComponent {
  render () {
    const quantity = this.props.data.inventory
    let stockFeedback
    if (quantity >= 50 && quantity < 99) {
      stockFeedback = 'in-stock'
    } else if (quantity >= 10 && quantity < 50) {
      stockFeedback = 'could-restock'
    } else if (quantity <= 10) {
      stockFeedback = 'should-restock'
    }

    return (
      <ListItem className='model'>
        <ListItemText primary={this.props.data.model} />
        <ListItemText className={stockFeedback} primary={quantity} />
        <Order data={this.props.data} />
      </ListItem>
    )
  }
}

Product.propTypes = { data: PropTypes.object }

export default Product
