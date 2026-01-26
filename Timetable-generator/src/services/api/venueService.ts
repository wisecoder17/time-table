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
      const response = await apiClient.get<any[]>("/venue/get");
      return response.data.map(mapBackendToFrontend);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<Venue> => {
    try {
        const all = await venueService.getAll();
        const found = all.find(v => v.id === id);
        if(!found) throw new Error("Venue not found");
        return found;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  create: async (venueData: Partial<Venue>): Promise<Venue> => {
    try {
      const payload = mapFrontendToBackend(venueData);
      const response = await apiClient.post<any>("/venue/post", payload);
      return { ...venueData, id: "temp" } as Venue;
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  update: async (id: string, venueData: Partial<Venue>): Promise<Venue> => {
    try {
        const payload = mapFrontendToBackend(venueData);
      const response = await apiClient.put<any>(`/venue/update/${id}`, payload);
      return mapBackendToFrontend(response.data);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/venue/delete/${id}`);
    } catch (error: any) {
      throw handleApiError(error);
    }
  },
};

const mapBackendToFrontend = (data: any): Venue => {
    let type: Venue["type"] = "LECTURE_HALL";
    if (data.type === 2) type = "LABORATORY";
    if (data.type === 3) type = "OFFICE";

    return {
        id: data.id?.toString(),
        name: data.name,
        capacity: data.capacity,
        type: type,
    };
};

const mapFrontendToBackend = (data: Partial<Venue>): any => {
    let type = 1;
    if (data.type === "LABORATORY") type = 2;
    if (data.type === "OFFICE") type = 3;

    return {
        venue_Code: data.name?.substring(0, 3).toUpperCase() || "VEN",
        name: data.name,
        capacity: data.capacity,
        type: type,
        preference: 1,
        location: "Campus",
        college_id: 1
    };
};
