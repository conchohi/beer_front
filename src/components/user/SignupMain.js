// src/components/SignupMain.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../../components/common/ModalComponent';

const SignupMain = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        nickname: '',
        email: '',
        profileImage: null,
    });
    const [preview, setPreview] = useState('/logo/basic.png'); // 기본 이미지 경로
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
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
            setPreview('/logo/basic.png'); // 파일이 없을 때 기본 이미지로 설정
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

    return (
        <>
            <BasicLayout>
                {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                            회원가입
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    프로필 이미지
                                </label>
                                <div className="mt-2 flex justify-center items-center">
                                    <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full border border-gray-300 object-cover" />
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="profileImage"
                                        name="profileImage"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-white hover:file:bg-orange-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    아이디
                                </label>
                                <div className="mt-2">
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
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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
                            </div>

                            <div>
                                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                                    닉네임
                                </label>
                                <div className="mt-2">
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
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    이메일
                                </label>
                                <div className="mt-2">
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
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    회원가입
                                </button>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            <a href="/login" className="font-semibold leading-6 text-orange-300 hover:text-orange-600">
                                로그인하러 가기
                            </a>
                        </p>
                    </div>
                </div>
            </BasicLayout>
        </>
    );
};

export default SignupMain;
