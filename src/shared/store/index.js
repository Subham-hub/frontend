import { configureStore } from '@reduxjs/toolkit'

import auth from './authSlice'
import userData from './userDataSlice'

const store = configureStore({
  reducer: { auth, userData },
})

export default store
