import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const studentService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/students");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (studentData) => {
    try {
      const response = await apiClient.post("/students", studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (id, studentData) => {
    try {
      const response = await apiClient.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
