import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { AppConsumer } from '../context'
import { limitViews } from '../static/inventory'
import Status from '../components/Status'

class Store extends Component {
  handleChange (setLimit, event) {
    setLimit(event.target.value)
  }

  render() {
    const listItems = limitViews.map(limitView => {
      return (
        <MenuItem
          className="limit-options"
          key={limitView.label}
          value={limitView.limit}>
          {limitView.label}
        </MenuItem>
      )
    })

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
              Shoe Store Inventory
          </Typography>

          <AppConsumer>
            { context => <p>View limit set to {context.limit}</p> }
          </AppConsumer>

          <form autoComplete="off">
            <FormControl>
              <InputLabel htmlFor="product-view" className="label-view">
                Select product view
              </InputLabel>
              <AppConsumer>
                { context =>
                  <Select
                    value={context.limit}
                    onChange={event => this.handleChange(context.setLimit, event)}
                    className="select-view"
                    inputProps={{ name: 'Select your view', id: 'product-view' }}>
                    {listItems}
                  </Select>
                }
              </AppConsumer>
            </FormControl>
          </form>
        </Toolbar>

        <AppConsumer>
          { context => <Status message={context.status} /> }
        </AppConsumer>

      </AppBar>
    )
  }
}

export default Store
