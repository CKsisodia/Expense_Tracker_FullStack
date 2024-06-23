import React from "react";
import "../../styles/Auth.css";

const Auth = ({children}) => {
  return (
    <div className="bodyContainer">
      <img className="wave" src="/wave.png" alt="wave" />
      <div className="container">
        <div className="img">
          <img src="/bg.svg" alt="background" />
        </div>
        <div className="auth-content">
          {children}
        </div>
       
      </div>
    </div>
  );
};

export default Auth;
