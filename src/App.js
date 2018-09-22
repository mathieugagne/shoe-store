import React, { Component } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'

class App extends Component {
	render() {
		return ( 
			<div>
				<Header />
				<Tabs />
			</div>
		)
	}
}

export default App