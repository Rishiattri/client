import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "./authSlice";
import type { LoginPayload, SignupPayload } from "./authTypes";

const API_URL = "http://localhost:3001/api";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Request failed";
}

function* handleLogin(action: { payload: LoginPayload }): Generator {
  try {
    const res = (yield call(axios.post, `${API_URL}/login`, action.payload)) as {
      data: { email: string };
    };
    yield put(loginSuccess(res.data.email));
  } catch (error) {
    yield put(loginFailure(getErrorMessage(error)));
  }
}

function* handleSignup(action: { payload: SignupPayload }): Generator {
  try {
    yield call(axios.post, `${API_URL}/signup`, action.payload);
    yield put(signupSuccess(action.payload.email));
  } catch (error) {
    yield put(signupFailure(getErrorMessage(error)));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}
