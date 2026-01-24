import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const venueService = {
  getAll: async () => {
    try {
      const response = await apiClient.get("/venues");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/venues/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (venueData) => {
    try {
      const response = await apiClient.post("/venues", venueData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (id, venueData) => {
    try {
      const response = await apiClient.put(`/venues/${id}`, venueData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/venues/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
