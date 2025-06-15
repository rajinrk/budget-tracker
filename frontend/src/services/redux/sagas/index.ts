import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import categorySaga from './categorySaga';
import budgetSaga from './budgetSaga';
import reportSaga from './reportSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    budgetSaga(),
    reportSaga()
  ]);
}
