import React, { useState } from "react";
import "../Css/body.css";
// import { fetchUser } from "../features/HomepageSlice";
const backendPort = import.meta.env.VITE_BACKAPP_API_URL;
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.FromStoreLogin);

  return (
<div className="Homebody">
  <div className="left">
    <h2>Hello, {user.Name}</h2>
  </div>

  <div className="middle">
    <h3>Provided Details</h3>
    <hr />
    <br />
    <h4>Your Email ID: <span className="info">{user.Email}</span></h4>
    <br />
    <h4>Your Phone Number: <span className="info">{user.Phone}</span></h4>
  </div>

  <div className="right">
    <img src={`${backendPort}${user.Profile}`} alt="Profile" className="profile-pic" />
  </div>
</div>

  );
};
export default Body;
