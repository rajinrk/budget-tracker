export interface Category {
  _id: string;
  name: string;
  color?: string;
}

export interface CreateCategoryPayload {
  name: string;
  color?: string;
}

export interface UpdateCategoryPayload {
  _id: string;
  name: string;
  color?: string;
} 