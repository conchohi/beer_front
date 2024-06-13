import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import PageComponent from "./PageComponent";
import useChatMove from "../../hooks/useChatMove";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import OrderByeheck from "./OrderByCheck";
import { getRoomList } from "../../api/roomApi";

const ChatList = () => {
  //차후 데이터는 한번에 받을 듯
  const [chatList, setChatList] = useState([]);
  const [total, setTotal] = useState(0);
  const [serverData, setServerData] = useState({
    pageNumList: [],
  });
  const { moveToList } = useChatMove();
  const { page, size, category, searchTerm, searchType, orderBy, refresh } =
    useChatMove();

  useEffect(() => {
    getRoomList({
      page: page,
      size: size,
      category: category,
      searchTerm: searchTerm,
      searchType: searchType,
      orderBy: orderBy,
    })
      .then((result) => {
        setChatList(result.dtoList);
        setTotal(result.totalCount);
        setServerData(result);
      })
      .catch((error) => {
        console.log("error : " + error);
      });
  }, [page, size, category, orderBy, searchTerm, searchType, refresh]);

  return (
    <div className="mx-auto mb-10">
      {/* 검색 창*/}
      <div className="my-8">
        <SearchBar />
      </div>
      {/* 채팅방 리스트 */}
      <div className="bg-slate-50 bg-opacity-90 py-3 px-5 rounded-xl">
        <div className="flex justify-between px-6">
          <p className="font-bold px-3 py-2 text-lg">
            현재 개설된 방 ( {total} )
          </p>
          <OrderByeheck />
        </div>

        <div className="w-full flex flex-row flex-wrap items-center">
          {chatList.map((chat) => {
            return (
              <div className="px-5 md:w-1/2 lg:w-1/3">
                <ChatCard chat={chat} />
              </div>
            );
          })}
        </div>
        {/* 페이징 처리 */}
        <PageComponent serverData={serverData} moveToList={moveToList} />
      </div>
    </div>
  );
};

export default ChatList;
