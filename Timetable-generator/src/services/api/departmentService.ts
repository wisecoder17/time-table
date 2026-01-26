import apiClient from "./client";

export interface Department {
  id: string | number;
  name: string;
  code: string;
  collegeId?: string | number;
}

export const departmentService = {
  getAll: async (): Promise<Department[]> => {
    const response = await apiClient.get<Department[]>("/department/get");
    return response.data;
  },

  getByCollege: async (collegeId: string | number): Promise<Department[]> => {
    const departments = await departmentService.getAll();
    return departments.filter((d) => String(d.collegeId) === String(collegeId));
  },
};
