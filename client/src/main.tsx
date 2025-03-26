import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlayPage from "./pages/PlayPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { UserProvider } from "./providers/UserProvider";
import { RequireAuth } from "./helpers/route-helpers";
import MainLayout from "./layouts/MainLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/play"
            element={
              <RequireAuth>
                <MainLayout>
                  <PlayPage />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <MainLayout>
                  <AdminDashboardPage />
                </MainLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
