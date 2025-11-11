import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./client/pages/LoginPage";
import HomePage from "./client/pages/HomePage";
import ClientLayout from "./layout/ClientLayout";
import ForgetPasswordPage from "./client/pages/ForgetPasswordPage";
import ProtectedRoute from "./routers/ProtectedRoute";
import ProfilePage from "./client/pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ClientLayout><HomePage /></ClientLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
  <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ClientLayout><ProfilePage /></ClientLayout>
          </ProtectedRoute>
        }
      />

      </Routes>
  );
}

export default App;
