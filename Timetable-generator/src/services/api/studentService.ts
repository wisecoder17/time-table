import apiClient from "./client";
import { handleApiError } from "../../utils/errorHandler";
import { Student } from "../../types/institutional";

/**
 * Institutional Student Service
 * Features: Type-safe academic registry interactions.
 */
export const studentService = {
  getAll: async (): Promise<Student[]> => {
    try {
      const username = localStorage.getItem("username");
      if (!username) throw new Error("User context required");

      const response = await apiClient.get<any[]>("/student/get", {
        params: { username },
      });
      return response.data.map(mapBackendToFrontend);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<Student> => {
    try {
      const all = await studentService.getAll();
      const found = all.find((s) => s.id === id);
      if (!found) throw new Error("Student not found");
      return found;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (studentData: Partial<Student>): Promise<Student> => {
    try {
      const payload = mapFrontendToBackend(studentData);
      const response = await apiClient.post<any>("/student/post", payload);
      return { ...studentData, id: "temp" } as Student;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    studentData: Partial<Student>,
  ): Promise<Student> => {
    try {
      const payload = mapFrontendToBackend(studentData);
      const response = await apiClient.put<any>(
        `/student/update/${id}`,
        payload,
      );
      return mapBackendToFrontend(response.data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/student/delete/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

const mapBackendToFrontend = (data: any): Student => {
  return {
    id: data.id?.toString(),
    name: `${data.firstname} ${data.surname}`,
    email: "placeholder@bells.edu.ng",
    studentId: data.matric_No || "0000",
    departmentId: data.deptID?.toString(),
  };
};

const mapFrontendToBackend = (data: Partial<Student>): any => {
  const names = data.name ? data.name.split(" ") : ["", ""];
  return {
    firstname: names[0],
    surname: names.slice(1).join(" "),
    matric_No: data.studentId,
    deptID: parseInt(data.departmentId || "0"),
    // Defaults
    level: 100,
    programID: 1,
  };
};
