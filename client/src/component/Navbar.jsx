import React from "react";
import "../Css/navbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/LoginSlice"; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="topNavbar">
      <div className="topleftnavbar">
        <div className="navItem" onClick={() => navigate("/homepage")}>HOME</div>
        <div className="navItem" onClick={() => navigate("/editprofile")}>EDIT</div>
        <button className="logoutButton" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Navbar;
