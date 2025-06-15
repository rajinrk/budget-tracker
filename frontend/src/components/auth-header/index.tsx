import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    IconButton,
    Menu,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedMonth } from '../../services/redux/selectors';
import { fetchCategorySpendingRequest, setSelectedMonth } from '../../services/redux/slices';

interface AuthHeaderProps {
    logout: () => void;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ logout }) => {
    const selectedMonth = useSelector(getSelectedMonth);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuAction = (action: { label: string; path?: string; onClick?: () => void }) => {
        if (action.onClick) action.onClick();
        if (action.path) navigate(action.path);
        handleMenuClose();
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMonth = event.target.value;
        dispatch(setSelectedMonth(newMonth));
        dispatch(fetchCategorySpendingRequest({ month: newMonth } as any));
    };

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon fontSize="small" /> },
        { label: 'Settings', path: '/settings', icon: <SettingsIcon fontSize="small" /> },
        { label: 'Reports', path: '/reports', icon: <BarChartIcon fontSize="small" /> },
        { label: 'Logout', onClick: logout, icon: <LogoutIcon fontSize="small" /> },
    ];

    const getMonthOptions = () => {
        return Array.from({ length: 12 }, (_, i) => {
            const month = dayjs().month(i);
            return {
                value: month.format('YYYY-MM'),
                label: month.format('MMMM YYYY'),
            };
        });
    };

    return (
        <div className="flex items-center gap-4">
            {/* Month Selector */}
            <FormControl
                variant="outlined"
                size="small"
                sx={{
                    backgroundColor: 'black',
                    borderRadius: 1,
                    border: '1px solid #e0e0e0',
                    minWidth: 180,
                }}
            >
                <Select
                    className="text-white"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    <MenuItem value="">Select Month</MenuItem>
                    {getMonthOptions().map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Menu Icon */}
            <IconButton onClick={handleMenuOpen} sx={{ color: 'black' }}>
                <MenuIcon />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.label} onClick={() => handleMenuAction(item)}>
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
