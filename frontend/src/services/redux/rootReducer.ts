import { combineReducers } from 'redux';
import { createAction } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import budgetSlice from './slices/budgetSlice';
import categorySlice from './slices/categorySlice';
import reportSlice from './slices/reportSlice';
  
export const logout = createAction('USER_LOGOUT');

const appReducer = combineReducers({
  auth: authSlice,
  budget: budgetSlice,
  category: categorySlice,
  report: reportSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action as never);
  }
  return appReducer(state, action as never);
};

export default rootReducer;
