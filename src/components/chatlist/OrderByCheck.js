import React, { useEffect, useState } from 'react';import { TbArrowsSort } from 'react-icons/tb';
;
function OrderByeheck() {
    //선택된 지역의 값 설정
    const [orderBy, setOrderBy] = useState("최신순");
    //드롭다운 여부값 설정
    const [isOpen, setIsOpen] = useState(false);

    //클릭될 경우 selectedValue 값에 클릭된 값 설정
    const handleItemClick = (e) => {
        setOrderBy(e.target.id);
        setIsOpen(!isOpen); 
    };

    // 클릭할 때마다 clickValue의 상태를 변경
    const handleDropdownClick = () => {
        setIsOpen(!isOpen); 
    };

    useEffect(()=>{
        
    }, [orderBy])

    return (
        <div className="relative inline-block">
            <div className="flex items-center justify-betweenpx-4 py-2 cursor-pointer gap-1" onClick={handleDropdownClick} >
                <span className='text-center text-sm font-bold'>{orderBy}</span>
                <TbArrowsSort size="25" />
            </div>
            {isOpen && (
            <div className="w-32 absolute right-0 z-10 mt-2 bg-white border border-[#ebebeb] rounded-md shadow-lg">
                <ul className='text-left text-sm px-2 py-1'>
                    <li id="최신순"
                        onClick={handleItemClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      최신순
                    </li>
                    <li id="오래된순"
                        onClick={handleItemClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      오래된순
                    </li>
                    <li id="최다인원순"
                        onClick={handleItemClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      최다인원순
                    </li>
                    <li id="최저인원순"
                        onClick={handleItemClick}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      최저인원순
                    </li>
                </ul>
            </div>
            )}
        </div>
    );
}

export default  OrderByeheck;