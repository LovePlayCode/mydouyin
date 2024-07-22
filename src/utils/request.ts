import axios, { type AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '',
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  config => {
    // 如果没有设置Content-Type，默认application/json
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function request<T = any>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  return axios
    .request<T>(config)
    .then(response => {
      return { success: true, data: response.data };
    })
    .catch(err => {
      return { success: false, data: err } as const;
    });
}
