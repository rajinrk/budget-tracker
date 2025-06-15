import type { RootState } from '../store';

export const getReportData = (state: RootState) => state?.report?.data;
export const getReportLoading = (state: RootState) => state?.report?.isLoading;
export const getReportSuccessCode = (state: RootState) => state?.report?.successCode;
export const getReportErrorCode = (state: RootState) => state?.report?.errorCode; 