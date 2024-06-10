import React from "react";

const items = [ 
{ icon: "전체.jpg",  id:"", name:"전체"},
{ icon: "운동.jpg",  id:"피트니스", name:"피트니스"},
{ icon: "게임.jpg",  id:"게임", name:"게임"},
{ icon: "고민상담.jpg",  id:"고민상담", name:"고민상담"},
{ icon: "대학생.jpg", id:"대학생", name:"대학생"},
{ icon: "여행.jpg", id:"여행", name:"여행"},
{ icon: "친목.jpg", id:"친목", name:"친목"},
{ icon: "회사.jpg", id:"회사생활", name:"회사생활"}]

const CategorySelector = ({handleCategory}) => {

  return (
    <div className="w-2/3 mx-auto relative flex flex-row">
        {items.map((item, index) => (
          <div className="flex flex-col justify-center text-center items-center w-[12.5%]" key={index} onClick={() => handleCategory(item.id)}>
            <div className="cursor-pointer">
              <img src={`/img/chatlist/category/${item.icon}`} alt={item.name} className="w-1/2 mx-auto rounded-full mb-3"/>
              <p className="text-base text-white">{item.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategorySelector;
