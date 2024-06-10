import React from "react";
import Ved from "../assets/ved.jpeg";
import Mihir from "../assets/mihir.jpeg";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">AWS Python Mumpy Workshop</h1>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-md transform -rotate-3 hover:scale-105 transition-transform duration-300 ease-in-out">
          <img
            src={Mihir}
            alt="Speaker 1"
            className="w-full h-64 object-cover"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Mihir Panchal</div>
            <p className="text-gray-700 text-base">
              Research Intern @IIT Patna | Full Stack AI Intern @Infiheal | 8x
              Hackathon Finalist | ML and Tech Developer @DJS Synapse | Computer
              Engineering @ DJSCE 26 | Diploma in IT @ SBMP
            </p>
          </div>
        </div>

        <div className="my-8"></div>

        <p className="mt-8 text-center text-gray-700 max-w-md overflow-hidden word-wrap-break-word">
          Description of the event goes here. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
          <div className="flex justify-center mt-8">
            <a href="http://">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg mr-4">
                GitHub
              </button>
            </a>
            <a href="http://">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg">
                Presentation Link
              </button>
            </a>
          </div>
        </p>

        <div className="max-w-sm rounded-lg overflow-hidden shadow-md transform rotate-3 hover:scale-105 transition-transform duration-300 ease-in-out">
          <img src={Ved} alt="Speaker 2" className="w-full h-64 object-cover" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Ved Bulsara</div>
            <p className="text-gray-700 text-base">
              | A Linux Aficionado | Cloud Computing Content Creator | #AWSome |
              AWS Cloud Quest: Cloud Practitioner certified | Postman Student
              Expert | Cloud enthusiast - AWS, Azure & GCP | CSE @KJSIT'26 |
            </p>
          </div>
        </div>

        {/* Buttons */}
      </div>
    </div>
  );
};

export default HomePage;
