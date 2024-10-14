import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import AdminHome from "./pages/AdminHomepage";
import AdminCanEdit from "./pages/AdminCanEdit";
import EditprofilePage from "./pages/EditProfilepage";
import AdminCreateUser from "./pages/AdminCreateNewUser";
import "./App.css";
const App = () => {

  let token = localStorage.getItem('token');
  if (token === null) {
    token = null;
  }
  console.log("the token::", token);
  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/editprofile" element={<EditprofilePage />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/adminEdit" element={<AdminCanEdit />} />
            <Route path="/adminCreateUser" element={<AdminCreateUser />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;