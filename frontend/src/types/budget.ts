export interface Budget {
  _id: string;
  categoryId: string;
  amount: number;
  month: string; // Format: YYYY-MM
  category?: {
    _id: string;
    name: string;
    color: string;
  };
}

export interface CreateBudgetPayload {
  categoryId: string;
  amount: number;
  month: string;
}

export interface UpdateBudgetPayload {
  _id: string;
  categoryId: string;
  amount: number;
  month: string;
} 