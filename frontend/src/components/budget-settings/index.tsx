// src/components/BudgetSettings.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BudgetDialog from '../budgetModal';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgetsData, getBudgetsErrorCode, getBudgetsSuccessCode } from '../../services/redux/selectors';
import { createBudgetRequest, deleteBudgetRequest, fetchBudgetsRequest, fetchCategoriesRequest, resetBudgetState, updateBudgetRequest } from '../../services/redux/slices';
import { useToastMessage } from '../../hooks';



export const BudgetSettings: React.FC = () => {

  const dispatch = useDispatch()
  const errorMsg = useSelector(getBudgetsErrorCode);
  const successMsg = useSelector(getBudgetsSuccessCode);

  const budgets = useSelector(getBudgetsData)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBudget, setEditBudget] = useState<any | null>(null);


  useEffect(() => {
    dispatch(fetchBudgetsRequest());

  }, [dispatch]);

 

  const successFunction = () => {
    if (['BUDGET_CREATED', 'BUDGET_UPDATED','BUDGET_DELETED'].includes(successMsg)) {
      dispatch(fetchBudgetsRequest());

    }
  }

  useToastMessage({ errorMsg, successMsg, successFunction, resetFunction: resetBudgetState })


  const handleAddOrEdit = (data: any) => {
    if (data._id) {
      // Edit
      dispatch(updateBudgetRequest(data))
    } else {
      // Add
      dispatch(createBudgetRequest(data))

    }

    setDialogOpen(false)
  };

  const handleDelete = (_id: any) => {

    const payload: any = { _id }

    if (window.confirm('Are you sure you want to delete this Budget?')) {
      dispatch(deleteBudgetRequest(payload))

    }



  };

  return (
    <Box>
      <Box className='flex justify-between mb-3 flex-col md:flex-row'>
        <Typography variant="h6">Manage Budgets</Typography>
        <Button variant="contained" onClick={() => {
          setEditBudget(null);
          setDialogOpen(true);
        }}>
          Add Budget
        </Button>
      </Box>

     {budgets?.length > 0 ?  <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Monthly Limit (₹)</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { budgets?.map((b: any) => (
            <TableRow key={b._id}>
              <TableCell>{b.categoryId.name}</TableCell>
              <TableCell>₹{b.amount}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    setEditBudget(b);
                    setDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(b._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>:<Typography
      >No Budgets Found</Typography>}

      {/* Dialog for Add/Edit */}
      <BudgetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddOrEdit}
        initialData={editBudget}
      />
    </Box>
  );
};

