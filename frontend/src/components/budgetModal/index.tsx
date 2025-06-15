import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { getCategoriesData } from '../../services/redux/selectors';
import type { Category } from '../../types/category';
import { useFormik } from 'formik';

interface BudgetDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { _id?: string; categoryId: string; amount: string }) => void;
  initialData?: any;
}



const BudgetDialog: React.FC<BudgetDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const categories = useSelector(getCategoriesData);

  const formik = useFormik({
    initialValues: {
      categoryId: initialData?.categoryId?._id || '',
      amount: initialData?.amount || '',
    },
    onSubmit: (values) => {
      onSubmit({ ...values, _id: initialData?._id });
      onClose();
      formik.resetForm();

    },
  });

 
  

  useEffect(() => {
    if (initialData) {
      formik.setValues({
        categoryId: initialData.categoryId?._id,
        amount: initialData.amount,
      });
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  const handleSelectChange = (e: SelectChangeEvent) => {
    formik.setFieldValue('categoryId', e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{initialData ? 'Edit Budget' : 'Add Budget'}</DialogTitle>
        <DialogContent dividers>
          <FormControl 
            fullWidth 
            margin="normal"
            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              name="categoryId"
              value={formik.values.categoryId}
              label="Category"
              onChange={handleSelectChange}
            >
              {categories?.map((category: Category) => (
                <MenuItem key={category._id} value={category._id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: category.color,
                      }}
                    />
                    {category.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
           
          </FormControl>
          <TextField
            label="Amount (₹)"
            name="amount"
            fullWidth
            margin="normal"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            variant="contained" 
            type="submit"
            disabled={!formik.isValid}
          >
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BudgetDialog;
