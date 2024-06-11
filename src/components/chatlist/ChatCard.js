import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordModalComponent from "./modal/PasswordModalComponent";
import BasicModalComponent from "../common/BasicModalComponent";

const ChatCard = ({chat}) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const token = localStorage.getItem('access')

    const moveToChat = () =>{
        if(!token){
            setOpenModal(true);
            return;
        }

        if(chat.roomPw){
            setPasswordModal(true);
        } else{
            navigate(`/chat/${chat.roomNo}`)
        }
    }
    
    return ( 
        <>
        {openModal && <BasicModalComponent message="로그인 후 이용 가능합니다." callbackFunction={()=>{navigate('/login')}}/>}
        {passwordModal && <PasswordModalComponent roomNo={chat.roomNo} close={()=>{setPasswordModal(false)}}/>}
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