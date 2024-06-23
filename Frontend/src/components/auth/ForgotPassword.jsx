import EmailIcon from "@mui/icons-material/Email";
import React, { useState } from "react";
import "../../styles/Auth.css";

const ForgotPassword = () => {
  const [focus, setFocus] = useState({ email: false, password: false });
  const [resetPassword, setResetPassword] = useState({
    email: "",
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
    setResetPassword({ ...resetPassword, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(resetPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src="/avatar.svg" alt="avatar" />
      <h2 className="title">Reset Your Password</h2>
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
      <a href="/login">Go back to login page !</a>
      <input type="submit" className="btn" value="Login" />
    </form>
  );
};

export default ForgotPassword;
