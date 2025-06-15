import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    data: any[] | null;
    loading: boolean;
    successCode: string | null;
    errorCode: string | null;
    selectedMonth: string;
    categorySpending: any[] | null;
}

const initialState: CategoryState = {
    data: null,
    loading: false,
    successCode: null,
    errorCode: null,
    selectedMonth: new Date().toISOString().slice(0, 7),
    categorySpending: null
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchCategoriesRequest: (state) => {
            state.loading = true;
            state.errorCode = null;
            state.successCode = null;
        },
        fetchCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload.data
        },
        fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.errorCode = action.payload;
        },
        createCategoryRequest: (state, action) => {
            state.loading = true;
            state.errorCode = null;
            state.successCode = null;
        },
        createCategorySuccess: (state, action) => {
            state.loading = false;
            state.data = state.data ? [...state.data, action.payload] : [action.payload];
            state.successCode = action.payload.status_code;
        },
        createCategoryFailure: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload;
        },
        updateCategoryRequest: (state, action: any) => {
            state.loading = true;
            state.errorCode = null;
            state.successCode = null;
        },
        updateCategorySuccess: (state, action) => {
            state.loading = false;
            state.successCode = action.payload.status_code;
        },
        updateCategoryFailure: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload.status_code;
        },
        deleteCategoryRequest: (state, action: any) => {
            state.loading = true;
            state.errorCode = null;
            state.successCode = null;
        },
        deleteCategorySuccess: (state, action) => {
            state.loading = false;
            state.successCode = action.payload.status_code;
        },
        deleteCategoryFailure: (state, action) => {
            state.loading = false;
            state.errorCode = action.payload.status_code;
        },
        resetCategoryState: (state) => {
            state.loading = false;
            state.errorCode = null;
            state.successCode = null;
        },
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload;
        },
        fetchCategorySpendingRequest(state) {
            state.loading = true;
            state.successCode = null;
            state.errorCode = null;
        },

        fetchCategorySpendingSuccess(state, action) {
            state.loading = false;
            state.categorySpending = action.payload.data;
            state.errorCode = null;
        },

        fetchCategorySpendingFailure(state, action) {
            state.loading = false;
            state.errorCode = action.payload.status_code;
            state.successCode = null;
        },

        createExpenseRequest(state) {
            state.loading = true;
            state.successCode = null;
            state.errorCode = null;
        },

        createExpenseSuccess(state, action) {
            state.loading = false;
            state.successCode = action.payload.status_code;
            state.errorCode = null;
        },

        createExpenseFailure(state, action) {
            state.loading = false;
            state.errorCode = action.payload.status_code;
            state.successCode = null;
        },
    }
});

export const {
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
    resetCategoryState,
    setSelectedMonth,
    fetchCategorySpendingRequest,
    fetchCategorySpendingSuccess,
    fetchCategorySpendingFailure,
    createExpenseRequest,
    createExpenseSuccess,
    createExpenseFailure,
} = categorySlice.actions;

export default categorySlice.reducer; 