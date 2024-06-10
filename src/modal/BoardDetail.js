import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineWatchLater } from "react-icons/md";
import CommentSection from '../components/board/CommentSection';


// 열렸을때만 실행되도록 함
// function BoardDetail({ isOpen, onClose }) {
//   if (!isOpen) return null;

function BoardDetail(){
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 border-2 border-pink-500 text-gray-200 rounded-lg w-11/12 max-w-2xl p-6 relative">
   
        {/* 게시판 제목 불러오기 */}
        <div className="text-pink-500 text-xl mb-4 font-semibold">{selectedPost.title}</div>
        
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-400 font-semibold">
                <div className="fas fa-user"></div> {selectedPost.author}</div>
          </div>
          <div className="flex items-center">
            {/* 게시판 작성일자 불러오기 */}
            <MdOutlineWatchLater className="text-gray-400 mr-1" />
            <div className="text-gray-400"> {selectedPost.date}  {selectedPost.views}</div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg mb-4 h-52">
            {/* 게시판 내용 불러오기 */}
            {selectedPost.content}
        </div>

        <div className="mb-4 flex justify-end">
                <button
                    className="px-4 py-2 mr-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    onClick={onEdit}
                >
                    수정
                </button>
                <button
                    className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-red-600"
                    onClick={onDelete}
                >
                    삭제
                </button>
            </div>
        <hr className="border-amber-40 mb-4"/>

        <div className="flex items-center mb-4 ">
          {/* 유저이미지 */}
          <CgProfile className="mr-2 text-pink-500 w-10 h-10"/>
        {/* {user.profileImage ? 
        (<img src="" alt="Profile" className="w-8 h-8 rounded-full mr-2" />) 
        : (<CgProfile className="mr-2 text-blue-500" size={24} />)} */}

        {/* 유저닉네임 */}
        <div className="text-gray-200 font-semibold mr-2">{selectedPost.author}</div>
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-grow p-2 rounded-lg bg-gray-600 text-amber-400 "
          // value={newComment}
          // onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg">등록</button>
        </div>
        
      

      </div>
    </div>
  );
}

export default BoardDetail;