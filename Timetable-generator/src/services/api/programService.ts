import apiClient from "./client";

export interface Program {
  id: string | number;
  name: string;
  code: string;
  deptID: string | number;
  newCodeID?: string | number;
}

export const programService = {
  getAll: async (): Promise<Program[]> => {
    const response = await apiClient.get<Program[]>("/program/get");
    return response.data;
  },

  getByDepartment: async (deptId: string | number): Promise<Program[]> => {
    const programs = await programService.getAll();
    return programs.filter((p) => String(p.deptID) === String(deptId));
  },
};
