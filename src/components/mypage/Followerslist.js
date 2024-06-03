import React from "react";

// 홍길동 배열을 컴포넌트 바깥에 선언
const names = ["홍길동", "김길동", "김민수", "이철수", "박지성", "홍길동"];

function Followerslist() {
  return (
    <div className="flex w-full">
      <div className="border px-4 py-2 w-1/2 h-[90vh] text-3xl text-white font-GmarketSans flex flex-col items-center justify-center p-8 bg-gray-800">
        <div className="text-pink-500 mb-12">팔로잉 목록</div>
        <div className=" w-full">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr>
                <th className="text-center">이름</th>
                <th className="w-3/5 text-right cursor-pointer pr-4 md:pr-6 lg:pr-8">기능</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, index) => (
                <tr key={index}>
                  <td className="text-center">{name}</td>
                  <td className="w-3/5 text-right text-pink-500 cursor-pointer pr-4 md:pr-6 lg:pr-8">삭제</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border px-4 py-2 w-1/2 h-[90vh] text-3xl text-white font-GmarketSans flex flex-col items-center justify-center p-8 bg-gray-800">
        <div className="text-pink-500 mb-12">팔로워 목록</div>
        <div className=" w-full">
          <table className="table-auto w-full text-left text-white">
            <thead>
              <tr>
                <th className="text-center">이름</th>
                <th className="w-3/5 text-right cursor-pointer pr-4 md:pr-6 lg:pr-8">기능</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, index) => (
                <tr key={index}>
                  <td className="text-center">{name}</td>
                  <td className="w-3/5 text-right text-pink-500 cursor-pointer pr-4 md:pr-6 lg:pr-8">삭제</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Followerslist;
