import { RequestHandler, Router } from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { asyncHandler } from '../utils/commonFunctions';
import {  protect } from '../middleware/auth.middleware';

const router = Router();

// All routes are protected
router.use(protect as RequestHandler);

// Get all categories
router.get('/', asyncHandler(getCategories));

// Create new category
router.post('/', asyncHandler(createCategory));

// Update category
router.put('/:id', asyncHandler(updateCategory));

// Delete category
router.delete('/:id', asyncHandler(deleteCategory));

export default router; 