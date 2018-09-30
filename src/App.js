import React, { Component } from 'react'

import { AppProvider } from './context'
import Header from './components/Header/Header'
import Tabs from './components/Shops/Tabs'

import { stores } from './static/stores'

class App extends Component {
  render () {
    return (
      <AppProvider>
        <Header />
        <Tabs stores={stores} />
      </AppProvider>
    )
  }
}

export default App
