import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../../components/common/ModalComponent';
import Astronaut2 from '../animation/Astronaut2';
import Locket from '../animation/Locket';
import SpaceShip from '../animation/SpaceShip';
import SpaceCat from '../animation/SpaceCat';
import Astronaut3 from '../animation/Astronaut3';
import Space from '../animation/Space';
import Beer2 from '../animation/Beer2';
import Astronaut4 from '../animation/Astronaut4';

const SignupMain = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        passwordChk: '',
        nickname: '',
        email: '',
        profileImage: null,
        verificationCode: '',
    });
    const [preview, setPreview] = useState('/logo/basic.png');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [sentVerificationCode, setSentVerificationCode] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (name === 'password' || name === 'passwordChk') {
            setPasswordsMatch(value === user.passwordChk || value === user.password);
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            setPasswordValid(passwordRegex.test(value));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser({ ...user, profileImage: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview('/logo/basic.png');
        }
    };

    const customCallback = () => {
        if (message === '회원가입 성공!') {
            navigate("/login");
        } else {
            setIsOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.username || !user.password || !user.nickname || !user.email) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (!isUsernameAvailable) {
            alert("아이디 중복체크를 해주세요.");
            return;
        }

        if (!isNicknameAvailable) {
            alert("닉네임 중복체크를 해주세요.");
            return;
        }

        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }

        if (!passwordsMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!passwordValid) {
            alert("비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.");
            return;
        }

        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('password', user.password);
        formData.append('nickname', user.nickname);
        formData.append('email', user.email);
        if (user.profileImage) {
            formData.append('profileFile', user.profileImage);
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/join', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage("회원가입 성공!");
            setIsOpen(true);
        } catch (error) {
            setMessage('회원가입 실패. 다시 시도해주세요.');
            setIsOpen(true);
            console.error('회원가입 오류:', error);
        }
    };

    const checkUsernameAvailability = async () => {
        if (!user.username) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/auth/check-username?username=${user.username}`);
            if (response.data.available) {
                setIsUsernameAvailable(true);
                alert("사용 가능한 아이디입니다.");
            } else {
                setIsUsernameAvailable(false);
                alert("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            console.error('아이디 중복체크 오류:', error);
        }
    };

    const checkNicknameAvailability = async () => {
        if (!user.nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/auth/check-nickname?nickname=${user.nickname}`);
            if (response.data.available) {
                setIsNicknameAvailable(true);
                alert("사용 가능한 닉네임입니다.");
            } else {
                setIsNicknameAvailable(false);
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error('닉네임 중복체크 오류:', error);
        }
    };

    const sendVerificationEmail = async () => {
        if (!user.email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/send-verification-email', { email: user.email });
            setSentVerificationCode(response.data.verificationCode);
            alert("인증 이메일이 발송되었습니다.");
        } catch (error) {
            console.error('이메일 인증 오류:', error);
        }
    };

    const verifyEmailCode = () => {
        if (user.verificationCode === sentVerificationCode) {
            setIsEmailVerified(true);
            alert("이메일 인증이 완료되었습니다.");
        } else {
            setIsEmailVerified(false);
            alert("인증번호가 올바르지 않습니다.");
        }
    };

    return (
        <>
            <BasicLayout>
            <div className="w-full h-auto font-bold text-2xl md:text-4xl text-white font-sans p-6 md:px-60 md:py-18 flex flex-col ">
                    <div className="bg-gray-700 w-full h-auto rounded-2xl flex p-6 md:p-10 ">
                        
                        {/* 왼쪽 애니메이션 */}
                        <div className="w-1/2 my-5 flex justify-center items-center bg-gray-900 rounded-2xl ">
                            <div className='row'>
                               <SpaceCat />
                            </div>
                        </div>

                        {/* 오른쪽 회원가입창 */}
                        <div className="w-1/2 rounded-2xl text-left ">
                            {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                                
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                        회원가입
                                    </h2>
                                </div>

                                <div className=" mt-2 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-6 pt-6 pb-8">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* <div>
                                            <div className="flex justify-center items-center">
                                                <img src={preview} alt="Profile Preview" className="w-28 h-28 rounded-full border border-gray-300 object-cover" />
                                            </div>
                                            <label className="block text-sm font-medium leading-6 text-center text-pink-500 mt-1">
                                                프로필 이미지
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="profileImage"
                                                    name="profileImage"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-pink-400"
                                                />
                                            </div>
                                        </div> */}

                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-pink-500">
                                                아이디
                                            </label>
                                            <div className="mt-2 flex">
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="아이디를 입력하세요"
                                                    required
                                                    value={user.username}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={checkUsernameAvailability}
                                                    className="ml-4 px-4 py-2 w-32 rounded-md bg-pink-500  text-sm font-semibold hover:bg-pink-600"
                                                >
                                                    중복체크
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-pink-500">
                                                비밀번호
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="비밀번호를 입력하세요"
                                                    required
                                                    value={user.password}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                            {!passwordValid && (
                                                <div className="text-red-500 text-sm mt-1">비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.</div>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="passwordChk" className="block text-sm font-medium leading-6 text-pink-500">
                                                비밀번호 확인
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="passwordChk"
                                                    name="passwordChk"
                                                    type="password"
                                                    placeholder="비밀번호를 다시 입력하세요"
                                                    required
                                                    value={user.passwordChk}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                            {!passwordsMatch && (
                                                <div className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</div>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-pink-500">
                                                닉네임
                                            </label>
                                            <div className="mt-2 flex">
                                                <input
                                                    id="nickname"
                                                    name="nickname"
                                                    type="text"
                                                    placeholder="닉네임을 입력하세요"
                                                    required
                                                    value={user.nickname}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={checkNicknameAvailability}
                                                    className="ml-4 px-4 py-2 w-32 rounded-md bg-pink-500  text-sm font-semibold hover:bg-pink-600"
                                                >
                                                    중복체크
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-pink-500">
                                                이메일
                                            </label>
                                            <div className="mt-2 flex">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="이메일을 입력하세요"
                                                    required
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={sendVerificationEmail}
                                                    className="ml-4 px-4 py-2 w-40 rounded-md bg-pink-500 text-sm font-semibold hover:bg-pink-600"
                                                >
                                                    이메일 확인
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="verificationCode" className="block text-sm font-medium leading-6 text-pink-500">
                                                인증번호
                                            </label>
                                            <div className="mt-2 flex">
                                                <input
                                                    id="verificationCode"
                                                    name="verificationCode"
                                                    type="text"
                                                    placeholder="인증번호를 입력하세요"
                                                    required
                                                    value={user.verificationCode}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={verifyEmailCode}
                                                    className="ml-4 px-4 py-2 w-48 rounded-md bg-pink-500  text-sm font-semibold hover:bg-pink-600"
                                                >
                                                    인증번호 확인
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={!passwordsMatch || !passwordValid}
                                                className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                                    passwordsMatch && passwordValid ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                            >
                                                회원가입
                                            </button>
                                        </div>
                                    </form>

                                    <p className="mt-8 text-center text-sm text-gray-500 bg-gray-100 hover:bg-pink-400 rounded-md py-2 shadow-sm">
                                        <a href="/login" className="font-semibold leading-6 text-gray-600 ">
                                            로그인하러 가기
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
              
            </BasicLayout>
        </>
    );
};

export default SignupMain;
