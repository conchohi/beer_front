import { API_SERVER_HOST } from "../../api/axios_intercepter";

const ParticipantList = ({participantList, setClickUserNick}) => {
    return (
        <>
            <div className="flex flex-row justify-center items-center text-sm ">
                {participantList.map(participant=>{
                    return(
                        <div className="flex flex-col justify-center items-center px-2 pb-4 cursor-pointer min-w-[100px] " onClick={()=>{setClickUserNick(participant.nickname)}}>
                            <img className="w-10 h-10 rounded-full m-2" alt={`${participant.nickname}`} src={participant.profileImage ? `${API_SERVER_HOST}/api/user/${participant.profileImage}` : "/logo/basic.png" }/>
                            <span>{participant.nickname}</span>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default ParticipantList;