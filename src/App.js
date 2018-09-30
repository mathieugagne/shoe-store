import React, { Component } from 'react'

import { AppProvider, AppConsumer } from './context'
import Header from './components/Header/Header'
import Tabs from './components/Shops/Tabs'

class App extends Component {
  render () {
    return (
      <AppProvider>
        <Header />
        <AppConsumer>
          { context => <Tabs stores={context.stores} /> }
        </AppConsumer>
      </AppProvider>
    )
  }
}

export default App
