import axios from 'axios';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials 
} from '@/types/services';

const API_BASE_URL = process.env.NEXT_PUBLIC_OPERATION_URL;
const REQUEST_TIMEOUT = 10000;

const authHttpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT,
});

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await authHttpClient.post<AuthResponse>('/auth/login', credentials);
  return data;
}

export async function register(credentials: RegisterCredentials): Promise<void> {
  await authHttpClient.post('/auth/register', credentials);
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  try {
    const { data } = await authHttpClient.post<AuthResponse>(
      '/auth/refresh',
      null,
      { headers: { 'Content-Type': '' } }
    );
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      console.error('refreshAccessToken error', {
        status: err.response.status,
        headers: err.response.headers,
        data: err.response.data,
        request: err.config,
      });
      throw new Error(`Refresh failed: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
    }
    console.error('refreshAccessToken unknown error', err);
    throw err;
  }
}

export async function logout(): Promise<void> {
  await authHttpClient.post('/auth/logout', { refreshToken: null });
}
