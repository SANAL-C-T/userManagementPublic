import React, { useRef, useState,useEffect } from "react";
import "../Css/login.css";
import loginImage from "../../src/assets/undraw_about_us_page_re_2jfm.svg";
import { ToUserLoginPage } from "../features/LoginSlice"; // Redux action
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.FromStoreLogin);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const result = await dispatch(
        ToUserLoginPage({ email, password })
      ).unwrap();
      console.log("Login Successful:");
      localStorage.setItem("token", result.token);

       navigate("/homepage"); 
    } catch (err) {
      console.error("Login Failed:", err);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="loginpage">
      <form className="leftForm" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <br />
        <div className="form-group">
          <label htmlFor="email">User mail id</label>
          <input
            type="email"
            id="email"
            placeholder="Enter the Email"
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </div>
        <div className="form-group">
          <button className="btn1" type="submit">
            {loading ? "Logging in..." : "LOGIN"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </form>
      <div className="rightForm">
        <img src={loginImage} alt="Login Graphic" />
      </div>
    </div>
  );
};

export default Login;
