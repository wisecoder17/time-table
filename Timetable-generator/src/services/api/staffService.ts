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
      const username = localStorage.getItem("username");
      if (!username) throw new Error("User context required");
      const response = await apiClient.get<any[]>("/staff/get", {
        params: { username },
      });
      return response.data.map(mapBackendToFrontend);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<StaffMember> => {
    try {
      const all = await staffService.getAll();
      const found = all.find((s) => s.id === id);
      if (!found) throw new Error("Staff not found");
      return found;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  create: async (staffData: Partial<StaffMember>): Promise<StaffMember> => {
    try {
      const payload = mapFrontendToBackend(staffData);
      const response = await apiClient.post<any>("/staff/post", payload);
      return { ...staffData, id: "temp" } as StaffMember;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    staffData: Partial<StaffMember>,
  ): Promise<StaffMember> => {
    try {
      const payload = mapFrontendToBackend(staffData);
      const response = await apiClient.put<any>(`/staff/update/${id}`, payload);
      return mapBackendToFrontend(response.data);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/staff/delete/${id}`);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};

const mapBackendToFrontend = (data: any): StaffMember => {
  return {
    id: data.id?.toString(),
    name: `${data.firstname} ${data.surname}`,
    email: "placeholder@bells.edu.ng", // Backend missing email
    staffId: data.staff_id?.toString(),
    role: "LECTURER", // Defaulting as backend uses int types
    departmentId: data.deptid?.toString(),
  };
};

const mapFrontendToBackend = (data: Partial<StaffMember>): any => {
  const names = data.name ? data.name.split(" ") : ["", ""];
  return {
    firstname: names[0],
    surname: names.slice(1).join(" "),
    staff_id: parseInt(data.staffId || "0"),
    deptid: parseInt(data.departmentId || "0"),
    // Defaults
    type: 1,
    in_use: 1,
    duty_count: 0,
  };
};
