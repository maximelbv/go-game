import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { UserProvider } from "./providers/UserProvider";
import { RequireAuth } from "./helpers/route-helpers";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import { TsumegoProvider } from "./providers/TsumegoProvider";
import TsumegoPage from "./pages/TsumegoPage";
import TsumegoDetailPage from "./pages/TsumegoDetailPage";
import { TsumegoAttemptProvider } from "./providers/TsumegoAttemptProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <TsumegoProvider>
        <TsumegoAttemptProvider>
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
              <Route
                path="/welcome"
                element={
                  <MainLayout>
                    <LandingPage />
                  </MainLayout>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/tsumego"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <TsumegoPage />
                    </MainLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/tsumego/:id"
                element={
                  <RequireAuth>
                    <MainLayout>
                      <TsumegoDetailPage />
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
        </TsumegoAttemptProvider>
      </TsumegoProvider>
    </UserProvider>
  </StrictMode>
);
