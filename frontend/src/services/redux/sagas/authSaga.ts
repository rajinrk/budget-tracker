

import { put, takeLatest } from "redux-saga/effects";
import { loginFailure, loginRequest, loginSuccess, registerFailure, registerRequest, registerSuccess } from "../slices";
import { loginAPI, registerAPI } from "../../api";

function* login(action: any): Generator<any, void, any> {
  try {
    const response = yield loginAPI(action.payload );

    
    if (response.data.status === 'success') {
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFailure(response.data));
    }
  } catch (error: any) {
    yield put(loginFailure(error.response.data));
  }
}

function* register(action: any): Generator<any, void, any> {
  try {
    const response = yield registerAPI(action.payload );

    
    if (response.data.status === 'success') {
      yield put(registerSuccess(response.data));
    } else {
      yield put(registerFailure(response.data));
    }
  } catch (error: any) {
    yield put(registerFailure(error.response.data));
  }
}
export default function* authSagaSaga() {
  yield takeLatest(loginRequest.type, login);
  yield takeLatest(registerRequest.type, register);
}
