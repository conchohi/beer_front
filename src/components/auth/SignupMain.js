import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import SignupForm from "./signup/SignupForm";
import SpaceShip2 from "../animation/SpaceShip2";

const SignupMain = () => {
  return (
    <BasicLayout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-9/12 font-bold text-xl md:text-4xl text-black font-sans p-6 md:px-12 md:py-10 flex flex-col">
          <div className="bg-white w-full h-auto rounded-2xl flex flex-col md:flex-row md:p-8">
            <div className="w-2/12 md:w-1/2 flex justify-center items-center bg-slate-100 rounded-xl mb-3 md:mb-0">
              <SpaceShip2 />
            </div>
            <div className="w-full md:w-1/2 rounded-xl text-left px-5">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default SignupMain;
