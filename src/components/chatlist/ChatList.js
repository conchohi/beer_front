import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import PageComponent from "./PageComponent";
import useChatMove from "../../hooks/useChatMove";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import OrderByeheck from "./OrderByCheck";

const ChatList = () => {
    //차후 데이터는 한번에 받을 듯
    const [chatList, setChatList] = useState([]);
    const [total, setTotal] = useState(0);
    const { moveToList } = useChatMove();

    useEffect(() => {
        setChatList([
            { roomNo: 6, category: "고민상담", title: "캔맥들고 모여", nickname: "BeerKing", create: "2024-05-30 14:33", participants: 2, totalParticipants: 6 },
            { roomNo: 5, category: "회사생활", title: "외로운 밤..", nickname: "외로워요", create: "2024-05-30 14:33", participants: 5, totalParticipants: 6 },
            { roomNo: 4, category: "피트니스", title: "같이 돌 잡으실분", nickname: "돌잔치", create: "2024-05-30 14:33", participants: 3, totalParticipants: 6 },
            { roomNo: 3, category: "게임", title: "게임 할 사람", nickname: "챌린저", create: "2024-05-30 14:33", participants: 4, totalParticipants: 6 },
            { roomNo: 2, category: "친목", title: "배고파요", nickname: "잠만보", create: "2024-05-30 14:33", participants: 1, totalParticipants: 4 },
            { roomNo: 1, category: "여행", title: "제주도 갈사람", nickname: "귤귤", create: "2024-05-30 14:33", participants: 4, totalParticipants: 4 },
        ])
        setTotal(55);
    }, [])

    return (
        <div className="mx-auto mb-10">
            {/* 검색 창*/}
            <div className="my-8">
                <SearchBar/>
            </div>
            {/* 채팅방 리스트 */}
            <div className="bg-[#D9D9D9] py-3 px-5 rounded-xl">
                <div className="flex justify-between px-6">
                    <p className="font-bold px-3 py-2">현재 개설된 방 ( {total} )</p>
                    <OrderByeheck/>
                </div>
                
                <div className="w-full flex flex-row flex-wrap items-center">
                    {chatList.map(chat => {
                        return (
                            <div className="px-5 md:w-1/2 lg:w-1/3">
                                <Link to={`/chat/${chat.roomNo}`}>
                                    <ChatCard chat={chat} />
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {/* 페이징 처리 */}
                <PageComponent serverData={{
                    data: {
                        prev: false,
                        next: true,
                        pageNumList: [1, 2, 3, 4, 5],
                        nextPage: 6,
                        current: 1
                    }
                }} moveToList={moveToList} />
            </div>

        </div>
    );
}

export default ChatList;