import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./context/ThemeContext";
import "react-toastify";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import StaffPage from "./pages/StaffPage";
import VenuesPage from "./pages/VenuesPage";
import TimetablePage from "./pages/TimetablePage";
import SettingsPage from "./pages/SettingsPage";

// Components
import MainLayout from "./components/layout/MainLayout";

/**
 * Protected route wrapper
 */
function ProtectedRoute({ element }) {
  // const { token } = useAuth();
  const token = 1; // Bypass login
  return token ? element : <Navigate to="/login" />;
}

/**
 * Main App component with routing
 */
export default function App() {
  // const { token } = useAuth();
  const token = 1; // Bypass login

  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <StudentsPage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <CoursesPage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/staff"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <StaffPage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/venues"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <VenuesPage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/timetable"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <TimetablePage />
                </MainLayout>
              }
            />
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute
              element={
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              }
            />
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </ThemeProvider>
  );
}
