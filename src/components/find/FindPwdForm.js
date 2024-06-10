import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function FindPwdForm({title, content, find, btn1, btn2}){
    const [input, setInput] = useState({email:"", phone:""});
    const {email, phone} = input;

    const navigate = useNavigate();

    const changeInput = (e) =>{
        let id = e.target.id
        let value = e.target.value
        setInput({...input, [id]:value});
    }
    
    const findPwd= () => {
        //axios.get(input);
    }
    
    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="w-1/3 text-center p-5 mt-10 text-2xl font-bold border-b border-b-black">비밀번호 찾기</div>
            <div className="flex flex-col mt-5 mb-10 w-1/3">
                <p className="py-3 mb-5 font-light text-sm">가입시 등록한 이메일 입력시 <br/> 인증번호를 보내드립니다.</p>
                <div className="flex flex-col">
                    <label for="email">이메일 주소</label>
                    <input
                        id="email" name="email" type="text" className="border-b border-gray-700 py-1 focus:border-b-2 focus:border-blue-950 transition-colors focus:outline-none"
                    placeholder="ex)abc123@exmaple.com"/>
                </div>

            </div>
            <div className="flex flex-wrap justify-between w-1/3">
            <button className="bg-[#ffb13c] hover:bg-[#ffc17f] w-full p-3 mb-3 text-lg font-medium rounded-full" onClick={findPwd}>비밀번호 찾기</button>
            <button className="bg-[#c6c6c6] hover:bg-[#e6e6e6] w-[48%] p-3 rounded-full" onClick={()=>{navigate("/login")}}>로그인</button>
            <button className="bg-[#c6c6c6] hover:bg-[#e6e6e6] w-[48%] p-3 rounded-full" onClick={()=>{navigate("/find/id")}}>아이디 찾기</button>

            </div>
        </div>
    )
}

export default FindPwdForm;