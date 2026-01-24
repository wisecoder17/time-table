import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { Course } from "../../types/institutional";

/**
 * Institutional Course Service
 * Features: Type-safe academic curriculum management.
 */
export const courseService = {
  getAll: async (): Promise<Course[]> => {
    try {
      const response = await apiClient.get<Course[]>("/courses");
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<Course> => {
    try {
      const response = await apiClient.get<Course>(`/courses/${id}`);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  create: async (courseData: Partial<Course>): Promise<Course> => {
    try {
      const response = await apiClient.post<Course>("/courses", courseData);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  update: async (id: string, courseData: Partial<Course>): Promise<Course> => {
    try {
      const response = await apiClient.put<Course>(
        `/courses/${id}`,
        courseData,
      );
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/courses/${id}`);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
