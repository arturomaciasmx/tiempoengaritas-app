import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null
  },
  reducers: {
    setUser(state, action) {
      // console.log(action.payload);
      state.user = action.payload
      // console.log(state.user);
    }
  }
});

export const { setUser } = authSlice.actions;
export const user = (state) => state.auth.user;

export default authSlice.reducer;