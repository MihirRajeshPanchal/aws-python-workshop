import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div className="p-6 border-b border-gray-600 mx-auto flex flex-row items-center justify-between max-w-screen-lg md:px-6">
        <div className="flex items-center justify-start">
          <a
            href="https://www.linkedin.com/in/mihirpanchal54/"
            className="mx-2"
          >
            <FaLinkedin size={30} className="text-black" />
          </a>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <a href="/">
            <div className="mx-4 text-lg text-black text-center">
              Homepage
            </div>
          </a>
          <a href="/drive">
            <div className="mx-4 text-lg text-black text-center">
              S3 as a Drive
            </div>
          </a>
          <a href="/email">
            <div className="mx-4 text-lg text-black text-center">
              SNS as a Email Sender
            </div>
          </a>
        </div>
        <div className="flex items-center justify-end">
          <a href="https://github.com/MihirRajeshPanchal/Mediapipe-Workshop" className="mx-2">
            <FaGithub size={30} className="text-black" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
