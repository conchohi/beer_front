import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordModalComponent from "./modal/PasswordModalComponent";

const ChatCard = ({chat}) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const moveToChat = () =>{
        if(chat.roomPw){
            setOpenModal(true);
        } else{
            navigate(`/chat/${chat.roomNo}`)
        }
    }
    
    return ( 
        <>
        {openModal && <PasswordModalComponent roomNo={chat.roomNo} close={()=>{setOpenModal(false)}}/>}
        <div className="flex flex-col bg-white w-full py-5 px-5 my-5 rounded-xl cursor-pointer" onClick={moveToChat}>
            <img className="w-full border shadow-lg mb-5" src={ `/img/chatlist/${chat.category}.png`} alt={chat.category}/>
            <div className="flex justify-between">
                <span className="text-gray-500 text-xl">{chat.category}</span>
                <span className="text">{chat.master}</span>
            </div>
            <p className="font-black text-2xl my-1">{chat.title} {chat.roomPw && <FaLock className="inline text-lg"/>}</p>
            <div className="flex justify-between text-sm">
                <span>{chat.createDate}</span>
                <span className="flex flex-row gap-2 items-center"><FaUser/>{`${chat.currentUser}/${chat.maximumUser}`}</span>
            </div>

        </div>
        </>
     );
}
 
export default ChatCard;