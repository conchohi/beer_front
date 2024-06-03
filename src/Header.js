import React, { useState } from 'react';
import { FiLogIn } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl flex">
            <img src="/logo1.png" alt="Logo" style={{width:"35px",height:"35px"}}  /> {/* 경로 수정 */}
            <a href="#">우리집 Beer</a>
          </div>
          
          <div className="flex hidden md:block">
            <ul className="flex items-center space-x-12">
              <li><a href="#" className="text-white">가이드</a></li>
              <li><a href="#" className="text-white">채팅리스트</a></li>
              <li><a href="#" className="text-white">게시판</a></li>
              <li><a href="#" className="text-white"><FaDoorOpen /></a></li>
              <li><a href="#" className="text-white"><FiLogIn /></a></li>
              <li><a href="#" className="text-white"><FaUserCircle /></a></li>
            </ul>
          </div>
          
          <div className="md:hidden">
            <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
              <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${isMenuOpen ? '' : 'hidden'} md:hidden`}>
          <ul className="mt-4 space-y-4">
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">가이드</a></li>
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">채팅리스트</a></li>
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">게시판</a></li>
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded"><FaDoorOpen /></a></li>
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded"><FiLogIn /></a></li>
            <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded"><FaUserCircle /></a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
