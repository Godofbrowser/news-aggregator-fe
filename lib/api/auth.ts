import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse, AuthUser } from '@/lib/types/auth';
import { apiClient } from '.';

const csrf = () => apiClient.get('auth/csrf-cookie')

export const getAUthUser = async (): Promise<AuthUser> => {
  await csrf();
  const response = await apiClient.get(`auth/user`);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<void> => {
  await csrf();
  await apiClient.post(`auth/login`, credentials);
};

export const register = async (credentials: RegisterCredentials): Promise<void> => {
  await csrf();
  await apiClient.post(`auth/register`, {
    ...credentials,
    password_confirmation: credentials.confirmPassword,
    confirmPassword: undefined
  });
};

export const logout = async () => {
  await apiClient.post(`auth/logout`);
};
