import { FaUser } from "react-icons/fa";

const checkCategory = (category)=>{
    let image = "";
    switch(category){
        case "친목" : image = "https://i.pinimg.com/474x/c7/44/93/c7449358a994b74b6d050e67b5fbc96a.jpg"; break; 
        case "고민상담" : image = "https://i.pinimg.com/564x/e3/a0/3c/e3a03c70149081698a5570a2d01a783b.jpg"; break; 
        case "여행" : image = "https://i.pinimg.com/564x/78/28/02/782802803713a8847ce9795ec7896ff1.jpg"; break; 
        case "피트니스" : image = "https://i.pinimg.com/474x/0d/09/90/0d09900987a624c7d32e3c61f709eef0.jpg"; break; 
        case "게임" : image = "https://i.pinimg.com/474x/06/da/fd/06dafda6aee8100e33ba07629c00cc4f.jpg"; break; 
        case "회사생활" : image = "https://i.pinimg.com/474x/3a/fa/9a/3afa9af4a8b60b7a2925e3d5b40c663d.jpg"; break; 
        case "대학생" : image = "https://i.pinimg.com/474x/14/09/66/14096623c48c2e94d52373f7fa23efe4.jpg"; break; 
        default : image = "https://i.pinimg.com/474x/fb/ee/36/fbee365b8238c5713ae24100f7f9d99d.jpg"
    }
    return image;
}


const ChatCard = ({chat}) => {
    //chat = {category : "", title : "", nickname : "", create: "2024-05-30 14:33", participants:2, totalParticipants: 6 }
    return ( 
        <div className="flex flex-col bg-white w-full py-5 px-10 my-5 rounded-xl">
            <img className="w-full h-48 border shadow-lg mb-5" src={checkCategory(chat.category)} alt={chat.category}/>
            <div className="flex justify-between">
                <span className="text-gray-500">{chat.category}</span>
                <span className="text-sm">{chat.nickname}</span>
            </div>
            <p className="font-black text-xl my-1">{chat.title}</p>
            <div className="flex justify-between text-sm">
                <span>{chat.create}</span>
                <span className="flex flex-row gap-2 items-center"><FaUser/>{`${chat.participants}/${chat.totalParticipants}`}</span>
            </div>

        </div>
     );
}
 
export default ChatCard;