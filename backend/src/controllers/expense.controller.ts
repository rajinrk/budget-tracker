import { Request, Response } from 'express';
import { Expense } from '../models/expense.models';
import { Category } from '../models/category.models';
import { errorResponse, successResponse } from '../utils/response.utils';



// Create new expense
export const createExpense = async (req: Request, res: Response) => {
  try {
    const { categoryId, amount, date, description } = req.body;

    // Check if category exists and belongs to user
    const category = await Category.findOne({ _id: categoryId, userId: req.user._id });
    if (!category) {
      return errorResponse(res, 'CATEGORY_NOT_FOUND',);
    }

    const expense = new Expense({
      categoryId,
      amount,
      date,
      description,
      userId: req.user._id,
    });
    await expense.save();
    return successResponse(res, 'EXPENSE_CREATED');
  } catch (error: any) {
    return errorResponse(res, 'ERROR_CREATING_EXPENSE');
  }
};

