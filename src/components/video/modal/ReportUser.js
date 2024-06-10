import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";

// function ReportUser({ isOpen, onClose }) {
//   const [reason, setReason] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   if (!isOpen) return null;

function ReportUser({nickname, close}) {

  return (
    <Draggable>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-blue-950 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                  {/* 닫기창 */}
        <div className="mb-4">
          <button className="absolute top-2 right-2" onClick={close}>
            <AiOutlineClose size="25" className="text-white"/>
          </button>
        </div>
            <div className="flex justify-between items-center mb-4">
              <div className="">
                <select
                  //   value={reason} 
                  //   onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2 rounded border-gray-300">
                  <option value="">신고사유</option>
                  <option value="abuse">음란선 및 선정성</option>
                  <option value="abuse">개인정보 유출</option>
                  <option value="abuse">도배/낚시</option>
                  <option value="abuse">지나친 욕설 사용</option>
                  <option value="abuse">상업적 광고/홍보</option>
                </select>
              </div>
              <div className="">
                <input
                  type="text"
                  value={nickname} // 유저아이디 값 
                  readOnly
                  className="w-full p-2 rounded border-gray-300 bg-gray-200 text-gray-500"
                />
              </div>
            </div>


            <div className="mb-4">
              <label className="block text-white mb-2">제목</label>
              <input
                type="text"
                //   value={title} 
                //   onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">내용</label>
              <textarea
                //   value={description} 
                //   onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded border-gray-300 h-24"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center"
            >
              <AiFillAlert className="w-6 h-6 mr-2" />
              <span className="mr-2">신고</span>
            </button>
        </div>
      </div>
    </Draggable>
  );
}

export default ReportUser;