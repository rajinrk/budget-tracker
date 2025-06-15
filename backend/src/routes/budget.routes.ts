import { RequestHandler, Router } from 'express';
import { getBudgets, createBudget, updateBudget, deleteBudget } from '../controllers/budget.controller';
import { asyncHandler } from '../utils/commonFunctions';
import { protect } from '../middleware/auth.middleware';

const router = Router();


// All routes are protected
router.use(protect as RequestHandler);

// Get all budgets for a month
router.get('/', asyncHandler(getBudgets));

// Create new budget
router.post('/', asyncHandler(createBudget));

// Update budget
router.put('/:id', asyncHandler(updateBudget));

// Delete budget
router.delete('/:id', asyncHandler(deleteBudget));

export default router; 