import React, { useState, useEffect } from 'react';
import privateApi from '../../../../api/axios_intercepter';

const FriendImageDisplay = ({ fileName }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await privateApi.get(`/api/user/${fileName}`, { responseType: 'arraybuffer' });
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setImageSrc(`data:image/jpeg;base64,${base64}`);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [fileName]);

    return (
        <div>
            {imageSrc ? (
                <img 
                    src={imageSrc} 
                    alt={fileName} 
                    className='w-12 h-12 rounded-full border-4 border-transparent'
                />
            ) : (
                <img 
                    src="/logo/basic.png" 
                    alt="default" 
                    className='w-12 h-12 rounded-full border-4 border-transparent' 
                />
            )}
        </div>
    );
};

export default FriendImageDisplay;
