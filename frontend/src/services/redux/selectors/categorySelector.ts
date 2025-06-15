import type { RootState } from '../store';

export const getCategoriesData = (state: RootState) => state?.category?.data;
export const getCategoriesLoading = (state: RootState) => state?.category?.isLoading;
export const getCategoriesSuccessCode = (state: RootState) => state?.category?.successCode;
export const getCategoriesErrorCode = (state: RootState) => state?.category?.errorCode;
export const getCategorySpendingData = (state: RootState) => state?.category?.categorySpending;
export const getSelectedMonth = (state: RootState) => state?.category?.selectedMonth; 
