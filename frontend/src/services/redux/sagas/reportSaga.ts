import { put, takeLatest } from "redux-saga/effects";
import {
  fetchMonthlyTrendRequest,
  fetchMonthlyTrendSuccess,
  fetchMonthlyTrendFailure,
} from "../slices";
import {
  getMonthlyTrendAPI,
} from "../../api";





function* fetchMonthlyTrend(action: any): Generator<any, void, any> {
  try {
    const response = yield getMonthlyTrendAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(fetchMonthlyTrendSuccess(response.data));
    } else {
      yield put(fetchMonthlyTrendFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchMonthlyTrendFailure(error.response.data));
  }
}

export default function* reportSaga() {
  yield takeLatest(fetchMonthlyTrendRequest.type, fetchMonthlyTrend);
} 