import React, { Component } from 'react'
import { AppProvider } from './context'
import Header from './components/Header'
import Tabs from './components/Tabs'

class App extends Component {
	render() {
		return ( 
			<AppProvider>
				<Header />
				<Tabs />
			</AppProvider>
		)
	}
}

export default App