import React from "react";

const BasicModalComponent = ({message, callbackFunction}) => {
    return ( 
        <div className="w-lvw h-lvh z-50 fixed top-0 left-0 bg-black/40">
            <div className="absolute bg-white top-1/2 left-1/2 w-[240px] h-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg shadow">
                <div className="flex flex-col justify-center h-full p-3">
                    <div className="text-center w-full h-2/3 mb-2 flex justify-center items-center px-3"> {message} </div>
                    <div className="text-center"><button className="border py-2 px-5 rounded-md bg-yellow-400" onClick={callbackFunction}>닫기</button></div>
                </div>
            </div>
        </div>
     );
}
 
export default BasicModalComponent;