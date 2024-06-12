import { useNavigate } from "react-router-dom";

const DestoryCheckModal = ({ setCheckDestroy, destroy }) => {
    const navigate = useNavigate();
    return (
        <div className="w-lvw h-lvh z-10 fixed top-0 left-0 bg-black/40">
            <div className="absolute bg-white top-1/2 left-1/2 w-[240px] h-[140px] z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow">
                <div className="flex flex-col justify-center text-center h-full p-5">
                    <div className="h-2/3 px-8 flex justify-center items-center rounded-xl">
                        <span className="font-bold">현재 채팅방을 <br /> 종료 하시겠습니까?</span>
                    </div>
                    <div className="h-1/3 flex justify-center items-center text-center gap-5">
                        <button className="px-5 py-2 bg-[#BE2222] text-white text-sm font-bold rounded-xl" onClick={destroy}>종료</button>
                        <button className="px-5 py-2 bg-yellow-400 text-sm font-bold rounded-xl" onClick={() => { setCheckDestroy(false) }}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DestoryCheckModal;