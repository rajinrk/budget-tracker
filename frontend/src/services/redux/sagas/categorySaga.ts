import { put, takeLatest } from "redux-saga/effects";
import {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  fetchCategorySpendingSuccess,
  fetchCategorySpendingFailure,
  fetchCategorySpendingRequest,
  createExpenseSuccess,
  createExpenseFailure,
  createExpenseRequest,
} from "../slices";
import {
  getCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  getCategorySpendingAPI,
  createExpenseAPI,
} from "../../api";

function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield getCategoriesAPI();
    if (response.data.status === 'success') {
      yield put(fetchCategoriesSuccess(response.data));
    } else {
      yield put(fetchCategoriesFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchCategoriesFailure(error.response.data));
  }
}

function* createCategory(action: any): Generator<any, void, any> {
  try {
    const response = yield createCategoryAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(createCategorySuccess(response.data));
    } else {
      yield put(createCategoryFailure(response.data));
    }
  } catch (error: any) {
    yield put(createCategoryFailure(error.response.data));
  }
}

function* updateCategory(action: any): Generator<any, void, any> {
  try {
    const response = yield updateCategoryAPI( action.payload);
    if (response.data.status === 'success') {
      yield put(updateCategorySuccess(response.data));
    } else {
      yield put(updateCategoryFailure(response.data));
    }
  } catch (error: any) {
    yield put(updateCategoryFailure(error.response.data));
  }
}

function* deleteCategory(action: any): Generator<any, void, any> {
  try {
    const response = yield deleteCategoryAPI(action.payload);
    if (response.data.status === 'success') {
      yield put(deleteCategorySuccess(response.data));
    } else {
      yield put(deleteCategoryFailure(response.data));
    }
  } catch (error: any) {
    yield put(deleteCategoryFailure(error.response.data));
  }
}

function* fetchCategorySpending(action: any): Generator<any, void, any> {
    try {
      const response = yield getCategorySpendingAPI(action.payload);
      
      if (response.data.status === 'success') {
        yield put(fetchCategorySpendingSuccess(response.data));
      } else {
        yield put(fetchCategorySpendingFailure(response.data));
      }
    } catch (error: any) {
      yield put(fetchCategorySpendingFailure(error.response.data));
    }
  }

  function* createExpense(action: any): Generator<any, void, any> {
    try {
      const response = yield createExpenseAPI(action.payload);
      if (response.data.status === 'success') {
        yield put(createExpenseSuccess(response.data));
      } else {
        yield put(createExpenseFailure(response.data));
      }
    } catch (error: any) {
      yield put(createExpenseFailure(error.response.data));
    }
  }

export default function* categorySaga() {
  yield takeLatest(fetchCategoriesRequest.type, fetchCategories);
  yield takeLatest(createCategoryRequest.type, createCategory);
  yield takeLatest(updateCategoryRequest.type, updateCategory);
  yield takeLatest(deleteCategoryRequest.type, deleteCategory);
  yield takeLatest(fetchCategorySpendingRequest.type, fetchCategorySpending);
  yield takeLatest(createExpenseRequest.type, createExpense);


} 