import React, { useState } from "react";
import { checkPassword } from "../../../api/roomApi";
import { Navigate, useNavigate } from "react-router-dom";
import BasicModalComponent from "../../common/BasicModalComponent";

const PasswordModalComponent = ({ roomNo, close }) => {
    const navigate = useNavigate();
    const [roomPw, setRoomPw] = useState("");
    const [openError, setOpenError] = useState(false)
    const [message, setMessage] = useState("")

    const checkPasswordClick = () => {
        checkPassword({ roomNo: roomNo, roomPw: roomPw }).then(result => {
            navigate(`/chat/${roomNo}`)
        }).catch(error => {
            setOpenError(true);
            setMessage(error.response.data.message)
            console.log(error)
        })

    }

    return (
        <>
            {openError && <BasicModalComponent message={message} callbackFunction={close} />}
            <div className="w-lvw h-lvh z-10 fixed top-0 left-0 bg-black/40">
                <div className="absolute bg-white top-1/2 left-1/2 w-[240px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg shadow">
                    <div className="flex flex-col justify-center h-full py-2 px-3">
                        <div className="text-center w-full h-2/3 mb-2 flex justify-center items-end relative">
                            <input
                                type="password"
                                placeholder="방 비밀번호를 입력하세요."
                                value={roomPw} onChange={(e) => { setRoomPw(e.target.value) }}
                                className="p-3 mt-2 rounded-lg bg-gray-700 text-black text-center"
                            />
                        </div>
                        <div className="text-center">
                            <button className="border py-2 px-5 rounded-md bg-yellow-400" onClick={checkPasswordClick}>입장</button>
                            <button className="border py-2 px-5 rounded-md" onClick={close}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PasswordModalComponent;