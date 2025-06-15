import axios from 'axios';

export const createAxiosInstance = async (info: any) => {
  try {
    const { url, method, headers, data, params } = info;
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers
    });

    return await axiosInstance({ url, method, headers, data, params, timeout: 120000 });
  } catch (error: any) {
    if (error.response) {
      return error.response;

    }

    return { data: { status_code: 'E-10001' } };
  }
};