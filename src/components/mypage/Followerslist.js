import React from "react";
import { FaUser } from "react-icons/fa"; // 리액트 아이콘 추가

// 홍길동 배열을 컴포넌트 바깥에 선언
const names = ["홍길동", "김길동", "김민수", "이철수", "박지성", "홍길동"];

function Followerslist() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="w-full lg:w-1/2 h-60 lg:h-80 text-lg lg:text-xl text-white font-GmarketSans flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="text-pink-500 mb-4 lg:mb-8">팔로잉 목록</div>
        <hr className="w-full border-pink-500 mb-4 lg:mb-8" />
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr>
                <th className="pl-2 lg:pl-4 text-left">이름</th>
                <th className="pl-2 lg:pl-4 text-left">기능</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, index) => (
                <tr key={index}>
                  <td className="pl-2 lg:pl-4 flex items-center">
                    <FaUser className="mr-2" /> {name}
                  </td>
                  <td className="pl-2 lg:pl-4 text-pink-500 cursor-pointer">
                    삭제
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="hidden lg:block w-1 border-pink-500 border-l-2 h-80" />

      <div className="w-full lg:w-1/2 h-60 lg:h-80 text-lg lg:text-xl text-white font-GmarketSans flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="w-full lg:w-1/2 h-60 lg:h-80 text-lg lg:text-xl text-white font-GmarketSans flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="text-pink-500 mb-4 lg:mb-8">팔로잉 목록</div>
        <hr className="w-full border-pink-500 mb-4 lg:mb-8" />
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr>
                <th className="pl-2 lg:pl-4 text-left">이름</th>
                <th className="pl-2 lg:pl-4 text-left">기능</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, index) => (
                <tr key={index}>
                  <td className="pl-2 lg:pl-4 flex items-center">
                    <FaUser className="mr-2" /> {name}
                  </td>
                  <td className="pl-2 lg:pl-4 text-pink-500 cursor-pointer">
                    삭제
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Followerslist;
