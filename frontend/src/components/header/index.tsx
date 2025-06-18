import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { AuthHeader } from '../auth-header';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../services/redux/store';
import {
  fetchCategorySpendingRequest,
  logout,
  setSelectedMonth,
} from '../../services/redux/slices';
import { getSelectedMonth } from '../../services/redux/selectors';
import dayjs from 'dayjs';

interface NavLinksProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAuthenticated, onLogout }) => {
  if (isAuthenticated) {
    return <AuthHeader logout={onLogout} />;
  }
};

interface HeaderProps {
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const dispatch = useDispatch();

  const selectedMonth = useSelector(getSelectedMonth);

  const [pathName, setPathname] = useState<string>('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    store.dispatch({ type: 'USER_LOGOUT' });
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

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMonth = event.target.value;
    dispatch(setSelectedMonth(newMonth));
    dispatch(fetchCategorySpendingRequest({ month: newMonth } as any));
  };

  return (
    <div className="w-full">
      <AppBar position="static">
        <Toolbar className="justify-between bg-white">
          <Typography variant="h6" fontWeight="bold" className="text-black">
            Budget Tracker
          </Typography>
          <div className="space-x-2">
            <NavLinks isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          </div>
        </Toolbar>
      </AppBar>
      {pathName === '/dashboard' && (
        <FormControl
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'black',
            borderRadius: 1,
            border: '1px solid #e0e0e0',
            minWidth: 180,
          }}
          className="block md:hidden"
        >
          <Select className="text-white" value={selectedMonth} onChange={handleMonthChange}>
            <MenuItem value="">Select Month</MenuItem>
            {getMonthOptions().map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
