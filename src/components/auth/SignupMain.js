import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import SignupForm from './signup/SignupForm';
import Astronaut5 from '../animation/Astronaut5';

const SignupMain = () => {
    return (
        <BasicLayout>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-9/12 font-bold text-xl md:text-4xl text-black font-sans p-6 md:px-12 md:py-10 flex flex-col">
                    <div className="bg-gray-700 w-full h-auto rounded-2xl flex flex-col md:flex-row md:p-8">
                        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-900 rounded-xl mb-6 md:mb-0">
                            <Astronaut5 />
                        </div>
                        <div className="w-full md:w-1/2 rounded-xl text-left px-6">
                            <SignupForm />
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default SignupMain;
