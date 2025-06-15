import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, FormControl, InputLabel, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthHeader } from '../auth-header';
import { useDispatch } from 'react-redux';
import { store } from '../../services/redux/store';
import { logout } from '../../services/redux/slices';

interface NavLinksProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAuthenticated, onLogout }) => {
    if (isAuthenticated) {
        return (
            <AuthHeader logout={onLogout} />
        )
    }

    return (
        <>
            <Button color="inherit" component={Link} to="/login">
                Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
                Register
            </Button>
        </>
    );
};

interface HeaderProps {
    isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        store.dispatch({ type: 'USER_LOGOUT' });
    };
    return (
        <AppBar position="static">
            <Toolbar className="justify-between bg-white">
                <Typography variant="h6" fontWeight="bold" className='text-black'>
                    Budget Tracker
                </Typography>
                <div className="space-x-2">
                    <NavLinks
                        isAuthenticated={isAuthenticated}
                        onLogout={handleLogout}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}; 