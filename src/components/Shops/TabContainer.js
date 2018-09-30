import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { AppConsumer } from '../../context'
import Shop from './Shop'

class TabContainer extends PureComponent {
  render () {
    return (
      <AppConsumer>
        { context =>
          context.shops.map(shop => {
            if (shop.store === this.props.store) {
              return <Shop key={shop.store} products={shop.products} />
            }
          })
        }
      </AppConsumer>
    )
  }
}

TabContainer.propTypes = { store: PropTypes.string }

export default TabContainer
