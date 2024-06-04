import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import CommentSection from '../components/board/CommentSection';

// 열렸을때만 실행되도록 함
// function BoardDetail({ isOpen, onClose }) {
//   if (!isOpen) return null;

function BoardDetail(){
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-gray-200 rounded-lg w-11/12 max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-amber-400">
          <AiOutlineClose size={24} />
        </button>

        {/* 게시판 제목 불러오기 */}
        <div className="text-amber-400 text-xl mb-4 font-semibold">오늘 7시에 같이 소주마실분</div>
        
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="text-gray-400 font-semibold">
                <div className="fas fa-user"></div> 햄토리</div>
          </div>
          <div className="flex items-center">
            {/* 게시판 작성일자 불러오기 */}
            <div className="text-gray-400"> 2024.06.03  16:30 </div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg mb-4 h-52">
            {/* 게시판 내용 불러오기 */}
          <p>인생이 햄드네요</p>
          <p>같이 소주 한잔 하실 분 구합니다~</p>
          <p>전 안주는 해바라기씨로 먹으려구요ㅎㅎ</p>
        </div>

        <hr className="border-amber-40 mb-4"/>


        <div className="flex items-center mb-4 ">
          {/* 유저이미지 */}
          <CgProfile className="mr-2 text-amber-400 w-10 h-10"/>
        {/* {user.profileImage ? 
        (<img src="" alt="Profile" className="w-8 h-8 rounded-full mr-2" />) 
        : (<CgProfile className="mr-2 text-blue-500" size={24} />)} */}

        {/* 유저닉네임 */}
        <div className="text-gray-200 font-semibold mr-2">햄토리</div>
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-grow p-2 rounded-lg bg-gray-600 text-amber-400 "
          // value={newComment}
          // onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="px-4 py-2 bg-amber-400 text-gray-700 font-semibold rounded-lg">등록</button>
        </div>
        
        <CommentSection/>

      </div>
    </div>
  );
}

export default BoardDetail;