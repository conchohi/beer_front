import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineWatchLater } from "react-icons/md";

// 열렸을때만 실행되도록 함
// function BoardDetail({ isOpen, onClose }) {
//   if (!isOpen) return null;

function BoardModify(){
  return (
    
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-pink-500 text-gray-200 rounded-lg w-11/12 max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-pink-500">
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl mb-4 text-pink-500 font-semibold">글 수정</h2>
        {/* 게시판 제목 불러오기 */}
        <div className="text-pink-500 text-xl mb-4 font-semibold ">
        <input
                type="text"
                name="title"
                placeholder="제목"
                value={selectedPost.title}
                onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                className="mb-4 p-2 border rounded w-full  text-pink-500 font-semibold"
            />
        </div>
        
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-400 font-semibold">
                <div className="fas fa-user"></div> 햄토리</div>
          </div>
          <div className="flex items-center">
            {/* 게시판 작성일자 불러오기 */}
            <MdOutlineWatchLater className="text-gray-400 mr-1" />
            {/* 저장될때는 수정일자로 DB에 저장 */}
            <div className="text-gray-400"> 2024.06.03  16:30 </div>
          </div>
        </div>
        

            {/* 선택게시판 내용 불러오기 */}
            <textarea
                placeholder="내용"
                value={selectedPost.content}
                onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                className="mb-4 p-2 border rounded w-full bg-gray-700 h-52 "
            />

        <div className="mb-4 flex justify-end" >
          <button className="px-4 py-2 mr-2 bg-pink-500 text-white font-semibold rounded-lg"
          onClick={handleEditPost}
          > 수정 </button>
        </div>
        </div>
    </div>
  );
}

export default BoardModify;