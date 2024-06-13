import { API_SERVER_HOST } from '../../../../api/axios_intercepter';

const FriendImageDisplay = ({ fileName }) => {


    return (
        <div>

            <img
                src={`${API_SERVER_HOST}/api/user/${fileName}`}
                alt={fileName}
                className='w-12 h-12 rounded-full border border-black'
            />

        </div>
    );
};

export default FriendImageDisplay;
