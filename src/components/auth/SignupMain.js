import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import SignupForm from "./signup/SignupForm";
import SpaceShip2 from "../animation/SpaceShip2";

const SignupMain = () => {
  return (
    <BasicLayout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full lg:w-9/12 font-bold text-black font-sans p-4 lg:p-6 flex flex-col">
          <div className="bg-white w-full h-auto rounded-2xl flex flex-col md:flex-row overflow-hidden">
            {/* Container for SpaceShip2 */}
            <div className="flex-none lg:w-2/5 justify-center items-center bg-white rounded-xl mb-3 md:mb-0 hidden lg:flex">
              {/* Set fixed width and height for the container */}
              <div className="w-full h-auto p-6  ">
                <SpaceShip2 />
              </div>
            </div>
            {/* Container for SignupForm */}
            <div className="flex flex-1 flex-col justify-center items-center p-6 md:p-16 bg-white">
              <div className="w-full lg:w-3/5 bg-white rounded-xl text-left p-2 md:p-6 lg:p-8 flex justify-center shadow-xl items-center">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignupMain;
