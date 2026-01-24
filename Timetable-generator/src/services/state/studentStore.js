import { create } from "zustand";
import { studentService } from "../api/studentService";

export const useStudentStore = create((set) => ({
  students: [],
  isLoading: false,
  error: null,

  fetchStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await studentService.getAll();
      set({ students: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addStudent: async (studentData) => {
    set({ isLoading: true, error: null });
    try {
      const newStudent = await studentService.create(studentData);
      set((state) => ({
        students: [...state.students, newStudent],
        isLoading: false,
      }));
      return newStudent;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateStudent: async (id, studentData) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await studentService.update(id, studentData);
      set((state) => ({
        students: state.students.map((s) => (s.id === id ? updated : s)),
        isLoading: false,
      }));
      return updated;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteStudent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await studentService.delete(id);
      set((state) => ({
        students: state.students.filter((s) => s.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
