import React, { useState, useRef } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BiSolidLogOut } from "react-icons/bi";
import CreateRoom from "../components/chatlist/modal/CreateRoom";
import axios from "axios";
import { API_SERVER_HOST } from "../api/axios_intercepter";
import BasicModalComponent from "../components/common/BasicModalComponent";
import { RiBeerFill } from "react-icons/ri";
import BackgroundMusic from "../components/music/BackgroundMusic";
import BackgroundMusic2 from "../components/music/BackgroundMusic2";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreate = () => {
    if(!token){
      setOpenModal(true);
      return;
    }
    setCreateRoom(!createRoom);
  };

  const logoutFunction = async () => {
    try {
      // 서버에 로그아웃 요청을 보냅니다.
      const response = await axios.post(`${API_SERVER_HOST}/api/logout`, {}, {
        withCredentials: true // 쿠키를 포함하여 요청
      });

      if (response.status === 200) {
        // 로그아웃 성공 시, 로컬 스토리지에서 토큰 및 자동로그인 정보 제거
        localStorage.removeItem('access');
        localStorage.removeItem('nickname');
        localStorage.removeItem('auto_login');
        localStorage.removeItem('saved_password');
        
        // 로그인 페이지로 이동
        navigate('/login');
      } else {
        localStorage.removeItem('access');
        localStorage.removeItem('nickname');
        localStorage.removeItem('auto_login');
        localStorage.removeItem('saved_password');
        
        // 로그인 페이지로 이동
        navigate('/login');
      }
    } catch (error) {
      console.error('로그아웃 오류', error);
      localStorage.removeItem('access');
      localStorage.removeItem('nickname');

        
      // 메인 페이지로 이동
      navigate('/');
    }
  };
  return (
    <>
      {openModal && <BasicModalComponent message="로그인 후 이용 가능합니다." callbackFunction={()=>{
        setOpenModal(!openModal)
        navigate('/login')}}/>}
      {createRoom && <CreateRoom close={handleCreate} />}
      <header className="w-full bg-none font-GmarketSansMedium">
        <nav className="w-full pt-3 px-4 py-4">
          <div className="w-full flex items-center justify-between">
            <div className=" flex items-center h-full">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-17 h-12 mr-0 mt-0 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <img
                src="/img/title.png"
                alt="Logo"
                className="w-26 h-11 mt-1 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>

            <nav className="flex-1 hidden md:flex justify-center ml-0 mr-0">
              <ul className="flex justify-between space-x-25 font-bold">
                <li>
                  <BackgroundMusic2 />
                  
                </li>
                <li>
                  <span
                    className="text-white text-xl cursor-pointer"
                    onClick={() => navigate("/info")}
                  >
                    참여방법
                  </span>
                </li>
                <li>
                  <span
                    className="text-white text-xl cursor-pointer"
                    onClick={() => navigate("/chat/list")}
                  >
                    채팅 리스트
                  </span>
                </li>
                <li>
                  <span
                    className="text-white text-xl cursor-pointer"
                    onClick={() => navigate("/board")}
                  >
                    게시판
                  </span>
                </li>
              </ul>
            </nav>
            <div className="hidden md:flex md:w-26 md:justify-end items-center">
              <ul className="flex items-center space-x-12 ml-auto pr-0">
                <li>
                <div
                    className="flex flex-col items-center cursor-pointer"

                  >
                    <BackgroundMusic className="w-8 h-8 text-white" />
                    <span className="text-white">BGM</span>
                  </div>
                </li>
                <li>
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={handleCreate}
                  >
                    <BiDoorOpen className="w-8 h-8 text-white text-md" />
                    <span className="text-white">방 생성</span>
                  </div>
                </li>
                {token ? (
                  <>
                    <li>
                      <div
                        className="flex flex-col items-center cursor-pointer text-white"
                        onClick={() => navigate("/mypage")}
                      >
                        <RiBeerFill className="w-8 h-8 text-white text-md" />
                        마이페이지
                      </div>
                    </li>
                    <li>
                      <button onClick={logoutFunction} className="text-white">
                        <div className="flex flex-col items-center">
                          <BiSolidLogOut className="w-8 h-8 text-white text-md" />
                          로그아웃
                        </div>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    
                    <li>
                      <div
                        className="flex flex-col items-center cursor-pointer text-white"
                        onClick={() => navigate("/signup")}
                      >
                        <FaUserPlus className="w-8 h-8 text-white text-md" />
                        회원가입
                      </div>
                    </li>
                    <li>
                      <div
                        className="flex flex-col items-center cursor-pointer text-white"
                        onClick={() => navigate("/login")}
                      >
                        <FiLogIn className="w-8 h-8 text-white text-md" />
                        로그인
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="md:hidden">
              <button
                className="outline-none mobile-menu-button"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className={`mobile-menu ${isMenuOpen ? "" : "hidden"} md:hidden`}>
            <ul className="mt-4 space-y-4">
              <li>
                <span
                  className="block px-4 py-2 text-white bg-gray-900 rounded cursor-pointer"
                  onClick={() => navigate("/info")}
                >
                  참여 방법
                </span>
              </li>
              <li>
                <span
                  className="block px-4 py-2 text-white bg-gray-900 rounded cursor-pointer"
                  onClick={() => navigate("/chat/list")}
                >
                  채팅 리스트
                </span>
              </li>
              <li>
                <span
                  className="block px-4 py-2 text-white bg-gray-900 rounded cursor-pointer"
                  onClick={() => navigate("/board")}
                >
                  게시판
                </span>
              </li>
              <li className="flex justify-around">
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={handleCreate}
                >
                  <BiDoorOpen className="w-6 h-6 text-white" />
                  <span className="text-white text-sm">방 생성</span>
                </div>
                {token ? (
                  <>
                    <div
                      className="flex flex-col items-center cursor-pointer text-white text-sm"
                      onClick={() => navigate("/mypage")}
                    >
                      <RiBeerFill className="w-6 h-6 text-white" />
                      마이페이지
                    </div>
                    <button onClick={logoutFunction} className="text-white text-sm">
                      <div className="flex flex-col items-center">
                        <BiSolidLogOut className="w-6 h-6 text-white" />
                        로그아웃
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                  <div
                      className="flex flex-col items-center cursor-pointer text-white text-sm"
                      onClick={() => navigate("/signup")}
                    >
                      <FaUserPlus className="w-6 h-6 text-white" />
                      회원가입
                    </div>
                    <div
                      className="flex flex-col items-center cursor-pointer text-white text-sm"
                      onClick={() => navigate("/login")}
                    >
                      <FiLogIn className="w-6 h-6 text-white" />
                      로그인
                    </div>
                    
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
