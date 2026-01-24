import { create } from "zustand";
import { courseService } from "../api/courseService";

export const useCourseStore = create((set) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await courseService.getAll();
      set({ courses: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addCourse: async (courseData) => {
    set({ isLoading: true, error: null });
    try {
      const newCourse = await courseService.create(courseData);
      set((state) => ({
        courses: [...state.courses, newCourse],
        isLoading: false,
      }));
      return newCourse;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateCourse: async (id, courseData) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await courseService.update(id, courseData);
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? updated : c)),
        isLoading: false,
      }));
      return updated;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteCourse: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await courseService.delete(id);
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
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
