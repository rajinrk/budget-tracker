import { Request, Response } from 'express';
import { Budget } from '../models/budget.models';
import { Category } from '../models/category.models';
import { errorResponse, successResponse } from '../utils/response.utils';
import { format } from 'date-fns';

// Get all budgets for a month
export const getBudgets = async (req: Request, res: Response) => {
  try {

    const budgets = await Budget.find({
      userId: req.user._id,
    }).populate('categoryId');
    return successResponse(res, 'BUDGETS_FETCHED', budgets);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_FETCHING_BUDGETS');
  }
};

// Create new budget
export const createBudget = async (req: Request, res: Response) => {
  try {
    const { categoryId, amount, month } = req.body;
    
   

    // Check if category exists and belongs to user
    const category = await Category.findOne({ _id: categoryId, userId: req.user._id });
    if (!category) {
      return errorResponse(res, 'CATEGORY_NOT_FOUND');
    }

    // Check if budget already exists for this category and month
    const existingBudget = await Budget.findOne({
      userId: req.user._id,
      categoryId,
      month : format(new Date(), 'yyyy-MM') ,
    });

    if (existingBudget) {
      return errorResponse(res, 'BUDGET_EXISTS');
    }

    const budget = new Budget({
      categoryId,
      amount,
      month : format(new Date(), 'yyyy-MM'),
      userId: req.user._id,
    });
    await budget.save();
    return successResponse(res, 'BUDGET_CREATED', budget, 201);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_CREATING_BUDGET');
  }
};

// Update budget
export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { amount,_id, categoryId, } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { _id: _id, userId: req.user._id },
      { amount,categoryId },
      { new: true }
    ).populate('categoryId');
    
    if (!budget) {
      return errorResponse(res, 'BUDGET_NOT_FOUND');
    }
    return successResponse(res, 'BUDGET_UPDATED', budget);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_UPDATING_BUDGET');
  }
};

// Delete budget
export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const budget = await Budget.findOneAndDelete({ _id: req.body._id, userId: req.user._id });
    if (!budget) {
      return errorResponse(res, 'BUDGET_NOT_FOUND');
    }
    return successResponse(res, 'BUDGET_DELETED');
  } catch (error: any) {
    return errorResponse(res, 'ERROR_DELETING_BUDGET');
  }
}; 