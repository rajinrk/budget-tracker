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
import { useSelector, useDispatch } from 'react-redux';
import { getCategoriesData } from '../../services/redux/selectors';
import type { Category } from '../../types/category';
import { useFormik } from 'formik';
import { createExpenseRequest } from '../../services/redux/slices';

interface AddExpenseFormProps {
    open: boolean;
    onClose: () => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategoriesData);

    const formik = useFormik({
        initialValues: {
            categoryId: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        },
        onSubmit: (values) => {
            dispatch(createExpenseRequest({
                ...values,
                amount: Number(values.amount),
            } as any));
            onClose();
            formik.resetForm();
        },
    });

    const handleSelectChange = (e: SelectChangeEvent) => {
        formik.setFieldValue('categoryId', e.target.value);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal">
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
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        fullWidth
                        margin="normal"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button 
                        variant="contained" 
                        type="submit"
                        disabled={!formik.values.categoryId || !formik.values.amount || !formik.values.description}
                    >
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};


