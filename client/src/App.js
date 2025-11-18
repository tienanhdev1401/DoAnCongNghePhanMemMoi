import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./client/pages/LoginPage";
import HomePage from "./client/pages/HomePage";
import ClientLayout from "./layout/ClientLayout";
import ForgetPasswordPage from "./client/pages/ForgetPasswordPage";
import ProtectedRoute from "./routers/ProtectedRoute";
import ProfilePage from "./client/pages/ProfilePage";

import LessonTopicPage from "./client/pages/LessonTopicPage";
import TopicDetailPage from "./client/pages/LessonTopicDetailPage";

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

      <Route
        path="/topics"
        element={
          <ProtectedRoute>
            <ClientLayout><LessonTopicPage /></ClientLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/topics/:topic"
        element={
          <ProtectedRoute>
            <ClientLayout><TopicDetailPage/></ClientLayout>
          </ProtectedRoute>
        }
      />

      </Routes>
  );
}

export default App;
