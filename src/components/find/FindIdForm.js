import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpaceShip from "../animation/SpaceShip";
import BasicLayout from "../../layouts/BasicLayout";
import ModalComponent from "../common/ModalComponent";
import { publicApi } from "../../api/axios_intercepter";


function FindIdForm() {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [userIds, setUserIds] = useState([]);
    const [emailSent, setEmailSent] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

    const navigate = useNavigate();

    useEffect(() => {
        if (emailSent && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [emailSent, timeLeft]);

    const sendVerificationEmail = async () => {
        if(!email){
            return;
        }
        try {
            await publicApi.post('/api/auth/email-verify', { email });
            setEmailSent(true);
            setMessage("인증번호가 전송되었습니다.");
            setIsOpen(true); // Show modal
            setTimeLeft(300); // Reset countdown timer
        } catch (error) {
            setMessage(error.response?.data || "메일 전송에 오류가 발생했습니다.");
            setIsOpen(true); // Show modal
        }
    };

    const retrieveUserIds = async () => {
        try {
            const response = await publicApi.post('/api/auth/retrieve-ids', { email, code: verificationCode });
            setUserIds(response.data);
            let excludedWords = ["kakao ", "naver ", "google "];
            let ids = response.data.filter(id => 
                !excludedWords.some(excludedWord => id.includes(excludedWord)));
            setMessage(`가입되어 있는 아이디는 : ${ids.join(', ')} 입니다.`);
            setVerificationSuccess(true);
        } catch (error) {
            setMessage(error.response?.data || "이메일이 존재하지 않습니다.");
            setIsOpen(true);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <BasicLayout>
            <div className="w-full h-auto  p-6 px-80 py-10 flex flex-col items-center ">
                <div className="bg-white w-full h-auto rounded-2xl flex justify-between p-6 md:p-12 min-w-[500px] md:min-w-[700px] ">
                    <div className="w-1/2 h-[260px] mr-2 flex justify-center items-center bg-gray-900 rounded-2xl">
                        <SpaceShip />
                    </div>
                    <div className="w-1/2 rounded-2xl text-left">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                아이디 찾기
                            </h2>
                        </div>

                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-8 pt-6 pb-8">
                            {!emailSent ? (
                                <>
                                    <div>
                                        <label htmlFor="email" className="text-pink-500 block text-sm font-medium leading-6">
                                            이메일
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="이메일을 입력하세요"
                                                autoComplete="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={sendVerificationEmail}
                                            className="flex w-full justify-center mt-5 rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            인증 번호 전송
                                        </button>
                                    </div>
                                </>
                            ) : (
                                !verificationSuccess ? (
                                    <>
                                        <div>
                                            <label htmlFor="code" className="text-pink-500 block text-sm font-medium leading-6">
                                                인증 코드
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="code"
                                                    name="code"
                                                    type="text"
                                                    placeholder="인증 코드를 입력하세요"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                onClick={retrieveUserIds}
                                                className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                아이디 찾기
                                            </button>
                                        </div>
                                        <div className="mt-2 text-center text-sm text-pink-500">
                                            남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
                                        </div>
                                    </>
                                ) : (
                                    <div>
                                        <p className="mt-4 text-center text-2xl font-bold text-pink-500">{message}</p>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                onClick={handleLoginClick}
                                                className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                로그인하러 가기
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <ModalComponent setIsOpen={setIsOpen} message={message} callbackFunction={closeModal} />}
        </BasicLayout>
    );
}

export default FindIdForm;