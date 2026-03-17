import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: string | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      void action.payload;
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signupRequest: (state, action: PayloadAction<SignupPayload>) => {
      void action.payload;
      state.loading = true;
      state.error = null;
    },

    signupSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export default authSlice.reducer;
