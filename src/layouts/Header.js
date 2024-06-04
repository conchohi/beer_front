import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";

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
            <a href="/">
              <img
                src="/img/logo.png"
                alt="Logo"
                className="w-17 h-12 mr-0 mt-0"
              />
            </a>
            <a href="/">
              <img
                src="/img/title.png"
                alt="Logo"
                className="w-26 h-11 mt-1"
              />
            </a>
          </div>

          <nav className="flex-1 hidden md:flex justify-center">
            <ul className="flex justify-between space-x-8 font-bold">
              <li>
                <a href="/info" className="text-white hover:underline">
                  가이드
                </a>
              </li>
              <li>
                <a href="/chat/list" className="text-white hover:underline">
                  채팅 리스트
                </a>
              </li>
              <li>
                <a href="#board" className="text-white hover:underline">
                  게시판
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-12">
              <li>
                <div className="flex flex-col items-center">
                <BiDoorOpen className="w-8 h-8 text-white text-xl" />
                  <a href="#" className="text-white">
                    방 생성
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <FiLogIn className="w-8 h-8 text-white text-xl" />
                  <a href="#" className="text-white">
                    로그인
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-col items-center">
                  <FaUserPlus className="w-8 h-8 text-white text-xl" />
                  <a href="#" className="text-white">
                    회원가입
                  </a>
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
              <a
                href="/game"
                className="block px-4 py-2 text-white bg-gray-900 rounded"
              >
                가이드
              </a>
            </li>
            <li>
              <a
                href="/chat/list"
                className="block px-4 py-2 text-white bg-gray-900 rounded"
              >
                채팅 리스트
              </a>
            </li>
            <li>
              <a
                href="#board"
                className="block px-4 py-2 text-white bg-gray-900 rounded"
              >
                게시판
              </a>
            </li>
            <li className="flex justify-around">
              <div className="flex flex-col items-center">
                <BiDoorOpen className="w-6 h-6 text-white" />
                <a href="#" className="text-white text-sm">
                  방 생성
                </a>
              </div>
              <div className="flex flex-col items-center">
                <FiLogIn className="w-6 h-6 text-white" />
                <a href="#" className="text-white text-sm">
                  로그인
                </a>
              </div>
              <div className="flex flex-col items-center">
                <FaUserPlus className="w-6 h-6 text-white" />
                <a href="#" className="text-white text-sm">
                  회원가입
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
