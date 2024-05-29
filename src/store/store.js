import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import cartReducer from './cartSlice.js'


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  }
})
