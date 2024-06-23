import React, { useState } from "react";
import "../../styles/Auth.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [focus, setFocus] = useState({ email: false, password: false });
  const [loginData, setLoginData] = useState({
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
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src="/avatar.svg" alt="avatar" />
      <h2 className="title">Welcome back !</h2>
      <div className={`input-div one ${focus.email ? "focus" : ""}`}>
        <div className="i">
          <EmailIcon className={focus.email ? "focused-icon" : ""} />
        </div>
        <div className="div">
          <h5>Email</h5>
          <input
            type="text"
            className="input"
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => handleBlur("email", e.target.value)}
            name="email"
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
            onChange={handleInputChange}
            onFocus={() => handleFocus("password")}
            onBlur={(e) => handleBlur("password", e.target.value)}
            name="new-password"
            autoComplete="new-password"
            required
          />
        </div>
      </div>
      <div className="forgot-password">
        
        <a href="/forgot-password">Forgot password ?</a>
        <a href="/signup">New user ?</a>
      </div>

      <input type="submit" className="btn" value="Login" />
    </form>
  );
};

export default Login;
