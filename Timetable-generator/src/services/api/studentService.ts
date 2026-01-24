import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { Student } from "../../types/institutional";

/**
 * Institutional Student Service
 * Features: Type-safe academic registry interactions.
 */
export const studentService = {
  getAll: async (): Promise<Student[]> => {
    try {
      const response = await apiClient.get<Student[]>("/students");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<Student> => {
    try {
      const response = await apiClient.get<Student>(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (studentData: Partial<Student>): Promise<Student> => {
    try {
      const response = await apiClient.post<Student>("/students", studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    studentData: Partial<Student>,
  ): Promise<Student> => {
    try {
      const response = await apiClient.put<Student>(
        `/students/${id}`,
        studentData,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/students/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
