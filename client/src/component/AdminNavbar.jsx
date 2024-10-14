import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from "../features/LoginSlice"; 
import { useDispatch } from "react-redux";
const AdminNavbar = () => {


  
  const navigate=useNavigate()


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="topNavbar">
    <div className="topleftnavbar">
      <div className="navItem" onClick={()=>{navigate("/adminHome")}}>HOME</div>
      <div className="navItem" onClick={()=>{navigate("/adminCreateUser")}}>CREATE A USER</div>
      <button className="logoutButton" onClick={handleLogout}>LOGOUT</button>
    </div>
  </div>
  )
}

export default AdminNavbar;


 



