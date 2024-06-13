import React, { useState, useEffect } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import privateApi, { API_SERVER_HOST } from "../../../../api/axios_intercepter";
import AlertModal from "../friend/FriendCommonModal";
import Draggable from "react-draggable";
import RadarAnimation from "../../../animation/mypage/Radar";

const SearchModal = ({ show, closeModal,setClickNickname }) => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [myFollowingList, setMyFollowingList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  // 드래그를 중지하는 핸들러 함수
  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  // 유저 검색
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search.trim() === "") {
        setResult([]);
        return;
      }
      try {
        const response = await privateApi.get(`/api/friend/search?nickname=${search}`);
        setResult(response.data);
      } catch (error) {
        console.error("유저 검색 중 에러 발생:", error);
      }
    };

    fetchSearchResults();
  }, [search]);

  // 친구 요청 보내기
  const follow = async (nickname) => {
    try {
      await privateApi.post(`/api/friend/request`, { nickname });
      setMyFollowingList([...myFollowingList, nickname]);
      setAlertMessage("친구 요청을 보냈습니다!");
      setAlertShow(true);
    } catch (error) {
      console.error("친구 요청 보내는 중 에러 발생:", error);
      setAlertMessage("친구 요청을 보내는 데 에러가 발생했습니다");
      setAlertShow(true);
    }
  };

  // 친구 여부 확인
  const isFriend = (nickname) => {
    return myFollowingList.includes(nickname);
  };

  if (!show) {
    return null;
  }

  return (
    <Draggable>
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          show ? "opacity-100 z-20" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
      >
        <div
          className="bg-slate-200 text-gray-600 rounded-lg p-8 w-11/12 md:w-1/2 lg:w-3/12 max-h-screen"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">
              <span className="text-pink-500">유저 검색</span>
            </h2>
            <button className="text-2xl text-pink-500" onClick={closeModal}>
              ✖
            </button>
          </div>
          <form className="relative mb-4" onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full p-2 rounded bg-slate-100 text-xl  placeholder-gray-400"
              placeholder="닉네임으로 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onMouseDown={handleMouseDown}
            />
            <FaSearch className="absolute right-3 top-3 text-2xl text-gray-400" />
          </form>
          <div className="overflow-y-auto h-96">
            {search ? (
              result.length === 0 ? (
                <div className="text-center text-2xl">
                  <RadarAnimation />
                </div>
              ) : (
                result.map((user) => (
                  <div
                    key={user.userId}
                    className="flex justify-between items-center p-2 border-b border-gray-700"
                  >
                    <div
                      className="flex items-center cursor-pointer" onClick={()=>{setClickNickname(user.nickname)}}
                    >
                      <img
                        src={`${API_SERVER_HOST}/api/user/${user.profileImage}`}
                        className="w-12 h-12 rounded-full mr-4"
                        alt="프로필"
                      />
                      <div>
                        <p className="text-xl">{user.nickname}</p>
                      </div>
                    </div>
                    {!isFriend(user.nickname) && (
                      <FaUserPlus
                        className="text-2xl text-pink-500 cursor-pointer"
                        onClick={() => follow(user.nickname)}
                      />
                    )}
                  </div>
                ))
              )
            ) : (
              <div className="text-center text-2xl">
                <RadarAnimation />
              </div>
            )}
          </div>
        </div>
        <AlertModal
          show={alertShow}
          message={alertMessage}
          onClose={() => setAlertShow(false)}
        />
      </div>
    </Draggable>
  );
};

export default SearchModal;
