import type { RootState } from '../store';

export const getAuthLoading = (state: RootState) => state?.auth?.isLoading;
export const getAuthSuccessCode = (state: RootState) => state?.auth?.successCode;
export const getAuthErrorCode = (state: RootState) => state?.auth?.errorCode;
export const getIsAuthenticated = (state: RootState) => state?.auth?.isAuthenticated;
