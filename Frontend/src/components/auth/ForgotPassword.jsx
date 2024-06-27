import React, { useState } from "react";
import styles from "../../styles/AccessLayout.module.css";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
  const [focus, setFocus] = useState({ email: false });
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
    <form className={styles.formSubmit} onSubmit={handleSubmit}>
      <img src="/avatar.svg" alt="avatar" />
      <h2 className={styles.title}>Reset Your Password</h2>
      <div
        className={`${styles["input-div"]} ${styles.one} ${
          focus.email ? styles.focus : ""
        }`}
      >
        <div className={styles.i}>
          <EmailIcon className={focus.email ? styles["focused-icon"] : ""} />
        </div>
        <div className={styles.div}>
          <h5>Email</h5>
          <input
            type="text"
            className={styles.input}
            onChange={handleInputChange}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => handleBlur("email", e.target.value)}
            name="email"
            required
          />
        </div>
      </div>
      <a href="/login" className={styles.anchor}>Go back to login page !</a>
      <input type="submit" className={styles.btn} value="Login" />
    </form>
  );
};

export default ForgotPassword;
