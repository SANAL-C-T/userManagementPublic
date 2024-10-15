// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import AdminHome from "./pages/AdminHomepage";
import AdminCanEdit from "./pages/AdminCanEdit";
import EditProfilePage from "./pages/EditProfilepage";
import AdminCreateUser from "./pages/AdminCreateNewUser";
import ProtectedRoute from "./component/ProtectedRoute";

import "./App.css";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!token ? <LoginPage /> : <Navigate to={"/homepage"} />}
        />

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/" />} />
     
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminHome"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminEdit"
          element={
            <ProtectedRoute>
              <AdminCanEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminCreateUser"
          element={
            <ProtectedRoute>
              <AdminCreateUser />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
