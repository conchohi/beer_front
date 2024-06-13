import  { API_SERVER_HOST } from '../../../../api/axios_intercepter';

const FriendImageDisplay = ({ fileName }) => {


    return (
        <div>
            {fileName ? (
                <img 
                    src={`${API_SERVER_HOST}/api/user/${fileName}`} 
                    alt={fileName} 
                    className='w-12 h-12 rounded-full border border-black'
                />
            ) : (
                <img 
                    src="/logo/basic.png" 
                    alt="default" 
                    className='w-12 h-12 rounded-full border border-black' 
                />
            )}
        </div>
    );
};

export default FriendImageDisplay;
