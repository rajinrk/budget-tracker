import { put, takeLatest } from "redux-saga/effects";
import {
  fetchBudgetsRequest,
  fetchBudgetsSuccess,
  fetchBudgetsFailure,
  createBudgetRequest,
  createBudgetSuccess,
  createBudgetFailure,
  updateBudgetRequest,
  updateBudgetSuccess,
  updateBudgetFailure,
  deleteBudgetRequest,
  deleteBudgetSuccess,
  deleteBudgetFailure,
} from "../slices";
import {
  getBudgetsAPI,
  createBudgetAPI,
  updateBudgetAPI,
  deleteBudgetAPI,
} from "../../api";

function* fetchBudgets(): Generator<any, void, any> {
  try {
    const response = yield getBudgetsAPI();
    if (response.data.status === 'success') {
      yield put(fetchBudgetsSuccess(response.data));
    } else {
      yield put(fetchBudgetsFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchBudgetsFailure(error.response.data));
  }
}

function* createBudget(action: any): Generator<any, void, any> {
  try {
    const response = yield createBudgetAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(createBudgetSuccess(response.data));
    } else {
      yield put(createBudgetFailure(response.data));
    }
  } catch (error: any) {
    yield put(createBudgetFailure(error.response.data));
  }
}

function* updateBudget(action: any): Generator<any, void, any> {
  try {
    const response = yield updateBudgetAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(updateBudgetSuccess(response.data));
    } else {
      yield put(updateBudgetFailure(response.data));
    }
  } catch (error: any) {
    yield put(updateBudgetFailure(error.response.data));
  }
}

function* deleteBudget(action: any): Generator<any, void, any> {
  try {
    const response = yield deleteBudgetAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(deleteBudgetSuccess(response.data));
    } else {
      yield put(deleteBudgetFailure(response.data));
    }
  } catch (error: any) {
    yield put(deleteBudgetFailure(error.response.data));
  }
}

export default function* budgetSaga() {
  yield takeLatest(fetchBudgetsRequest.type, fetchBudgets);
  yield takeLatest(createBudgetRequest.type, createBudget);
  yield takeLatest(updateBudgetRequest.type, updateBudget);
  yield takeLatest(deleteBudgetRequest.type, deleteBudget);
} 