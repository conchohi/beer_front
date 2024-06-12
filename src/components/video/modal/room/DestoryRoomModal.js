import { useNavigate } from "react-router-dom";

const DestoryRoomModal = () => {
    const navigate = useNavigate();
    return ( 
        <div className="w-lvw h-lvh z-10 fixed top-0 left-0 bg-black/40">
            <div className="absolute bg-gray-800 top-1/2 left-1/2 w-[480px] h-[240px] z-50 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow border-4 border-pink-500">
                <div className="flex flex-col justify-center text-center h-full p-5">
                    <div className="h-2/3 px-8 flex justify-center items-center rounded-xl">
                        <span className=" text-3xl font-bold text-white">방장에 의해 화상채팅이 종료 되었습니다.</span>
                    </div>
                    <div className="h-1/3 flex justify-center items-center text-center">
                        <button className="px-5 py-3 bg-pink-500 text-white text-xl font-bold rounded-xl" onClick={()=>{navigate('/chat/list')}}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DestoryRoomModal;