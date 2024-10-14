import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/AdminSlice";
import { useNavigate } from 'react-router-dom';
import "../Css/usertile.css";

const AdminCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    // dispatch(createUser(newUser));
    // .unwrap()
    // .then((result) => {
    //   console.log("Signup Successful:", result);
    // })
    // .catch((error) => {
    //   console.error("Signup Failed:", error);
    // });

    dispatch(createUser(newUser))
      .unwrap()
      .then((result) => {
        console.log("Signup Successful:", result);

        setLoading(false);
        navigate("/adminHome")
      })
      .catch((error) => {
        console.error("Signup Failed:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <br></br>
      <h2 className="signup-title">Add a new user</h2>
      <hr></hr>
      <div className="signuppage">
        <div className="signupright">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                ref={nameRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                ref={emailRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone"
                ref={phoneRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                ref={passwordRef}
              />
            </div>
            <div className="form-group">
              <button className="btn-signup" type="submit" disabled={loading}>
                {loading ? "Creating user..." : "Add new user"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminCreateUser;
