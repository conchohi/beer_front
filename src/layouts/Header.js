import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";
import { Link } from "react-router-dom";
import CreateRoom from "../modal/CreateRoom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const token = localStorage.getItem("access");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreate = () => {
    setCreateRoom(!createRoom);
  };

  const logoutFunction =  async () => {
    try {
      // 서버에 로그아웃 요청을 보냅니다.
      const response = await axios.post('http://localhost:8080/logout', {}, {
        withCredentials: true // 쿠키를 포함하여 요청
      });
  
      if (response.status === 200) {
        // 로그아웃 성공 시, 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('access');
        
        // 홈으로 이동
        window.location.href = '/';
      } else {
        localStorage.removeItem('access');
        
        // 홈으로 이동
        window.location.href = '/';
      }
    } catch (error) {
      console.error('로그아웃 오류', error);
      localStorage.removeItem('access');
        
        // 홈으로 이동
        window.location.href = '/';

    }
  };
  return (
    <>
      {createRoom && <CreateRoom close={handleCreate} />}
      <header className="w-full bg-none font-GmarketSansMedium">
        <nav className="w-full pt-3 px-4 py-4">
          <div className="w-full flex items-center justify-between">
            <div className=" flex items-center h-full">
              <Link to="/">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  className="w-17 h-12 mr-0 mt-0"
                />
              </Link>
              <Link to="/">
                <img
                  src="/img/title.png"
                  alt="Logo"
                  className="w-26 h-11 mt-1"
                />
              </Link>
            </div>

            <nav className="flex-1 hidden md:flex justify-center ml-0 mr-0">
              <ul className="flex justify-between space-x-25 font-bold">
                <li>
                  <Link to="/info" className="text-white text-xl">
                    참여방법
                  </Link>
                </li>
                <li>
                  <Link to="/chat/list" className="text-white text-xl">
                    채팅 리스트
                  </Link>
                </li>
                <li>
                  <Link to="/board" className="text-white text-xl">
                    게시판
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="hidden md:flex md:w-26 md:justify-end items-center">
              <ul className="flex items-center space-x-12 ml-auto pr-0">
                <li>
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={handleCreate}
                  >
                    <BiDoorOpen className="w-8 h-8 text-white text-md" />
                    <span to="#" className="text-white">방 생성</span>
                  </div>
                </li>
                {token ? (
                  <>
                    <li>
                    <button onClick={logoutFunction} className="text-white">
                        <div className="flex flex-col items-center">
                          <FaUserPlus className="w-8 h-8 text-white text-md" />
                          로그아웃
                        </div>
                      </button>
                    </li>
                    <li>
                      <Link to="/mypage" className="text-white">
                        <div className="flex flex-col items-center">
                          <FaUserPlus className="w-8 h-8 text-white text-md" />
                          마이페이지
                        </div>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="text-white">
                        <div className="flex flex-col items-center">
                          <FiLogIn className="w-8 h-8 text-white text-md" />
                          로그인
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/signup" className="text-white">
                        <div className="flex flex-col items-center">
                          <FaUserPlus className="w-8 h-8 text-white text-md" />
                          회원가입
                        </div>
                      </Link>
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
                <Link
                  to="/info"
                  className="block px-4 py-2 text-white bg-gray-900 rounded"
                >
                  참여 방법
                </Link>
              </li>
              <li>
                <Link
                  to="/chat/list"
                  className="block px-4 py-2 text-white bg-gray-900 rounded"
                >
                  채팅 리스트
                </Link>
              </li>
              <li>
                <Link
                  to="/board"
                  className="block px-4 py-2 text-white bg-gray-900 rounded"
                >
                  게시판
                </Link>
              </li>
              <li className="flex justify-around">
                <div
                  className="flex flex-col items-center"
                  onClick={handleCreate}
                >
                  <BiDoorOpen
                    className="w-6 h-6 text-white"
                    onClick={handleCreate}
                  />
                  <span className="text-white text-sm">방 생성</span>
                </div>
                {token ? (
                  <>
                    <Link to="/logout" className="text-white text-sm">
                      <div className="flex flex-col items-center">
                        <FaUserPlus className="w-6 h-6 text-white" />
                        로그아웃
                      </div>
                    </Link>
                    <Link to="/mypage" className="text-white text-sm">
                      <div className="flex flex-col items-center">
                        <FaUserPlus className="w-6 h-6 text-white" />
                        마이페이지
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white text-sm">
                      <div className="flex flex-col items-center">
                        <FiLogIn className="w-6 h-6 text-white" />
                        로그인
                      </div>
                    </Link>
                    <Link to="/signup" className="text-white text-sm">
                      <div className="flex flex-col items-center">
                        <FaUserPlus className="w-6 h-6 text-white" />
                        회원가입
                      </div>
                    </Link>
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
