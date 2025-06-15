import { Request, Response } from 'express';
import { Budget } from '../models/budget.models';
import { Expense } from '../models/expense.models';
import { startOfMonth, endOfMonth } from 'date-fns';
import { errorResponse, successResponse } from '../utils/response.utils';
import { Document, Types } from 'mongoose';

interface ICategory {
  _id: Types.ObjectId;
  name: string;
  color: string;
}

interface IBudget {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId | ICategory;
  amount: number;
  month: string;
}

interface IExpense {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  categoryId: Types.ObjectId | ICategory;
  amount: number;
  date: Date;
  description: string;
}

type PopulatedBudget = Document<unknown, {}, IBudget> & IBudget;
type PopulatedExpense = Document<unknown, {}, IExpense> & IExpense;

// Get monthly report with combined data
export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const { month } = req.query;
    if (!month || typeof month !== 'string' || !/^\d{4}-\d{2}$/.test(month)) {
      return errorResponse(res, 'INVALID_MONTH_FORMAT', 'Invalid month format. Use YYYY-MM');
    }

    const [year, monthNum] = month.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, monthNum - 1));
    const endDate = endOfMonth(new Date(year, monthNum - 1));

    // Get all budgets for the month
    const budgets = await Budget.find({
      userId: req.user._id,
      month,
    }).populate('categoryId');

    // Get all expenses for the month
    const expenses = await Expense.find({
      userId: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate('categoryId');

    // Calculate totals and create report
    const report = budgets.map(budget => {
      const categoryExpenses = expenses.filter(
        expense => expense.categoryId._id.toString() === budget.categoryId._id.toString()
      );
      
      const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const remaining = Math.max(budget.amount - spent, 0);
      const isOverBudget = spent > budget.amount;

      return {
        category: budget.categoryId,
        budget: budget.amount,
        spent,
        remaining,
        isOverBudget,
        expenses: categoryExpenses,
      };
    });

    // Add categories with no budget
    const budgetedCategoryIds = budgets.map(b => b.categoryId._id.toString());
    const unbudgetedExpenses = expenses.filter(
      expense => !budgetedCategoryIds.includes(expense.categoryId._id.toString())
    );

    const unbudgetedCategories = [...new Set(unbudgetedExpenses.map(e => e.categoryId._id.toString()))]
      .map(categoryId => {
        const categoryExpenses = unbudgetedExpenses.filter(
          e => e.categoryId._id.toString() === categoryId
        );
        const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);

        return {
          category: categoryExpenses[0].categoryId,
          budget: 0,
          spent,
          remaining: 0,
          isOverBudget: false,
          expenses: categoryExpenses,
        };
      });

    const reportData = {
      month,
      totalBudget: budgets.reduce((sum, b) => sum + b.amount, 0),
      totalSpent: expenses.reduce((sum, e) => sum + e.amount, 0),
      categories: [...report, ...unbudgetedCategories],
    };

    return successResponse(res, 'REPORT_GENERATED', reportData);
  } catch (error:any) {
    return errorResponse(res, 'ERROR_GENERATING_REPORT', error.message);
  }
};



// Get monthly expense trend
export const getMonthlyTrend = async (req: Request, res: Response) => {
  try {
    const { year } = req.query;
    const query: any = { userId: req.user._id };
    
    if (year) {
      query.date = {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31`)
      };
    }

    const monthlyExpenses = await Expense.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return successResponse(res, 'MONTHLY_TREND_FETCHED', monthlyExpenses);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_FETCHING_MONTHLY_TREND', error.message);
  }
};

// Get category-wise spending and budget data
export const getCategorySpendingAndBudget = async (req: Request, res: Response) => {
  try {
    const { month } = req.query;

    
    if (!month || typeof month !== 'string' || !/^\d{4}-\d{2}$/.test(month)) {
      return errorResponse(res, 'INVALID_MONTH_FORMAT', 'Invalid month format. Use YYYY-MM');
    }

    const [year, monthNum] = month.split('-').map(Number);
    const startDate = startOfMonth(new Date(year, monthNum - 1));
    const endDate = endOfMonth(new Date(year, monthNum - 1));

    // Get all budgets for the month
    const budgets = (await Budget.find({
      userId: req.user._id,
      month,
    }).populate('categoryId').exec()) as unknown as PopulatedBudget[];

    // Get all expenses for the month
    const expenses = (await Expense.find({
      userId: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).populate('categoryId').exec()) as unknown as PopulatedExpense[];

    // Create category-wise data
    const categoryData = budgets.map(budget => {
      const categoryExpenses = expenses.filter(
        expense => expense.categoryId._id.toString() === budget.categoryId._id.toString()
      );
      
      const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const category = budget.categoryId as ICategory;

      return {
        id: category._id,
        name: category.name,
        color: category.color,
        spent,
        limit: budget.amount
      };
    });

    // Add categories with expenses but no budget
    const budgetedCategoryIds = budgets.map(b => b.categoryId._id.toString());
    const unbudgetedExpenses = expenses.filter(
      expense => !budgetedCategoryIds.includes(expense.categoryId._id.toString())
    );

    const unbudgetedCategories = [...new Set(unbudgetedExpenses.map(e => e.categoryId._id.toString()))]
      .map(categoryId => {
        const categoryExpenses = unbudgetedExpenses.filter(
          e => e.categoryId._id.toString() === categoryId
        );
        const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        const category = categoryExpenses[0].categoryId as ICategory;

        return {
          id: category._id,
          name: category.name,
          color: category.color,
          spent,
          limit: 0
        };
      });

    const response = [...categoryData, ...unbudgetedCategories];

    return successResponse(res, 'CATEGORY_SPENDING_FETCHED', response);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_FETCHING_CATEGORY_SPENDING', error.message);
  }
}; 