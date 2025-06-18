// src/components/CategorySettings.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { AddCategoryDialog } from '../add-category';
import {
  fetchCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
  resetCategoryState,
} from '../../services/redux/slices/categorySlice';
import {
  getCategoriesData,
  getCategoriesErrorCode,
  getCategoriesSuccessCode,
} from '../../services/redux/selectors/categorySelector';
import type { Category } from '../../types/category.ts';
import { useToastMessage } from '../../hooks/index.ts';

export const CategoriesSettings: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategoriesData);
  const errorMsg = useSelector(getCategoriesErrorCode);
  const successMsg = useSelector(getCategoriesSuccessCode);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  const successFunction = () => {
    if (['CATEGORY_CREATED', 'CATEGORY_UPDATED', 'CATEGORY_DELETED'].includes(successMsg)) {
      dispatch(fetchCategoriesRequest());
    }
  };

  useToastMessage({ errorMsg, successMsg, successFunction, resetFunction: resetCategoryState });

  const handleAdd = (data: { name: string; color?: string }) => {
    dispatch(createCategoryRequest(data as any));
  };

  const handleUpdate = (data: any) => {
    dispatch(updateCategoryRequest(data));
  };

  const handleDelete = (_id: any) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategoryRequest(_id));
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  return (
    <Box>
      <Box className="flex justify-between mb-3 flex-col md:flex-row">
        <Typography variant="h5">Categories</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Category
        </Button>
      </Box>

      {categories?.length > 0 ? (
        <TableContainer component={Paper} sx={{ p: { xs: 1, sm: 3 }, overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category: Category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <div
                      className="w-[15px] h-[15px] rounded-[20px]"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(category)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(category._id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No Categories Found</Typography>
      )}

      <AddCategoryDialog
        open={open}
        onClose={handleClose}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingCategory={editingCategory}
      />
    </Box>
  );
};

export default CategoriesSettings;
