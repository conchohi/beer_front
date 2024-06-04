import React from 'react';
import { CgProfile } from 'react-icons/cg';

function Comment({ user, text }) {
  return (
    <div className="bg-gray-600 p-2 rounded-lg flex items-center mb-2">
        {/* 유저프로필 사진 넣을 부분 */}
        {/* {user.profileImage ? 
        (<img src="" alt="Profile" className="w-14 h-14 rounded-full mr-2" />) 
        : (<CgProfile className="w-14 h-14 mr-2 text-pink-500" />)} */}
      <CgProfile className="w-10 h-10 mr-2" />
      <div className="bg-gray-700 p-2 rounded-lg flex-grow">
        <div className="text-amber-400 font-semibold">{user}</div>
        <div className="text-gray-200">{text}</div>
      </div>
    </div>
  );
}

function CommentSection() {
  const comments = [
    { user: '햄냥이', text: '저도 오늘 해바라기씨에 맥주 땡기네요!!' },
    { user: '너구리', text: '너구리도 같이 먹을 수 있나요??ㅠㅠ' },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="text-sm font-semibold text-amber-400 mb-2">댓글 {comments.length}</div>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <Comment key={index} user={comment.user} text={comment.text} />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;