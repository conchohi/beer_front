import { FaUser } from "react-icons/fa";

const ChatCard = ({chat}) => {
    //chat = {category : "", title : "", nickname : "", create: "2024-05-30 14:33", participants:2, totalParticipants: 6 }
    return ( 
        <div className="flex flex-col bg-white w-full py-5 px-5 my-5 rounded-xl">
            <img className="w-full border shadow-lg mb-5" src={`/img/chatlist/${chat.category}.png`} alt={chat.category}/>
            <div className="flex justify-between">
                <span className="text-gray-500 text-xl">{chat.category}</span>
                <span className="text">{chat.master}</span>
            </div>
            <p className="font-black text-2xl my-1">{chat.title}</p>
            <div className="flex justify-between text-sm">
                <span>{chat.createDate}</span>
                <span className="flex flex-row gap-2 items-center"><FaUser/>{`${chat.currentUser}/${chat.maximumUser}`}</span>
            </div>

        </div>
     );
}
 
export default ChatCard;