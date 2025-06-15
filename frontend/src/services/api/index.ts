import { createAxiosInstance } from './axiosConfig';

const defaultHeader = { 'Content-type': 'application/json' };

const getToken = () => sessionStorage.getItem('near-pay-token');

const authHeader = () => getToken() && `Bearer ${getToken()}`;

// Auth APIs
export const loginAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/login',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values
  });
};

export const registerAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/register',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values
  });
};

// Budget APIs
export const getBudgetsAPI = async (): Promise<any> => {
  return createAxiosInstance({
    url: `/api/budgets`,
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() },
   
  });
};

export const createBudgetAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/budgets',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const updateBudgetAPI = async ( data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/budgets/${data._id}`,
    method: 'PUT',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const deleteBudgetAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/budgets/${data._id}`,
    method: 'DELETE',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

// Expense APIs
export const getExpensesAPI = async (month: string): Promise<any> => {
  return createAxiosInstance({
    url: `/api/expenses?month=${month}`,
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() }
  });
};

export const createExpenseAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/expenses',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const updateExpenseAPI = async (id: string, data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/expenses/${id}`,
    method: 'PUT',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const deleteExpenseAPI = async (id: string): Promise<any> => {
  return createAxiosInstance({
    url: `/api/expenses/${id}`,
    method: 'DELETE',
    headers: { ...defaultHeader, Authorization: authHeader() }
  });
};

// Category APIs
export const getCategoriesAPI = async (): Promise<any> => {
  return createAxiosInstance({
    url: '/api/categories',
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() }
  });
};

export const createCategoryAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/categories',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const updateCategoryAPI = async (data: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/categories/${data._id}`,
    method: 'PUT',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data
  });
};

export const deleteCategoryAPI = async (id: string): Promise<any> => {
  return createAxiosInstance({
    url: `/api/categories/${id}`,
    method: 'DELETE',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: { _id: id }
  });
};

// Report API

export const getMonthlyTrendAPI = async (params: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/reports/monthly-trend`,
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() },
    params
  });
};

export const getCategorySpendingAPI = async (params: any): Promise<any> => {
  return createAxiosInstance({
    url: `/api/reports/category-spending`,
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() },
    params
  });
};





