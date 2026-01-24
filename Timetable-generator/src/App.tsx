import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Authenticate";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

// Initialize Query Client with deterministic defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Institutional stability over aggressive updates
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes cache for robust academic data
    },
  },
});

/**
 * Protected route wrapper
 */
function ProtectedRoute({ element }: { element: React.ReactNode }) {
  // const { token } = useAuth();
  let token = 1;
  return token ? element : <Navigate to="/login" />;
}

/**
 * Main App component with routing and providers
 */
export default function App() {
  // const { token } = useAuth();
  let token = 1;

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
