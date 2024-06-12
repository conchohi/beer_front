import React, { useEffect, useRef, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import Draggable from 'react-draggable';
import BasicModalComponent from '../../common/BasicModalComponent';
import { createRoom } from '../../../api/roomApi';
import { useNavigate } from 'react-router-dom';

function CreateRoom({ close }) {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const [viewVideo, setViewVideo] = useState(false);
  const [currentStream, setCurrentStream] = useState(null);

  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [maximumUser, setMaximumUser] = useState(2);
  const [roomPw, setRoomPw] = useState(null);

  const [message, setMessage] = useState("");
  const [caution, setCaution] = useState(false)

  const handleClose = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      setCurrentStream(null);
    }
    close();
  };

  const clickCreateRoom = ()=>{
    //제목 확인
    if(!title || title.length == 0){
      setMessage('제목을 입력하세요.')
      setCaution(true)
      return;
    }
    //카테고리 확인
    if(!category || category.length == 0 || category === "선택하세요"){
      setMessage('카테고리를 선택하세요.')
      setCaution(true)
      return;
    }

    createRoom({title:title, category:category, maximumUser:maximumUser, roomPw:roomPw}).then(roomNo=>{
      navigate(`/chat/${roomNo}`)
    })

  }

  useEffect(() => {
    if (viewVideo) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((userStream) => {
          const attachStreamToVideo = async () => {
            try {
              if (videoRef.current && userStream) {
                setCurrentStream(userStream);
                if ('srcObject' in videoRef.current) {
                  videoRef.current.srcObject = userStream;
                } else {
                  videoRef.current.src = URL.createObjectURL(userStream);
                }
              }
            } catch (error) {
              console.error("Error attaching stream to element:", error);
            }
          };
          attachStreamToVideo();
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    } else {
      if (currentStream) {
        currentStream.getTracks().forEach(track => {
          track.stop();
          setCurrentStream(null);
        });
      }
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        setCurrentStream(null);
      }
    };
  }, [viewVideo])

  const handleVideo = () => {
    setViewVideo(!viewVideo);
  }

  return (<>
    {caution && <BasicModalComponent message={message} callbackFunction={()=>{setCaution(false)}}/>}
    <Draggable>
      <div className="flex inset-0 fixed z-10 justify-center items-center">
        <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl w-[800px] flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">

          {/* 닫기버튼 */}
          <div className="absolute top-4 right-4">
            <button className=" text-amber-400" onClick={handleClose}>
              <AiOutlineClose size="40" className="" />
            </button>
          </div>

          <div className="w-full md:w-3/5 space-y-4 ps-2">
            <h2 className="text-amber-400 text-2xl mb-4 font-semibold ">방 만들기</h2>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold">방 제목</label> 
              <input type="text" placeholder="방 제목을 입력하세요" value={title} onChange={(e) => { setTitle(e.target.value) }}
                className="w-full p-2 mt-2 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold">관심사</label>
              <select
                className="w-full p-2 mt-2 rounded-lg bg-gray-700 text-gray-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
                onChange={(e)=>{setCategory(e.target.value)}}>
                <option>선택하세요</option>
                <option >게임</option>
                <option >고민상담</option>
                <option>대학생</option>
                <option>여행</option>
                <option>친목</option>
                <option>피트니스</option>
                <option>회사생활</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold">인원수</label>
              <div className="flex mt-2 space-x-2">
                {[2, 3, 4, 5, 6].map((num) => (
                  (num === maximumUser) ?
                    <button
                      key={num}
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 text-gray-300 focus:outline-none ring-2 ring-amber-400"
                      onClick={() => { setMaximumUser(num) }}
                    >
                      {num}
                    </button>
                    :
                    <button
                      key={num}
                      className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 text-gray-300"
                      onClick={() => { setMaximumUser(num) }}
                    >
                      {num}
                    </button>

                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 font-semibold">비밀번호(선택)</label>
              <input
                type="password"
                placeholder="방 비밀번호를 입력하세요."
                value={roomPw} onChange={(e) => { setRoomPw(e.target.value) }}
                className="w-full p-3 mt-2 rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400"
              />
            </div>
          </div>

          {/* 카메라설정 */}

          <div className=" flex flex-col items-center justify-between w-full md:w-2/5 space-y-4 ml-5">
            <div className="bg-gray-700 w-60 h-60 rounded-lg flex flex-col items-center justify-center mt-5">
              {viewVideo ? <video className="w-full h-full rounded-lg object-cover" ref={videoRef} autoPlay playsInline muted /> :
                <><div className="bg-gray-600 w-24 h-24 rounded-full flex items-center justify-center">
                  <CgProfile className="w-full h-full rounded-lg object-cover" />
                </div><p className="text-gray-300 mt-2">카메라 출력 화면</p></>}

            </div>
            <div className="flex space-x-4">
              <button onClick={handleVideo} className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                {viewVideo ? <FaVideoSlash className="text-amber-400" /> : <FaVideo className="text-amber-400" />}
              </button>
              <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <FaMicrophone className="text-amber-400" />
              </button>
            </div>
            <div className="mt-4">
              <button className=" px-6 py-3 bg-amber-400 text-gray-700 rounded-lg font-bold" onClick={clickCreateRoom}>생성</button>
            </div>
          </div>


        </div>
      </div>
    </Draggable>
    </>
  );
}

export default CreateRoom;