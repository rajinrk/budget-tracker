import { RequestHandler, Router } from 'express';
import { createExpense } from '../controllers/expense.controller';
import { asyncHandler } from '../utils/commonFunctions';
import {  protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect as RequestHandler);



// Create new expense
router.post('/', asyncHandler(createExpense));



export default router; 