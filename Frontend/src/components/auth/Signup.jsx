import React, { useState } from "react";
import "../../styles/Auth.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

const Signup = () => {
  const [focus, setFocus] = useState({ email: false, password: false });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleFocus = (field) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field, value) => {
    if (value === "") {
      setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src="/avatar.svg" alt="avatar" />
      <h2 className="title">Join us today !</h2>

      <div className={`input-div one ${focus.username ? "focus" : ""}`}>
        <div className="i">
          <PersonIcon className={focus.username ? "focused-icon" : ""} />
        </div>
        <div className="div">
          <h5>Username</h5>
          <input
            type="text"
            className="input"
            name="username"
            onChange={handleInputChange}
            onFocus={() => handleFocus("username")}
            onBlur={(e) => handleBlur("username", e.target.value)}
            required
          />
        </div>
      </div>
      <div className={`input-div one ${focus.email ? "focus" : ""}`}>
        <div className="i">
          <EmailIcon className={focus.email ? "focused-icon" : ""} />
        </div>
        <div className="div">
          <h5>Email</h5>
          <input
            type="email"
            className="input"
            name="email"
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => handleBlur("email", e.target.value)}
            required
          />
        </div>
      </div>
      <div className={`input-div pass ${focus.password ? "focus" : ""}`}>
        <div className="i">
          <LockIcon className={focus.password ? "focused-icon" : ""} />
        </div>
        <div className="div">
          <h5>Password</h5>
          <input
            type="password"
            className="input"
            name="password"
            onChange={handleInputChange}
            onFocus={() => handleFocus("password")}
            onBlur={(e) => handleBlur("password", e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <a href="/login">Already a user ?</a>
      <input type="submit" className="btn" value="Signup" />
    </form>
  );
};

export default Signup;
