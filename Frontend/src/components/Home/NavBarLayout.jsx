import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const NavBarLayout = () => {
  return (
    <div>
      <NavBar />
      {/* <img src="/home.jpg"/> */}
      <Outlet />
    </div>
  );
};

export default NavBarLayout;
