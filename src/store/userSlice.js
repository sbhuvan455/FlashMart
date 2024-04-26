import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
        state.loading = true;
    },
    signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
})


export const { 
  signInStart, 
  signInSuccess, 
  signInFailure, 
  signOut, 
  updateStart, 
  updateSuccess, 
  updateFailure
} = userSlice.actions

export default userSlice.reducer