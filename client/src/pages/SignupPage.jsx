import React, { useRef } from "react";
import "../Css/signup.css";
import signupImage from "../../src/assets/signUpGraphics.svg";
import { useDispatch, useSelector } from "react-redux";
import { tosignupUserpage } from "../features/SignUpSlice";

const SignupPage = () => {
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(
    (state) => state.FromStoreSignUp
  );

  console.log("Current state:", { loading, error, user });

  const handleValidation = () => {
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d+$/;

    const inputName = name.current.value;
    const inputEmail = email.current.value;
    const inputPhone = phone.current.value;
    const inputPassword = password.current.value;

    let isValid = true;

    if (
      inputName === "" ||
      /\d/.test(inputName) ||
      !namePattern.test(inputName)
    ) {
      alert(
        "Please enter a valid name without numbers and special characters."
      );
      isValid = false;
    }

    if (!emailPattern.test(inputEmail)) {
      alert("Please enter a valid email address.");
      isValid = false;
    }

    if (inputPhone === "" || !phonePattern.test(inputPhone)) {
      alert("Please enter a valid phone number.");
      isValid = false;
    }

    if (inputPassword === "") {
      alert("Please enter a password.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const inputName = name.current.value;
      const inputEmail = email.current.value;
      const inputPhone = phone.current.value;
      const inputPassword = password.current.value;

      dispatch(
        tosignupUserpage({
          name: inputName,
          email: inputEmail,
          phone: inputPhone,
          password: inputPassword,
        })
      )
        .unwrap()
        .then((result) => {
          console.log("Signup Successful:", result);
        })
        .catch((error) => {
          console.error("Signup Failed:", error);
        });
    }
  };

  return (
    <div>
      <h2 className="signup-title">Sign up</h2>
      <div className="signuppage">
        <div className="signupleft">
          <img src={signupImage} alt="Sign up Graphic" />
        </div>
        <div className="signupright">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                ref={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                ref={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone"
                ref={phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                ref={password}
              />
            </div>
            <div className="form-group">
              <button className="btn-signup" type="submit" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>
          {error && <div className="error">{error}</div>}
          {user && <div className="success">Signup successful!</div>}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
