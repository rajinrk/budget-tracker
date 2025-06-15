import { put, takeLatest } from "redux-saga/effects";
import {
  fetchReportRequest,
  fetchReportSuccess,
  fetchReportFailure,
  fetchExpenseSummaryRequest,
  fetchExpenseSummarySuccess,
  fetchExpenseSummaryFailure,
  fetchMonthlyTrendRequest,
  fetchMonthlyTrendSuccess,
  fetchMonthlyTrendFailure,
} from "../slices";
import {
  getMonthlyReportAPI,
  getExpenseSummaryAPI,
  getMonthlyTrendAPI,
} from "../../api";

function* fetchReport(action: any): Generator<any, void, any> {
  try {
    const response = yield getMonthlyReportAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(fetchReportSuccess(response.data));
    } else {
      yield put(fetchReportFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchReportFailure(error.response.data));
  }
}

function* fetchExpenseSummary(action: any): Generator<any, void, any> {
  try {
    const response = yield getExpenseSummaryAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(fetchExpenseSummarySuccess(response.data));
    } else {
      yield put(fetchExpenseSummaryFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchExpenseSummaryFailure(error.response.data));
  }
}

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
  yield takeLatest(fetchReportRequest.type, fetchReport);
  yield takeLatest(fetchExpenseSummaryRequest.type, fetchExpenseSummary);
  yield takeLatest(fetchMonthlyTrendRequest.type, fetchMonthlyTrend);
} 