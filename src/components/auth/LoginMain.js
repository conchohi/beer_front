import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import Astronaut2 from '../animation/Astronaut2';
import BasicModalComponent from '../common/BasicModalComponent';
import { publicApi } from '../../api/axios_intercepter';
import { onKakaoLogin, onNaverLogin } from '../../api/socialApi';

const LoginMain = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [saveId, setSaveId] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);

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
        validateId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const validateId = (value) => {
        const regex = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;
        setIdValid(regex.test(value));
    };

    const validatePassword = (value) => {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,13}$/;
        setPasswordValid(regex.test(value));
    };

    useEffect(() => {
        const savedId = localStorage.getItem("saved_id");
        const autoLoginEnabled = localStorage.getItem("auto_login") === 'true';
        const savedPassword = localStorage.getItem("saved_password");

        if (savedId) {
            setId(savedId);
            setSaveId(true);
            validateId(savedId);
        }
        if (autoLoginEnabled && savedPassword) {
            setAutoLogin(true);
            setPassword(savedPassword);
            validatePassword(savedPassword);
            autoLoginSubmit(savedId, savedPassword);
        }
    }, []);

    const autoLoginSubmit = async (autoId, autoPassword) => {
        await handleLogin(autoId, autoPassword);
    };
    const handleLogin = async (loginId, loginPassword) => {
        try {
            let formData = new FormData();
            formData.append('username', loginId);
            formData.append('password', loginPassword);
            const response = await publicApi.post('/api/login', formData, {
                withCredentials: true
            });
    
            // 헤더에서 액세스 토큰 추출
            const accessToken = response.headers['access'];
    
            setMessage("로그인 성공!");
            setIsOpen(true);
    
            const { nickname } = response.data;
            localStorage.setItem('access', accessToken); // 액세스 토큰 저장
            localStorage.setItem('nickname', nickname); // 닉네임 저장
        } catch (error) {
            if (error.response?.status === 401) setMessage('아이디 혹은 비밀번호가 틀렸습니다.');
            else setMessage('서버 오류');
            setIsOpen(true);
            console.error('로그인 오류:', error);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idValid || !passwordValid) {
            alert("유효한 아이디와 비밀번호를 입력해주세요.");
            return;
        }

        if (saveId) {
            localStorage.setItem("saved_id", id);
        } else {
            localStorage.removeItem("saved_id");
        }

        if (autoLogin) {
            localStorage.setItem("auto_login", 'true');
            localStorage.setItem("saved_password", password);
        } else {
            localStorage.removeItem("auto_login");
            localStorage.removeItem("saved_password");
        }

        await handleLogin(id, password);
    };

    return (
        <>
            {isOpen && <BasicModalComponent message={message} callbackFunction={customCallback} />}
            <BasicLayout>
                <div className="w-full h-auto font-bold text-2xl md:text-4xl text-black font-sans p-6 md:px-60 md:py-30 flex flex-col ">
                    <div className="bg-gray-700 w-full h-auto rounded-2xl flex p-6 md:p-12 ">
                        <div className="w-1/2 flex justify-center items-center bg-gray-900 rounded-2xl">
                            <Astronaut2 />
                        </div>
                        <div className="w-1/2 rounded-2xl text-left">
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
                                                <Link to="/find/id" className="font-semibold text-pink-500 hover:text-pink-200">
                                                    아이디를 잊으셨나요?
                                                </Link>
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
                                                <Link to="/find/pwd" className="font-semibold text-pink-500 hover:text-pink-200">
                                                    비밀번호를 잊으셨나요?
                                                </Link>
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

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="saveId"
                                                name="saveId"
                                                type="checkbox"
                                                checked={saveId}
                                                onChange={(e) => setSaveId(e.target.checked)}
                                                className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                            />
                                            <label htmlFor="saveId" className="ml-2 block text-sm text-gray-900">
                                                아이디 저장
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="autoLogin"
                                                name="autoLogin"
                                                type="checkbox"
                                                checked={autoLogin}
                                                onChange={(e) => setAutoLogin(e.target.checked)}
                                                className="h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                            />
                                            <label htmlFor="autoLogin" className="ml-2 block text-sm text-gray-900">
                                                자동 로그인
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            로그인
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-4 text-center text-sm text-gray-500">
                                    <Link to="/signup" className="font-semibold leading-6 text-pink-500 hover:text-orange-600">
                                        회원가입하러 가기
                                    </Link>
                                </p>
                                <hr className="my-8" />
                                <div className="flex flex-col justify-center items-center mt-3 space-y-4">
                                    <button className="w-full flex items-center bg-yellow-400 px-4 py-2 rounded-md text-sm font-semibold leading-6 text-black shadow-sm hover:bg-yellow-500"
                                        onClick={onKakaoLogin}>
                                        <img src="/login/kakaologin.png" alt="Kakao Logo" className="w-6 h-6 mr-2" />
                                        <span className="flex-grow text-center">카카오 로그인</span>
                                    </button>
                                    <button className="w-full flex items-center bg-green-500 px-4 py-2 rounded-md text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600"
                                        onClick={onNaverLogin}>
                                        <img src="/login/naverlogin.png" alt="Naver Logo" className="w-6 h-6 mr-2" />
                                        <span className="flex-grow text-center">네이버 로그인</span>
                                    </button>
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
