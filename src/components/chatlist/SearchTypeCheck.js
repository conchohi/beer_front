import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaSortDown } from 'react-icons/fa';

function SearchTypeCheck({setSearchType}) {
    //선택된 지역의 값 설정
    const [viewSearchType, setViewSearchType] = useState("방제목");

    //드롭다운 여부값 설정
    const [isOpen, setIsOpen] = useState(false);

    //클릭될 경우 selectedValue 값에 클릭된 값 설정
    const handleItemClick = (e) => {
        setSearchType(e.target.id);
        setViewSearchType(e.target.id);
        setIsOpen(!isOpen); 
    };

    // 클릭할 때마다 clickValue의 상태를 변경
    const handleDropdownClick = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div className="relative inline-block">
            <div className="w-32 flex items-center justify-between bg-[#D9D9D9] border border-black rounded-md shadow-sm px-4 py-2
            cursor-pointer" onClick={handleDropdownClick} >
                <span className='text-center font-bold'>{viewSearchType}</span>
                <FaCaretDown size="30" />
            </div>
            {isOpen && (
            <div className="absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className='w-28 font-bold px-4'>
                    <li id="방제목"
                        onClick={handleItemClick}
                        className="py-2 hover:bg-gray-100 cursor-pointer">
                      방제목
                    </li>
                    <li id="닉네임"
                        onClick={handleItemClick}
                        className="py-2 hover:bg-gray-100 cursor-pointer">
                      닉네임
                    </li>
                </ul>
            </div>
            )}
        </div>
    );
}

export default SearchTypeCheck;