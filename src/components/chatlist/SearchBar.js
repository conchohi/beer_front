import { useEffect, useState } from "react";
import SearchTypeCheck from "./SearchTypeCheck";
import useChatMove from "../../hooks/useChatMove";
import { FaPlus, FaPlusSquare } from "react-icons/fa";
import CreateRoom from "../../modal/CreateRoom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const { moveToList, ordeyBy } = useChatMove();
    const [createRoom, setCreateRoom] = useState(false);

    const handleInput = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleType = (searchType) => {
        setSearchType(searchType);
    }

    const handleOrder = (orderBy) =>{
        setOrderBy(orderBy)
    }

    const handleSearchClick = () => {
        moveToList({ searchType: searchType, searchTerm: searchTerm, ordeyBy: ordeyBy })
    }

    useEffect(() => {
        moveToList({ searchType: searchType, searchTerm: searchTerm, ordeyBy: ordeyBy })
    }, [searchType])

    const handleCreate = () =>{
        setCreateRoom(!createRoom);
    }

    return (
        <div className="flex flex-row gap-4 justify-center items-center">
            {createRoom && <CreateRoom close={handleCreate}/>}
            {/* 검색 유형*/}
            <SearchTypeCheck setSearchType={handleType} />

            <div className="flex w-3/5 border-2 border-gray-200 bg-white rounded overflow-hidden">
                <input
                    type="text"
                    placeholder="채팅방 검색"
                    value={searchTerm}
                    onChange={handleInput}
                    className="px-4 py-2 w-4/5 focus:outline-none" // input 필드의 길이 조정은 w-full 유지
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            handleSearchClick()
                        }
                    }} />
                <button
                    onClick={handleSearchClick}
                    className="flex w-1/5 items-center justify-center text-center gap-2 border-l text-white bg-[#BE2222] hover:bg-[#EB3030]" // 호버 효과 추가
                >

                    <svg
                        className="w-6 h-6 "
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <span className="hidden lg:block text-sm md:text-base font-semibold">검색</span>
                </button>
            </div>
            <div>
                <button className="bg-[#BE2222] px-3 rounded-lg text-white py-2 lg:px-10" onClick={handleCreate}>
                    <span className="hidden lg:block text-lg font-semibold">방 생성</span>
                    <span className="block lg:hidden"><FaPlus size="30" /></span>
                </button>
            </div>
        </div>);
}

export default SearchBar;