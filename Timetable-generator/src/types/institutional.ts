/**
 * ==========================================================================
 * BELLS UNIVERSITY - INSTITUTIONAL DATA CONTRACTS
 * Standardized types for core academic entities.
 * ==========================================================================
 */

export type CollegeID = 1 | 2 | 3 | 4;

export interface College {
  id: CollegeID;
  name: string;
  icon: string;
  accent: string;
}

export interface Department {
  id: string;
  name: string;
  collegeId: CollegeID;
}

export interface User {
  id: string;
  username: string;
  role: "ADMIN" | "LECTURER" | "STUDENT";
  departmentId?: string;
  name?: string;
  email?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string; // Matric number
  departmentId?: string;
  collegeId?: CollegeID;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  staffId: string;
  role: "LECTURER" | "PROFESSOR" | "ADMIN";
  departmentId?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  departmentId: string;
  semester: 1 | 2;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  type: "LECTURE_HALL" | "LABORATORY" | "OFFICE";
}

export interface TimetableSlot {
  id: string;
  courseId: string;
  lecturerId: string;
  venueId: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export type ThemeMode = "light" | "dark";

export interface UIState {
  theme: ThemeMode;
  sidebarOpen: boolean;
  activeCollege: CollegeID | null;
}
