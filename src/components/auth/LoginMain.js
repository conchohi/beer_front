import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../common/ModalComponent';
import Astronaut2 from '../animation/Astronaut2';

const LoginMain = () => {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('123');
    const [userid, setUserid] = useState('234');
    const [password, setPassword] = useState('');

    const [idValid, setIdValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const customCallback = () => {
        if (message === '로그인 성공!') {
            navigate("/");
        } else {
            setIsOpen(false);
        }
    };

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;
        if (regex.test(e.target.value)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,13}$/;
        if (regex.test(e.target.value)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idValid || !passwordValid) {
            alert("유효한 아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('username', id);
            formData.append('password', password);
            const response = await axios.post('http://localhost:8080/login', formData, {
                withCredentials: true
            });
            setMessage("로그인 성공!");
            setIsOpen(true);
            const { access, nickname } = response.data;
            localStorage.setItem('access', access);
            localStorage.setItem('nickname', nickname);

        } catch (error) {
            if (error.response.status === 401) setMessage('아이디 혹은 비밀번호가 틀렸습니다.');
            else setMessage('서버 오류');
            setIsOpen(true);
            console.error('로그인 오류:', error);
        }
    };

    return (
        <>
            <BasicLayout>
                <div className="w-full h-auto font-bold text-2xl md:text-4xl text-black font-sans p-6 md:px-60 md:py-30 flex flex-col ">
                    <div className="bg-gray-700 w-full h-auto rounded-2xl flex p-6 md:p-12 ">
                        <div className="w-1/2 flex justify-center items-center bg-gray-900 rounded-2xl">
                            <Astronaut2 />
                        </div>
                        <div className="w-1/2 rounded-2xl text-left">
                            {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                    로그인
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-8 pt-6 pb-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="id" className="text-pink-500 block text-sm font-medium leading-6">
                                                아이디
                                            </label>
                                            <div className="text-sm">
                                                <a href="/find/id" className="font-semibold text-indigo-400 hover:text-indigo-600">
                                                    아이디를 잊으셨나요?
                                                </a>
                                            </div>
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
                                                {
                                                    !idValid && id.length > 0 && (
                                                        <div className="text-xs text-red-500">올바른 아이디를 입력해주세요.</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-pink-500">
                                                비밀번호
                                            </label>
                                            <div className="text-sm">
                                                <a href="/find/pwd" className="font-semibold text-indigo-400 hover:text-indigo-600">
                                                    비밀번호를 잊으셨나요?
                                                </a>
                                            </div>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="비밀번호를 입력하세요"
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={handlePassword}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                            />
                                            <div className='errorMessageWrap'>
                                                {
                                                    !passwordValid && password.length > 0 && (
                                                        <div className="text-xs text-red-500">영문, 숫자 포함 8자 이상 입력해주세요.</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            onClick={handleSubmit}
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            로그인
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-4 text-center text-sm text-gray-500">
                                    <a href="/signup" className="font-semibold leading-6 text-pink-500 hover:text-orange-600">
                                        회원가입하러 가기
                                    </a>
                                </p>
                                <hr className="my-8" />
                                <div className="flex flex-col justify-center items-center mt-3 space-y-4">
                                    <a href='http://localhost:8080/oauth2/authorization/kakao' className="w-full">
                                        <button className="w-full flex items-center justify-center bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-500">
                                            카카오 로그인
                                        </button>
                                    </a>
                                    <a href='http://localhost:8080/oauth2/authorization/naver' className="w-full">
                                        <button className="w-full flex items-center justify-center bg-green-500 px-4 py-2 rounded-md text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600">
                                            네이버 로그인
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BasicLayout>
        </>
    );
};

export default LoginMain;
