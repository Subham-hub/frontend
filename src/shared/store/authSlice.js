import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "Authentication",
  initialState: {
    isLoggedIn: false,
    isAdmin: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      if (action.payload === "admin") state.isAdmin = true;
    },
    logout(state) {
      sessionStorage.clear();
      state.isAdmin = false;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
