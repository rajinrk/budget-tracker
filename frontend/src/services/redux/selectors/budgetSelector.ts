import type { RootState } from '../store';

export const getBudgetsData = (state: RootState) => state.budget.data;
export const getBudgetsLoading = (state: RootState) => state.budget.loading;
export const getBudgetsSuccessCode = (state: RootState) => state.budget.successCode;
export const getBudgetsErrorCode = (state: RootState) => state.budget.errorCode;