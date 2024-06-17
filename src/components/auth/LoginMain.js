import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import Astronaut2 from "../animation/Astronaut2";
import BasicModalComponent from "../common/BasicModalComponent";
import { publicApi } from "../../api/axios_intercepter";
import { onKakaoLogin, onNaverLogin, onGoogleLogin } from "../../api/socialApi";
import MovingCat from "../animation/MovingCat";

const LoginMain = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const [idValid, setIdValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const customCallback = () => {
    setIsOpen(false);
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
    const autoLoginEnabled = localStorage.getItem("auto_login") === "true";
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
      formData.append("username", loginId);
      formData.append("password", loginPassword);
      const response = await publicApi.post("/api/login", formData, {
        withCredentials: true,
      });

      // 헤더에서 액세스 토큰 추출
      const accessToken = response.headers["access"];

      const { nickname } = response.data;
      localStorage.setItem("access", accessToken); // 액세스 토큰 저장
      localStorage.setItem("nickname", nickname); // 닉네임 저장
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401)
        setMessage("아이디 혹은 비밀번호가 틀렸습니다.");
      else setMessage("서버 오류");
      setIsOpen(true);
      console.error("로그인 오류:", error);
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
      localStorage.setItem("auto_login", "true");
      localStorage.setItem("saved_password", password);
    } else {
      localStorage.removeItem("auto_login");
      localStorage.removeItem("saved_password");
    }

    await handleLogin(id, password);
  };

  return (
    <>
      {isOpen && (
        <BasicModalComponent
          message={message}
          callbackFunction={customCallback}
        />
      )}
      <BasicLayout>
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 rounded-x">
          <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="flex-none justify-center items-center bg-white p-6 md:p-1 mb-3 md:mb-0 hidden lg:flex">
              <MovingCat />
            </div>
            <div className="flex flex-1 flex-col justify-center items-center p-6 md:p-12 bg-white">
              <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="id"
                        className="text-pink-500 block text-sm font-bold"
                      >
                        아이디
                      </label>
                      <div className="text-sm">
                        <Link
                          to="/find/id"
                          className="text-xs text-pink-400 hover:text-pink-200"
                        >
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
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                      />
                      <div className="errorMessageWrap">
                        {!idValid && id.length > 0 && (
                          <div className="text-xs text-red-500">
                            올바른 아이디를 입력해주세요.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-pink-500 block text-sm font-bold"
                      >
                        비밀번호
                      </label>
                      <div className="text-sm">
                        <Link
                          to="/find/pwd"
                          className="text-xs text-pink-400 hover:text-pink-200"
                        >
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
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
                      />
                      <div className="errorMessageWrap">
                        {!passwordValid && password.length > 0 && (
                          <div className="text-xs text-red-500">
                            영문, 숫자 포함 8자 이상 입력해주세요.
                          </div>
                        )}
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
                      <label
                        htmlFor="saveId"
                        className="ml-2 block text-xs text-pink-400"
                      >
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
                      <label
                        htmlFor="autoLogin"
                        className="ml-2 block text-xs text-pink-400"
                      >
                        자동 로그인
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-md hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
                    >
                      로그인
                    </button>
                  </div>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                  <Link
                    to="/signup"
                    className="font-semibold leading-6 text-pink-500 hover:text-pink-600"
                  >
                    회원가입
                  </Link>
                </p>
                <hr className="my-6" />
                <div className="flex flex-col justify-center items-center mt-3 space-y-2">
                  <button
                    className="w-full flex items-center bg-yellow-300 px-3 py-2 rounded-md text-sm font-semibold leading-6 text-black shadow-md hover:bg-yellow-400"
                    onClick={onKakaoLogin}
                  >
                    <img
                      src="/login/kakaologin.png"
                      alt="Kakao Logo"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="flex-grow text-center">카카오 로그인</span>
                  </button>
                  <button
                    className="w-full flex items-center bg-green-500 px-3 py-2 rounded-md text-sm font-semibold leading-6 text-white shadow-md hover:bg-green-600"
                    onClick={onNaverLogin}
                  >
                    <img
                      src="/login/naverlogin.png"
                      alt="Naver Logo"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="flex-grow text-center">네이버 로그인</span>
                  </button>
                  <button
                    className="w-full flex items-center border-1 border-gray-300 bg-gray-50 px-4 py-2 rounded-md text-sm font-semibold leading-6 text-black shadow-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={onGoogleLogin}
                  >
                    <img
                      src="/login/googlelogin.png"
                      alt="Google Logo"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="flex-grow text-center">구글 로그인</span>
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
