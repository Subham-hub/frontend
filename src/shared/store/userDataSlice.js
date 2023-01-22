import { createSlice } from '@reduxjs/toolkit'

const userDataSlice = createSlice({
  name: 'Authentication',
  initialState: {
    uid: '',
    sid: '',
    token: '',
  },
  reducers: {
    setData(state, action) {
      const { uid, token, role } = action.payload
      if (role === 'admin')
        sessionStorage.setItem('adminData', JSON.stringify({ uid, token }))
      state.uid = uid
      state.token = token
    },
    setSessionId(state, action) {
      state.sid = action.payload
    },
  },
})

export default userDataSlice.reducer
export const userDataActions = userDataSlice.actions
