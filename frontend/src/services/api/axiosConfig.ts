import axios from 'axios';
import { logout } from '../redux/slices';
import { store } from '../redux/store';

export const createAxiosInstance = async (info: any) => {
  try {
    const { url, method, headers, data, params } = info;
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers,
    });

    return await axiosInstance({ url, method, headers, data, params, timeout: 120000 });
  } catch (error: any) {
    if (error.response) {
      if (['Not authorized to access this route'].includes(error.response.data?.status_code)) {
        store.dispatch(logout());
        store.dispatch({ type: 'USER_LOGOUT' });
        window.location.href = '/login';
      }
      return error.response;
    }

    return { data: { status_code: 'E-10001' } };
  }
};
