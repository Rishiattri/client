import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginRequest(state, action: PayloadAction<{email: string, password: string}>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Signup
    signupRequest(state, action: PayloadAction<{fullName: string, email: string, password: string , confirmPassword: string}>) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state) {
      state.loading = false;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginRequest, loginSuccess, loginFailure,
  signupRequest, signupSuccess, signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;