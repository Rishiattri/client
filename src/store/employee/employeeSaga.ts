import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeFailure,
  getEmployeesRequest,
  getEmployeesSuccess,
  getEmployeesFailure
} from "./employeeSlice";

const API = "http://localhost:3001/api/employees";


// ADD EMPLOYEE
function* addEmployee(action: any): any {

  try {

    yield call(axios.post, `${API}/add`, action.payload);

    yield put(addEmployeeSuccess());

  } catch (error: any) {

    yield put(addEmployeeFailure(error.message));

  }

}


// GET EMPLOYEES
function* getEmployees(): any {

  try {

    const res = yield call(axios.get, API);

    yield put(getEmployeesSuccess(res.data));

  } catch (error: any) {

    yield put(getEmployeesFailure(error.message));

  }

}

export default function* employeeSaga() {

  yield takeLatest(addEmployeeRequest.type, addEmployee);

  yield takeLatest(getEmployeesRequest.type, getEmployees);

}