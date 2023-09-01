import React from "react";
import almaLogo from "./assets/almalogo.png";

const Header = () => {
  return (
    <div className="w-full h-16 p-4 items-center bg-white ">
      <img src={almaLogo} alt="almaLogo" className="w-32 h-8" />
    </div>
  );
};

export default Header;
