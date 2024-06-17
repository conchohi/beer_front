import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../common/ModalComponent";
import EmailVerification from "./check/EmailVerification";
import { publicApi } from "../../../api/axios_intercepter";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordChk: "",
    nickname: "",
    email: "",
    role: "USER",
    profileFile: null,
    isDelete: "false",
    mbti: "",
    gender: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [idValid, setIdValid] = useState({ valid: false, message: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileFile" ? files[0] : value,
    });

    if (name === "password" || name === "passwordChk") {
      setPasswordsMatch(
        name === "password"
          ? value === formData.passwordChk
          : formData.password === value
      );
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      setPasswordValid(passwordRegex.test(value));
    }

    if (name === "id") {
      handleIdChange(e);
    }
  };

  const handleIdChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      id: value,
    });

    const minLength = 5;
    const maxLength = 10;
    const regex = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;

    if (value.length < minLength) {
      setIdValid({ valid: false, message: "아이디가 너무 짧습니다." });
    } else if (value.length > maxLength) {
      setIdValid({ valid: false, message: "아이디가 너무 깁니다." });
    } else if (!regex.test(value)) {
      setIdValid({ valid: false, message: "사용할 수 없는 아이디입니다." });
    } else {
      setIdValid({ valid: true, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idValid.valid) {
      setModalContent("유효한 아이디를 입력해주세요.");
      setIsOpen(true);
      return;
    }
    if (!passwordValid) {
      setModalContent(
        "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다."
      );
      setIsOpen(true);
      return;
    }
    if (!passwordsMatch) {
      setModalContent("비밀번호가 일치하지 않습니다.");
      setIsOpen(true);
      return;
    }
    if (!isNicknameAvailable) {
      setModalContent("닉네임 중복체크를 해주세요.");
      setIsOpen(true);
      return;
    }
    if (!isEmailVerified) {
      setModalContent("이메일 인증을 완료해주세요.");
      setIsOpen(true);
      return;
    }

    const { id, password, nickname, email, mbti, gender } = formData;

    try {
      const response = await publicApi.post("/api/user/join", {
        id,
        password,
        nickname,
        email,
        mbti,
        gender,
      });
      console.log(response.data);
      setModalContent("회원가입이 완료되었습니다.");
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      setModalContent("회원가입에 실패했습니다.");
      setIsOpen(true);
    }
  };

  const checkIdAvailability = async () => {
    if (!formData.id) {
      setModalContent("아이디를 입력해주세요.");
      setIsOpen(true);
      return;
    }

    try {
      const response = await publicApi.post("/api/user/id-check", {
        id: formData.id,
      });
      if (response.data.message === "Success.") {
        setIsIdAvailable(true);
        setModalContent("사용 가능한 아이디입니다.");
        setIsOpen(true);
      } else {
        setIsIdAvailable(false);
        setModalContent("이미 사용 중인 아이디입니다.");
        setIsOpen(true);
      }
    } catch (error) {
      console.error("아이디 중복체크 오류:", error);
      setIsIdAvailable(false);
      setModalContent("아이디 중복체크 오류가 발생했습니다.");
      setIsOpen(true);
    }
  };

  const checkNicknameAvailability = async () => {
    if (!formData.nickname) {
      setModalContent("닉네임을 입력해주세요.");
      setIsOpen(true);
      return;
    }

    try {
      const response = await publicApi.post("/api/user/nickname-check", {
        nickname: formData.nickname,
      });
      if (response.data.message === "Success.") {
        setIsNicknameAvailable(true);
        setModalContent("사용 가능한 닉네임입니다.");
        setIsOpen(true);
      } else {
        setIsNicknameAvailable(false);
        setModalContent("이미 사용 중인 닉네임입니다.");
        setIsOpen(true);
      }
    } catch (error) {
      console.error("닉네임 중복체크 오류:", error);
      setIsNicknameAvailable(false);
      setModalContent("닉네임 중복체크 오류가 발생했습니다.");
      setIsOpen(true);
    }
  };

  const customCallback = () => {
    setIsOpen(false);
    if (modalContent === "회원가입이 완료되었습니다.") {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center">
      {isOpen && (
        <ModalComponent
          message={modalContent}
          callbackFunction={customCallback}
        />
      )}
      <div className="">
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-widest text-pink-500 pt-3">
          JOIN
        </h2>
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md rounded">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-semibold leading-6 tracking-widest text-pink-500"
            >
              ID
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
              />
              <button
                type="button"
                onClick={checkIdAvailability}
                className="ml-4 px-4 py-2 w-4/12 rounded-md bg-pink-500 text-xs tracking-widest text-white font-extrabold hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                CHECK
              </button>
            </div>
            {isIdAvailable === false && (
              <div className="text-red-500 text-sm mt-1">
                이미 사용 중인 아이디입니다.
              </div>
            )}
            <div className="errorMessageWrap">
              {!idValid.valid && formData.id.length > 0 && (
                <div className="text-xs text-red-500">{idValid.message}</div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold tracking-wider leading-6 text-pink-500"
            >
              PASSWORD
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
              />
            </div>
            {!passwordValid && (
              <div className="text-red-500 text-sm mt-1">
                비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordChk"
              className="block text-sm font-bold tracking-wider leading-6 text-pink-500"
            >
              PASSWORD CHECK
            </label>
            <div className="mt-1">
              <input
                id="passwordChk"
                name="passwordChk"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                required
                value={formData.passwordChk}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
              />
            </div>
            {formData.passwordChk && !passwordsMatch && (
              <div className="text-red-500 text-sm mt-1">
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm  tracking-wider font-bold leading-6 text-pink-500 "
            >
              NICKNAME
            </label>
            <div className="mt-1 flex">
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                required
                value={formData.nickname}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 text-sm py-2 px-3"
              />
              <button
                type="button"
                onClick={checkNicknameAvailability}
                className="ml-4 px-4 py-2 w-4/12 rounded-md tracking-widest bg-pink-500 text-xs text-white font-extrabold hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                CHECK
              </button>
            </div>
            {isNicknameAvailable === false && (
              <div className="text-red-500 text-sm mt-1">
                이미 사용 중인 닉네임입니다.
              </div>
            )}
          </div>

          <EmailVerification
            formData={formData}
            setFormData={setFormData}
            isEmailVerified={isEmailVerified}
            setIsEmailVerified={setIsEmailVerified}
            setModalContent={setModalContent}
            setIsOpen={setIsOpen}
          />

          <div className="flex items-center space-x-4">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-bold tracking-wider leading-6 text-pink-500">
                GENDER
              </label>
              <div className="mt-2 flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="남자"
                    checked={formData.gender === "남자"}
                    onChange={handleChange}
                    className="h-3 w-3 border-gray-300 text-pink-500 focus:ring-pink-500"
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 block text-sm font-normal text-pink-500"
                  >
                    남자
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="여자"
                    checked={formData.gender === "여자"}
                    onChange={handleChange}
                    className="h-3 w-3 border-gray-300 text-pink-500 focus:ring-pink-500"
                  />
                  <label
                    htmlFor="female"
                    className="ml-2 block text-sm font-normal text-pink-500"
                  >
                    여자
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="mbti"
                className="block font-bold text-sm leading-6 text-pink-500"
              >
                MBTI
              </label>
              <div className="mt-1 flex">
                <select
                  id="mbti"
                  name="mbti"
                  value={formData.mbti}
                  onChange={handleChange}
                  className="block `w-9/12 rounded-md text-sm font-thin border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 placeholder-gray-400 "
                >
                  <option value="">선택안함</option>
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
              className={`flex w-full justify-center rounded-md px-4 py-2 text-base tracking-widest font-semibold leading-6 text-white shadow-md   bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105 ${
                !isEmailVerified ? " cursor-not-allowed" : ""
              }`}
              disabled={!isEmailVerified}
            >
              JOIN
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-base tracking-widest text-gray-500 pb-5">
          <a
            href="/login"
            className="leading-6 font-extrabold  text-pink-500 hover:text-pink-600"
          >
            LOGIN
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
