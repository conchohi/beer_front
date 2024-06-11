import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { AiFillAlert, AiOutlineClose } from "react-icons/ai";
import { reportUser } from '../../../api/reportApi';
import BasicModalComponent from '../../common/BasicModalComponent';


function ReportUser({user, close, setMessage, setOpenModal}) {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [content, setContent] = useState("");

  const handleTitle = (e) =>{
    setTitle(e.target.value)
  }

  const handleReason = (e) =>{
    setReason(e.target.value)
  }

  const handleContent = (e) =>{
    setContent(e.target.value)
  }

  const clickReportUser = ()=>{
    if(!title || title.length === 0 ){
      setMessage('신고 제목을 입력하세요.')
      setOpenModal(true)
      return;
    }
    if(!reason || reason.length === 0 ){
      setMessage('신고 사유를 선택하세요.')
      setOpenModal(true)
      return;
    }

    if(!content || content.length === 0 ){
      setMessage('신고 내용을 입력하세요.')
      setOpenModal(true)
      return;
    }
    console.log(user)
    let data = {reportedUser: user.id, title:title, content:content, reason:reason}
    reportUser(data).then(result=>{
      setMessage("신고 완료...!")
      setOpenModal(true);
      close();
    }).catch(error=>{
      if(error.response.status === 400){
        setMessage(error.response.data)
        setOpenModal(true);
      }
    })
  }

  return (<>
    <Draggable>
      <div className="fixed inset-0 flex items-center justify-center z-40">
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
                    value={reason} 
                    onChange={handleReason}
                  className="w-full p-2 rounded border-gray-300">
                  <option value="">신고사유</option>
                  <option>음란선 및 선정성</option>
                  <option>개인정보 유출</option>
                  <option>도배/낚시</option>
                  <option>지나친 욕설 사용</option>
                  <option>상업적 광고/홍보</option>
                </select>
              </div>
              <div className="">
                <input
                  type="text"
                  value={user.nickname} // 유저아이디 값 
                  readOnly
                  className="w-full p-2 rounded border-gray-300 bg-gray-200 text-gray-500"
                />
              </div>
            </div>


            <div className="mb-4">
              <label className="block text-white mb-2">제목</label>
              <input
                type="text"
                  value={title} 
                  onChange={handleTitle}
                className="w-full p-2 rounded border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">내용</label>
              <textarea
                  value={content} 
                  onChange={handleContent}
                className="w-full p-2 rounded border-gray-300 h-24"
              />
            </div>
            <button
              onClick={clickReportUser}
              className="w-full bg-red-600 text-white py-2 rounded-lg flex justify-center items-center"
            >
              <AiFillAlert className="w-6 h-6 mr-2" />
              <span className="mr-2">신고</span>
            </button>
        </div>
      </div>
    </Draggable>
    </>
  );
}

export default ReportUser;