"use client"
import React from 'react'
import { store } from './store.js'
import { Provider } from 'react-redux'

function storeProvider({children}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default storeProvider
