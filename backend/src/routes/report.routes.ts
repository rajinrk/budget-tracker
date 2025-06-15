import { RequestHandler, Router } from 'express';
import { getMonthlyReport, getExpenseSummary, getCategorySpendingAndBudget } from '../controllers/report.controller';
import { asyncHandler } from '../utils/commonFunctions';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect as RequestHandler);

// Get monthly report
router.get('/monthly-trend', asyncHandler(getMonthlyReport));
router.get('/expense-summary', asyncHandler(getExpenseSummary));
router.get('/category-spending', asyncHandler(getCategorySpendingAndBudget));

export default router; 