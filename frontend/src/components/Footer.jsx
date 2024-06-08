import React from "react";
import MumPyLogo from "../assets/mumpy.png";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-600">
      <div className="p-6 mx-auto flex items-center justify-center">
        <img src={MumPyLogo} alt="MumPy Logo" className="h-12 w-auto" />
        <div className="ml-4">AWS Python Workshop</div>
      </div>
    </div>
  );
};

export default Footer;
