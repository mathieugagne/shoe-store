import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

class Status extends Component {
	constructor (props) {
		super(props)

		this.state = { message: null }
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.message !== prevState.message) {
			this.setState({ message: prevProps.message })
		}
	}
	
	render() {	
		return (
			<Snackbar
				className="status-bar"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={this.state.message}
				onClose={this.handleClose}
				ContentProps={{'aria-describedby': 'message-id'}}
				message={<span>{this.state.message}</span>}
			/>
		)
	}
}

export default Status