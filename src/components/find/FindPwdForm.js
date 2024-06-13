import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../common/ModalComponent';
import SpaceShip from '../animation/SpaceShip';
import { publicApi } from '../../api/axios_intercepter';

const FindPwdForm = () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [idValid, setIdValid] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const customCallback = () => {
        if (message === '비밀번호가 성공적으로 변경되었습니다.') {
            navigate("/login");
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (emailSent && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [emailSent, timeLeft]);

    const sendVerificationEmail = async () => {
        try {
            await publicApi.post('/api/auth/send-password-reset-code', { userId: id, email });
            setEmailSent(true);
            setMessage("인증번호가 전송되었습니다.");
            setIsOpen(true);
            setTimeLeft(300); // Reset countdown timer
        } catch (error) {
            setMessage("유저가 존재하지 않습니다.");
            setIsOpen(true);
        }
    };

    const verifyCode = async () => {
        try {
            await publicApi.post('/api/auth/verify-reset-code', { id, email, certificationNumber: verificationCode });
            setCodeVerified(true);
            setMessage("인증번호가 확인되었습니다. 비밀번호를 입력하세요.");
            setIsOpen(true);
        } catch (error) {
            setMessage(error.response?.data || "인증번호가 올바르지 않습니다.");
            setIsOpen(true);
        }
    };

    const handleId = (e) => {
        const inputId = e.target.value;
        setId(inputId);
        const regex = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;
        if (regex.test(inputId)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    };

    const updatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            setIsOpen(true);
            return;
        }

        try {
            await publicApi.post('/api/auth/update-password', { userId: id, email, newPassword });
            setMessage("비밀번호가 성공적으로 변경되었습니다.");
            setIsOpen(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000); // Navigate to login page after 3 seconds
        } catch (error) {
            setMessage(error.response?.data || "비밀번호 변경에 오류가 발생했습니다.");
            setIsOpen(true);
        }
    };

    return (
        <>
            {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
            <BasicLayout>
                <div className="w-full h-auto  p-6 px-80 py-10 flex flex-col items-center ">
                    <div className="bg-white w-full h-auto rounded-2xl flex justify-between p-6 md:p-12 min-w-[500px] md:min-w-[700px]">
                        <div className="w-1/2 h-[350px] mr-2 flex justify-center items-center bg-gray-900 rounded-2xl">
                            <SpaceShip />
                        </div>
                        <div className="w-1/2  rounded-2xl text-left ">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                    비밀번호 찾기
                                </h2>
                            </div>

                            <div className="my-5 pb-6 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-8 pt-6 pb5-8">
                                {!emailSent ? (
                                    <>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="id" className="text-pink-500 block text-sm font-medium leading-6">
                                                    아이디
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="id"
                                                    name="id"
                                                    type="text"
                                                    placeholder="아이디를 입력하세요"
                                                    autoComplete="id"
                                                    required
                                                    value={id}
                                                    onChange={handleId}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <div className='errorMessageWrap'>
                                                    {!idValid && id.length > 0 && (
                                                        <div className="text-xs text-red-500">올바른 아이디를 입력해주세요.</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between mt-2">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-pink-500">
                                                    이메일
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
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
                                                className="flex w-full justify-center mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                인증 번호 전송
                                            </button>
                                        </div>
                                    </>
                                ) : !codeVerified ? (
                                    <>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="verificationCode" className="text-pink-500 block text-sm font-medium leading-6">
                                                    인증 코드
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="verificationCode"
                                                    name="verificationCode"
                                                    type="text"
                                                    placeholder="인증 코드를 입력하세요"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                onClick={verifyCode}
                                                className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                인증 코드 확인
                                            </button>
                                        </div>
                                        <div className="mt-2 text-center text-sm text-pink-500">
                                            남은 시간: {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="newPassword" className="text-pink-500 block text-sm font-medium leading-6">
                                                    새 비밀번호
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type="password"
                                                    placeholder="새 비밀번호를 입력하세요"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="confirmPassword" className="text-pink-500 block text-sm font-medium leading-6">
                                                    비밀번호 확인
                                                </label>
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    placeholder="비밀번호를 다시 입력하세요"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                onClick={updatePassword}
                                                className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                비밀번호 변경
                                            </button>
                                        </div>
                                    </>
                                )}
                                
                                <div className="mt-2 text-center text-sm text-gray-500">
                                    <span onClick={() => navigate('/find/id')} className="font-semibold leading-6 text-pink-500 hover:text-pink-600 cursor-pointer">
                                        아이디를 잊어 버리셨나요?
                                    </span>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </BasicLayout>
        </>
    );
};

export default FindPwdForm;
