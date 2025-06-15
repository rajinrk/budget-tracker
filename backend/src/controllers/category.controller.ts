import { Request, Response } from 'express';
import { Category } from '../models/category.models';
import { errorResponse, successResponse } from '../utils/response.utils';
import mongoose from 'mongoose';

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    return successResponse(res, 'CATEGORIES_FETCHED', categories);
  } catch (error: any) {
    return errorResponse(res, 'ERROR_FETCHING_CATEGORIES', error.message);
  }
};

// Create new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const category = new Category({
      name,
      color,
      userId: req.user._id,
    });
    await category.save();
    return successResponse(res, 'CATEGORY_CREATED', category, 201);
  } catch (error: any) {
    if (error.code === 11000) {
      return errorResponse(res, 'CATEGORY_NAME_EXISTS');
    }
    return errorResponse(res, 'ERROR_CREATING_CATEGORY', error.message);
  }
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const {_id, name, color } = req.body;

    
    const category = await Category.findOneAndUpdate(
      { _id: _id, userId: req.user._id },
      { name, color },
      { new: true }
    );
    if (!category) {
      return errorResponse(res, 'CATEGORY_NOT_FOUND');
    }
    return successResponse(res, 'CATEGORY_UPDATED', category);
  } catch (error: any) {
    if (error.code === 11000) {
      return errorResponse(res, 'CATEGORY_NAME_EXISTS');
    }
    return errorResponse(res, 'ERROR_UPDATING_CATEGORY');
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const category = await Category.findOneAndDelete({ _id: _id, userId: req.user._id });
    if (!category) {
      return errorResponse(res, 'CATEGORY_NOT_FOUND');
    }
    return successResponse(res, 'CATEGORY_DELETED');
  } catch (error: any) {
    return errorResponse(res, 'ERROR_DELETING_CATEGORY');
  }
}; 