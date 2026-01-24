import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";

export const timetableService = {
  generate: async (settings) => {
    try {
      const response = await apiClient.post("/timetable/generate", settings);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAll: async () => {
    try {
      const response = await apiClient.get("/timetable");
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/timetable/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  export: async (id, format = "pdf") => {
    try {
      const response = await apiClient.get(`/timetable/${id}/export?format=${format}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/timetable/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
