import { useEffect, useState } from "react";
import SearchTypeCheck from "./SearchTypeCheck";
import useChatMove from "../../hooks/useChatMove";
import { FaPlus, FaPlusSquare } from "react-icons/fa";
import CreateRoom from "../../modal/CreateRoom";
import CategorySelector from "./CategorySelector";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("방제목");
    const [category, setCategory] = useState("");
    const { moveToList, ordeyBy } = useChatMove();
    const [createRoom, setCreateRoom] = useState(false);

    const handleInput = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleType = (searchType) => {
        setSearchType(searchType);
    }

    const handleCategory = ((category)=>{
        setCategory(category);
    })

    const handleSearchClick = () => {
        moveToList({ searchType: searchType, searchTerm: searchTerm, orderBy: ordeyBy, category:category })
    }

    useEffect(() => {
        moveToList({ searchType: searchType, searchTerm: searchTerm, orderBy: ordeyBy,category:category })
    }, [category, ordeyBy])

    const handleCreate = () =>{
        setCreateRoom(!createRoom);
    }

    return (<>
        <div className="flex flex-row gap-4 justify-center items-center mb-8">
            {createRoom && <CreateRoom close={handleCreate}/>}
            {/* 검색 유형*/}
            <SearchTypeCheck setSearchType={handleType} />

            <div className="flex w-2/5 border-2 border-gray-200 bg-white rounded overflow-hidden">
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
                    className="flex w-1/5 items-center justify-center text-center gap-2 border-l text-gray-800 bg-amber-400 hover:bg-amber-500 " // 호버 효과 추가
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
                    <span className="hidden lg:block text-base md:text-base font-semibold shadow-xl">검색</span>
                </button>
            </div>
            <div>
                <button className="bg-amber-400 px-3 rounded-lg text-gray-800 py-2 lg:px-10" onClick={handleCreate}>
                    <span className="hidden lg:block text-lg font-semibold">방 생성</span>
                    <span className="block lg:hidden"><FaPlus size="30" /></span>
                </button>
            </div>
        </div>
        <CategorySelector handleCategory={handleCategory}/>
        </>);
}

export default SearchBar;