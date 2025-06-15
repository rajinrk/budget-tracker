import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest, resetauthStatusCode } from '../../services/redux/slices';
import { getAuthErrorCode, getAuthLoading, getAuthSuccessCode } from '../../services/redux/selectors';
import { Loader } from '../../components/loader';

interface LoginFormData {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const  Login:React.FC = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector(getAuthErrorCode);
  const successMsg = useSelector(getAuthSuccessCode);
  const isLoading = useSelector(getAuthLoading);
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting, setSubmitting } = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // TODO: Handle login logic here
      dispatch(loginRequest(values));
    },
  });

  useEffect(() => {
    if (errorMsg) {
      setSubmitting(false);
      alert(errorMsg);
    }
    if (successMsg) {
      alert(successMsg);
    }
    setTimeout(() => dispatch(resetauthStatusCode()), 1000);
  }, [errorMsg, successMsg]);


  if (isLoading) {
    return <Loader text="Logging in..." fullScreen />;
  }



  return (
    <Box className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" component="h1" className="text-center mb-6">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="text-gray-400" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="text-gray-400" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            className="mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
          <Box className="text-center mt-4">
            <Typography variant="body2">
              Don't have an account?{' '}
              <MuiLink component={Link} to="/register">
                Register here
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 