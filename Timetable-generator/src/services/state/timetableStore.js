import { create } from "zustand";
import { timetableService } from "../api/timetableService";

export const useTimetableStore = create((set) => ({
  timetables: [],
  currentTimetable: null,
  isLoading: false,
  error: null,

  fetchTimetables: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await timetableService.getAll();
      set({ timetables: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  generateTimetable: async (settings) => {
    set({ isLoading: true, error: null });
    try {
      const newTimetable = await timetableService.generate(settings);
      set((state) => ({
        timetables: [...state.timetables, newTimetable],
        currentTimetable: newTimetable,
        isLoading: false,
      }));
      return newTimetable;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  setCurrentTimetable: (timetable) => set({ currentTimetable: timetable }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
