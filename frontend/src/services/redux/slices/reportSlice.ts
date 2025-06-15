import { createSlice } from '@reduxjs/toolkit';

interface ReportData {
  month: string;
  totalBudget: number;
  totalSpent: number;
  categories: {
    category: {
      _id: string;
      name: string;
      color: string;
    };
    budget: number;
    spent: number;
    remaining: number;
    isOverBudget: boolean;
    expenses: any[];
  }[];
}

interface ReportState {
  data: ReportData | null;
  isLoading: boolean;
  successCode: string | null;
  errorCode: string | null;
}

const initialState: ReportState = {
  data: null,
  isLoading: false,
  successCode: null,
  errorCode: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    resetReportStatus(state) {
      state.isLoading = false;
      state.successCode = null;
      state.errorCode = null;
    },


    fetchMonthlyTrendRequest(state) {
      state.isLoading = true;
      state.successCode = null;
      state.errorCode = null;
    },

    fetchMonthlyTrendSuccess(state, action) {
      state.isLoading = false;
      state.successCode = action.payload.status_code;
      state.data = action.payload.data;
      state.errorCode = null;
    },

    fetchMonthlyTrendFailure(state, action) {
      state.isLoading = false;
      state.errorCode = action.payload.status_code;
      state.successCode = null;
    },
  },
});

export const {
  resetReportStatus,
  fetchMonthlyTrendRequest,
  fetchMonthlyTrendSuccess,
  fetchMonthlyTrendFailure,
} = reportSlice.actions;

export default reportSlice.reducer; 