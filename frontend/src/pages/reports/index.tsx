import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyTrendRequest, resetReportStatus } from '../../services/redux/slices';
import { getReportData, getReportErrorCode, getReportSuccessCode } from '../../services/redux/selectors';
import { useToastMessage } from '../../hooks';



const ReportsPage: React.FC = () => {
  const dispatch = useDispatch()


  const errorMsg = useSelector(getReportErrorCode);
  const successMsg = useSelector(getReportSuccessCode);
  const reports = useSelector(getReportData);

  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));


  useEffect(() => {
    handleGetReport(selectedMonth)
  }, [dispatch]);



  useToastMessage({ errorMsg, successMsg, resetFunction: resetReportStatus })

  const handleGetReport = (val?:any) => {
    const payload: any = { month: val }
    dispatch(fetchMonthlyTrendRequest(payload));

  }
  const getRemaining = (budget: number, spent: number) => {
    return budget - spent;
  };

  const getMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = dayjs().month(i);
      return {
        value: month.format('YYYY-MM'),
        label: month.format('MMMM YYYY'),
      };
    });
  };

  const handleMonthChange = (val: any) => {
    setSelectedMonth(val)
    handleGetReport(val)
  }

  return (
    <Box className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-10 px-4">
      <Paper
        elevation={3}
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ px: 3, pt: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Monthly Report
          </Typography>

          <FormControl sx={{ minWidth: 200, mt: 2 }} size="small">
            <InputLabel id="month-label">Select Month</InputLabel>
            <Select
              labelId="month-label"
              value={selectedMonth}
              label="Select Month"
              onChange={(e) => handleMonthChange(e.target.value)}
            >
              {getMonthOptions().map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {reports?.categories?.length > 0 ? <Box sx={{ p: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Budget (₹)</TableCell>
                <TableCell>Spent (₹)</TableCell>
                <TableCell>Remaining (₹)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports?.categories?.map((row: any) => {
                const remaining = getRemaining(row.budget, row.spent);
                return (
                  <TableRow key={row._id}>
                    <TableCell>{row?.category?.name}</TableCell>
                    <TableCell>{row?.budget}</TableCell>
                    <TableCell>{row?.spent}</TableCell>
                    <TableCell
                      sx={{
                        color: remaining < 0 ? 'error.main' : 'success.main',
                        fontWeight: 600,
                      }}
                    >
                      {remaining}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box> : <div className='w-full min-h-[60vh] flex items-center justify-center'> <Typography className='text-[26px]'>No Items Found</Typography> </div>}
      </Paper>
    </Box>
  );
};

export default ReportsPage;
