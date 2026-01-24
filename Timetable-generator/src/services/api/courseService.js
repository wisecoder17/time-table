import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const courseService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/courses");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (courseData) => {
    try {
      const response = await apiClient.post("/courses", courseData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (id, courseData) => {
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
