import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'

class Status extends PureComponent {
  render () {
    return (
      <Snackbar
        className='status-bar'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={true}
        onClose={this.handleClose}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span>{this.props.message}</span>}
      />
    )
  }
}

Status.propTypes = { message: PropTypes.string }

export default Status
