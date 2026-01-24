import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { Venue } from "../../types/institutional";

/**
 * Institutional Venue Service
 * Features: Type-safe orchestration of physical academic assets.
 */
export const venueService = {
  getAll: async (): Promise<Venue[]> => {
    try {
      const response = await apiClient.get<Venue[]>("/venues");
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<Venue> => {
    try {
      const response = await apiClient.get<Venue>(`/venues/${id}`);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  create: async (venueData: Partial<Venue>): Promise<Venue> => {
    try {
      const response = await apiClient.post<Venue>("/venues", venueData);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  update: async (id: string, venueData: Partial<Venue>): Promise<Venue> => {
    try {
      const response = await apiClient.put<Venue>(`/venues/${id}`, venueData);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/venues/${id}`);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
