import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import ModalComponent from '../common/ModalComponent';
import Astronaut5 from '../animation/Astronaut5';

const SignupMain = () => {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        passwordChk: '',
        nickname: '',
        email: '',
        role: 'USER',
        profileFile: null,
        isDelete: 'false',
        mbti: '',
        gender: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isIdAvailable, setIsIdAvailable] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [idValid, setIdValid] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profileFile' ? files[0] : value
        });

        if (name === 'password' || name === 'passwordChk') {
            setPasswordsMatch(name === 'password'
                ? value === formData.passwordChk
                : formData.password === value);
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
            setPasswordValid(passwordRegex.test(value));
        }

        if (name === 'id') {
            handleIdChange(e);
        }
    };

    const handleIdChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            id: value
        });
        const regex = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;
        if (regex.test(value)) {
            setIdValid(true);
        } else {
            setIdValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idValid) {
            alert("유효한 아이디를 입력해주세요.");
            return;
        }
        if (!passwordValid) {
            alert("비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.");
            return;
        }
        if (!passwordsMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const { id, password, nickname, email, mbti, gender } = formData;

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/join', {
                id,
                password,
                nickname,
                email,
                mbti,
                gender
            });
            console.log(response.data);
            setMessage('회원가입이 완료되었습니다.');
            setIsOpen(true);
        } catch (error) {
            console.error(error);
            setMessage('회원가입에 실패했습니다.');
            setIsOpen(true);
        }
    };

    const checkIdAvailability = async () => {
        if (!formData.id) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/id-check', { id: formData.id });
            if (response.data.message === 'Success.') {
                setIsIdAvailable(true);
                alert("사용 가능한 아이디입니다.");
            } else {
                setIsIdAvailable(false);
                alert("이미 사용 중인 아이디입니다.");
            }
        } catch (error) {
            console.error('아이디 중복체크 오류:', error);
            setIsIdAvailable(false);
            alert("아이디 중복체크 오류가 발생했습니다.");
        }
    };

    const customCallback = () => {
        setIsOpen(false);
        if (message === '회원가입이 완료되었습니다.') {
            navigate('/login');
        }
    };

    return (
        <BasicLayout>
            <div className="w-full h-auto font-bold text-xl md:text-4xl text-black font-sans p-6 md:px-60 md:py-30 flex flex-col ">
                <div className="bg-gray-700 w-full h-auto rounded-2xl flex md:p-12 ">
                    <div className="w-1/2 flex justify-center items-center bg-gray-900 rounded-xl">
                        <div className='row'>
                            <Astronaut5 />
                        </div>
                    </div>
                    <div className="w-1/2 rounded-xl text-left">
                        {isOpen && <ModalComponent message={message} callbackFunction={customCallback} />}
                        <div className="flex min-h-full flex-1 flex-col justify-center">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-pink-500">
                                    회원가입
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded px-8 pt-6 pb-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="id" className="block text-xl font-medium leading-6 text-pink-500">
                                            아이디
                                        </label>
                                        <div className="mt-2 flex">
                                            <input
                                                id="id"
                                                name="id"
                                                type="text"
                                                placeholder="아이디를 입력하세요"
                                                required
                                                value={formData.id}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                                            />
                                            <button
                                                type="button"
                                                onClick={checkIdAvailability}
                                                className="ml-4 px-4 py-2 w-40 rounded-md bg-pink-500 text-black text-xl font-semibold hover:bg-blue-600"
                                            >
                                                중복체크
                                            </button>
                                        </div>
                                        {isIdAvailable === false && (
                                            <div className="text-red-500 text-sm mt-1">이미 사용 중인 아이디입니다.</div>
                                        )}
                                        <div className='errorMessageWrap'>
                                            {
                                                !idValid && formData.id.length > 0 && (
                                                    <div className="text-xs text-red-500">올바른 아이디를 입력해주세요.</div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-xl font-medium leading-6 text-pink-500">
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
                                            <div className="text-red-500 text-sm mt-1">비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.</div>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="passwordChk" className="block text-xl font-medium leading-6 text-pink-500">
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
                                        <label htmlFor="nickname" className="block text-xl font-medium leading-6 text-pink-500">
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
                                        <label htmlFor="email" className="block text-xl font-medium leading-6 text-pink-500">
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

                                    <div className="flex items-center space-x-4 text-xl">
                                        <div className="w-1/2">
                                            <label className="block font-medium leading-6 text-pink-500">
                                                성별
                                            </label>
                                            <div className="mt-2 flex space-x-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id="male"
                                                        name="gender"
                                                        type="radio"
                                                        value="male"
                                                        checked={formData.gender === 'male'}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="남자" className="ml-2 block font-medium text-pink-500">
                                                        남
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="female"
                                                        name="gender"
                                                        type="radio"
                                                        value="female"
                                                        checked={formData.gender === 'female'}
                                                        onChange={handleChange}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="여자" className="ml-2 block font-medium text-pink-500">
                                                        여
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <label htmlFor="mbti" className="block font-medium leading-6 text-pink-500">
                                                MBTI
                                            </label>
                                            <div className="mt-2 flex">
                                                <select
                                                    id="mbti"
                                                    name="mbti"
                                                    value={formData.mbti}
                                                    onChange={handleChange}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 placeholder-gray-400 py-2 px-3"
                                                >
                                                    <option value="">MBTI</option>
                                                    <option value="INTJ">INTJ</option>
                                                    <option value="INTP">INTP</option>
                                                    <option value="ENTJ">ENTJ</option>
                                                    <option value="ENTP">ENTP</option>
                                                    <option value="INFJ">INFJ</option>
                                                    <option value="INFP">INFP</option>
                                                    <option value="ENFJ">ENFJ</option>
                                                    <option value="ENFP">ENFP</option>
                                                    <option value="ISTJ">ISTJ</option>
                                                    <option value="ISFJ">ISFJ</option>
                                                    <option value="ESTJ">ESTJ</option>
                                                    <option value="ESFJ">ESFJ</option>
                                                    <option value="ISTP">ISTP</option>
                                                    <option value="ISFP">ISFP</option>
                                                    <option value="ESTP">ESTP</option>
                                                    <option value="ESFP">ESFP</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className={`flex w-full justify-center rounded-md px-4 py-2 text-xl font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-pink-500 hover:bg-blue-600`}
                                        >
                                            회원가입
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-4 text-center text-xl text-gray-500">
                                    <a href="/login" className="font-semibold leading-6 text-pink-500 hover:text-blue-600">
                                        로그인하러 가기
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
};

export default SignupMain;
