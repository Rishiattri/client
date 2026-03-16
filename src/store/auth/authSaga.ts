import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest, loginSuccess, loginFailure,
  signupRequest, signupSuccess, signupFailure,
} from "./authSlice";

const API_URL = "http://localhost:3001/api";

// ── Login Saga ──
function* handleLogin(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const res: any = yield call(axios.post, `${API_URL}/login`, action.payload);
    yield put(loginSuccess(res.data.email));
  } catch (err: any) {
    yield put(loginFailure(err.response?.data?.message || "Login failed"));
  }
}

// ── Signup Saga ──
function* handleSignup(action: ReturnType<typeof signupRequest>): Generator {
  try {
    yield call(axios.post, `${API_URL}/signup`, action.payload);
     yield put(signupSuccess(action.payload));
  } catch (err: any) {
    yield put(signupFailure(err.response?.data?.message || "Signup failed"));
  }
}

// ── Watcher ──
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}