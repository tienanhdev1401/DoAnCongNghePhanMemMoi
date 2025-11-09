import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./client/pages/LoginPage";
import HomePage from "./client/pages/HomePage";
import ProtectedRoute from "./routers/ProtectedRoute";
import ClientLayout from "./layout/ClientLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ClientLayout>
              <HomePage />
            </ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
