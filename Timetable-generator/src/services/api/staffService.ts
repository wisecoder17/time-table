import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { StaffMember } from "../../types/institutional";

/**
 * Institutional Staff Service
 * Features: Type-safe orchestration of academic personnel records.
 */
export const staffService = {
  getAll: async (): Promise<StaffMember[]> => {
    try {
      const response = await apiClient.get<StaffMember[]>("/staff");
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<StaffMember> => {
    try {
      const response = await apiClient.get<StaffMember>(`/staff/${id}`);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  create: async (staffData: Partial<StaffMember>): Promise<StaffMember> => {
    try {
      const response = await apiClient.post<StaffMember>("/staff", staffData);
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    staffData: Partial<StaffMember>,
  ): Promise<StaffMember> => {
    try {
      const response = await apiClient.put<StaffMember>(
        `/staff/${id}`,
        staffData,
      );
      return response.data;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/staff/${id}`);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};
