import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const staffService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/staff");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (staffData) => {
    try {
      const response = await apiClient.post("/staff", staffData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (id, staffData) => {
    try {
      const response = await apiClient.put(`/staff/${id}`, staffData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/staff/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
