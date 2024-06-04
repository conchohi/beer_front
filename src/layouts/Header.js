import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-none">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
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
                  가이드
                </Link>
              </li>
              <li>
                <Link to="/chat/list" className="text-white text-xl">
                  채팅 리스트
                </Link>
              </li>
              <li>
                <Link to="#board" className="text-white text-xl">
                  게시판
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-12">
              <li>
                <div className="flex flex-col items-center">
                  <BiDoorOpen className="w-8 h-8 text-white text-md" />
                  <Link to="#" className="text-white">
                    방 생성
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <FiLogIn className="w-8 h-8 text-white text-md" />
                  <Link to="#" className="text-white">
                    로그인
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <FaUserPlus className="w-8 h-8 text-white text-md" />
                  <Link to="#" className="text-white">
                    회원가입
                  </Link>
                </div>
              </li>
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
                to="/game"
                className="block px-4 py-2 text-white bg-gray-900 rounded"
              >
                가이드
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
                to="#board"
                className="block px-4 py-2 text-white bg-gray-900 rounded"
              >
                게시판
              </Link>
            </li>
            <li className="flex justify-around">
              <div className="flex flex-col items-center">
                <BiDoorOpen className="w-6 h-6 text-white" />
                <Link to="#" className="text-white text-sm">
                  방 생성
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <FiLogIn className="w-6 h-6 text-white" />
                <Link to="#" className="text-white text-sm">
                  로그인
                </Link>
              </div>
              <div className="flex flex-col items-center">
                <FaUserPlus className="w-6 h-6 text-white" />
                <Link to="#" className="text-white text-sm">
                  회원가입
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
