import apiClient from "./client";

export interface College {
  id: string | number;
  name: string;
  code: string;
  type?: string | number;
  encount?: string | number;
}

export const collegeService = {
  getAll: async (): Promise<College[]> => {
    const response = await apiClient.get<College[]>("/college/get");
    return response.data;
  },

  getById: async (id: string | number): Promise<College | null> => {
    try {
      const colleges = await collegeService.getAll();
      return colleges.find((c) => String(c.id) === String(id)) || null;
    } catch (error) {
      return null;
    }
  },
};
