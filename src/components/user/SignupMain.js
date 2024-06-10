import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../../components/common/ModalComponent';
import SpaceCat from '../animation/SpaceCat';

const SignupMain = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordChk: '',
        nickname: '',
        email: '',
        role: 'USER',
        profileFile: null,
        isDelete: 'false'
    });

    const [preview, setPreview] = useState('/logo/basic.png');
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileFile') {
            setFormData({
                ...formData,
                profileFile: files[0]
            });

            if (files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(files[0]);
            } else {
                setPreview('/logo/basic.png');
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });

            if (name === 'password' || name === 'passwordChk') {
                setPasswordsMatch(formData.password === value || formData.password === formData.passwordChk);
            }

            if (name === 'password') {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
                setPasswordValid(passwordRegex.test(value));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordValid) {
            alert("비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.");
            return;
        }
        if (!passwordsMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/join', form);
            console.log(response.data);
            setMessage('회원가입이 완료되었습니다.');
            setIsOpen(true);
        } catch (error) {
            console.error(error);
            setMessage('회원가입에 실패했습니다.');
            setIsOpen(true);
        }
    };

    const checkUsernameAvailability = async () => {
        if (!formData.username) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/id-check', { id: formData.username });
            if (response.data.message === 'Success.') {
                setIsUsernameAvailable(false);
                alert("사용 가능한 아이디입니다.");
            } else {
                setIsUsernameAvailable(true);
                alert("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            console.error('아이디 중복체크 오류:', error);
            setIsUsernameAvailable(false);
            alert("아이디 중복체크 오류가 발생했습니다.");
        }
    };

    const customCallback = () => {
        setIsOpen(false);
    };

    return (
        <>
            <BasicLayout>
                <div className="w-full h-auto font-bold text-2xl md:text-4xl text-black font-sans p-6 md:px-60 md:py-30 flex flex-col ">
                    <div className="bg-gray-700 w-full h-auto rounded-2xl flex p-6 md:p-12 ">
                        <div className="w-1/2 flex justify-center items-center bg-gray-900 rounded-2xl">
                            <div className='row'>
                                <SpaceCat />
                            </div>
                        </div>
                        <div className="w-1/2 rounded-2xl text-left">
                            {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                    <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                        회원가입
                                    </h2>
                                </div>

                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-8 pt-6 pb-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium leading-6 text-pink-500">
                                                프로필 이미지
                                            </label>
                                            <div className="mt-2 flex justify-center items-center">
                                                <img src={preview} alt="Profile Preview" className="w-32 h-32 rounded-full border border-gray-300 object-cover" />
                                            </div>
                                            <div className="mt-2">
                                                <input
                                                    id="profileFile"
                                                    name="profileFile"
                                                    type="file"
                                                    onChange={handleChange}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-500 file:text-black hover:file:bg-orange-600"
                                                />
                                            </div>
                                        </div>

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
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={checkUsernameAvailability}
                                                    className="ml-4 px-4 py-2 w-32 rounded-md bg-pink-500 text-black text-sm font-semibold hover:bg-orange-600"
                                                >
                                                    중복체크
                                                </button>
                                            </div>
                                            {isUsernameAvailable === false && (
                                                <div className="text-red-500 text-sm mt-1">이미 사용 중인 아이디입니다.</div>
                                            )}
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
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                            {!passwordValid && (
                                                <div className="text-red-500 text-sm mt-1">비밀번호는 영문, 숫자 및 특수 문자를 포함하여 8자 이상이어야 합니다.</div>
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
                                                    value={formData.passwordChk}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                            {formData.passwordChk && !passwordsMatch && (
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
                                                    value={formData.nickname}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
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
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-pink-500 hover:bg-orange-600`}
                                            >
                                                회원가입
                                            </button>
                                        </div>
                                    </form>

                                    <p className="mt-4 text-center text-sm text-gray-500">
                                        <a href="/login" className="font-semibold leading-6 text-pink-500 hover:text-orange-600">
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
