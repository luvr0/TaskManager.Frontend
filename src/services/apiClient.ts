import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '@/services/authService';
import { emitForcedLogout, getAccessToken, setAccessToken } from '@/services/tokenStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_OPERATION_URL;
const REQUEST_TIMEOUT = 10000;
const REFRESH_PATH = '/auth/refresh';

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type QueueCallback = (token: string | null) => void;

const pendingQueue: QueueCallback[] = [];

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});

let isRefreshing = false;

function isRefreshRequest(url?: string): boolean {
  return Boolean(url && url.includes(REFRESH_PATH));
}

function enqueue(callback: QueueCallback): void {
  pendingQueue.push(callback);
}

function flushQueue(token: string | null): void {
  while (pendingQueue.length) {
    const callback = pendingQueue.shift();
    callback?.(token);
  }
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalConfig = error.config as RetryConfig | undefined;

    if (
      status === 401 &&
      originalConfig &&
      !originalConfig._retry &&
      !isRefreshRequest(originalConfig.url)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          enqueue((token) => {
            if (!token) {
              reject(error);
              return;
            }

            originalConfig.headers = originalConfig.headers ?? {};
            originalConfig.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalConfig));
          });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        const { accessToken } = await refreshAccessToken();
        setAccessToken(accessToken);
        flushQueue(accessToken);

        originalConfig.headers = originalConfig.headers ?? {};
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalConfig);
      } catch (refreshError) {
        flushQueue(null);
        emitForcedLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
