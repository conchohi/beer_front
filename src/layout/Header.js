import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-black text-white w-full fixed top-0 left-0">
      <div className="text-2xl font-bold">우리집 Beer</div>
      <nav className="flex-1 flex justify-center">
        <ul className="flex space-x-8">
          <li><a href="#guide" className="hover:underline">가이드</a></li>
          <li><a href="#chat" className="hover:underline">채팅 리스트</a></li>
          <li><a href="#board" className="hover:underline">게시판</a></li>
        </ul>
      </nav>
      <div>
        <li><a href="#login" className="hover:underline">로그인</a></li>
      </div>
    </header>
  );
}

export default Header;
