import { Source, Category } from '../types/app';
import { apiClient } from '.';


export const getSources = async (): Promise<Source[]> => {
  const response = await apiClient.get(`sources`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get(`categories`);
  return response.data;
};