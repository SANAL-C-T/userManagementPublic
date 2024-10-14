import React, { useRef, } from "react";
import "../Css/login.css";
import loginImage from "../../public/undraw_about_us_page_re_2jfm.svg";
import { ToUserLoginPage } from "../features/LoginSlice";//this is an action,written in slice file.
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()

  const { loading, user, error } = useSelector((state) => state.FromStoreLogin);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Dispatch the login action
    dispatch(ToUserLoginPage({email,password,}))
      .unwrap()// Unwrap the promise to get the payload or error directly
      .then((result) => {
        // console.log("Login Successful:",result.token);
        // Navigate(`/homepage/${result.user.id}`);  //pass the userid in params
        localStorage.setItem("token",result.token);
        Navigate("/homepage");  //pass the userid in params
      })
      .catch((err) => {
        console.error("Login Failed:", err);
        Navigate('/');
      });

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
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
    </div>
  );
};

export default Login;
