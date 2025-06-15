import { createSlice } from '@reduxjs/toolkit';

interface BudgetState {
  data: any[] | null;
  loading: boolean;
  successCode: string | null;
  errorCode: string | null;
  selectedMonth: string;
}

const initialState: BudgetState = {
  data: null,
  loading: false,
  successCode: null,
  errorCode: null,
  selectedMonth: new Date().toISOString().slice(0, 7)
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    fetchBudgetsRequest: (state) => {
      state.loading = true;
      state.errorCode = null;
      
    },
    fetchBudgetsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    fetchBudgetsFailure: (state, action) => {
      state.loading = false;
      state.errorCode = action.payload.status_code;
    },
    createBudgetRequest: (state) => {
      state.loading = true;
      state.errorCode = null;
    },
    createBudgetSuccess: (state, action) => {
      state.loading = false;
      state.successCode = action.payload.status_code;
    },
    createBudgetFailure: (state, action) => {
      state.loading = false;
      state.errorCode = action.payload.status_code;
  
    },
    updateBudgetRequest: (state) => {
      state.loading = true;
      state.errorCode = null;
    },
    updateBudgetSuccess: (state, action) => {
      state.loading = false;
      state.successCode = action.payload.status_code;
    },
    updateBudgetFailure: (state, action) => {
      state.loading = false;
      state.errorCode = action.payload.status_code;
    },
    deleteBudgetRequest: (state,action:any) => {
      state.loading = true;
      state.errorCode = null;
    },
    deleteBudgetSuccess: (state, action) => {
      state.loading = false;
    
      state.successCode = action.payload.status_code;
    },
    deleteBudgetFailure: (state, action) => {
      state.loading = false;
      state.errorCode = action.payload.status_code;
    },
    resetBudgetState: (state) => {
      state.successCode = null;
      state.errorCode = null;
    }
  },
});

export const {
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
  resetBudgetState,
} = budgetSlice.actions;

export default budgetSlice.reducer; 