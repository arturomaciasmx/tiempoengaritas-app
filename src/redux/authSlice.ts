import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    errors: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setErrors(state, action) {
      state.errors = action.payload
      console.log("state",state.errors);
    }
  }
});

export const { setUser } = authSlice.actions;
export const { setErrors } = authSlice.actions;
export const user = (state) => state.auth.user;
export const authError = (state) => state.auth.error;

export default authSlice.reducer;