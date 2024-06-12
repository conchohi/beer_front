import React, { useState, useEffect } from 'react';
import privateApi from '../../../api/axios_intercepter';

const ImageEditDisplay = ({ fileName }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (fileName && !fileName.startsWith("blob:")) { // Check if the filename is a blob URL
                    const response = await privateApi.get(`/api/user/${fileName}`, { responseType: 'arraybuffer' });
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    setImageSrc(`data:image/jpeg;base64,${base64}`);
                } else {
                    setImageSrc(fileName); // Directly use the blob URL
                }
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
                    alt="profile" 
                    className='w-36 h-36 md:w-48 md:h-48 lg:w-72 lg:h-60 rounded-full border-4 border-transparent'
                />
            ) : (
                <img 
                    src="/logo/basic.png" 
                    alt="default" 
                    className='w-36 h-36 md:w-48 md:h-48 lg:w-72 lg:h-60 rounded-full border-4 border-transparent' 
                />
            )}
        </div>
    );
};

export default ImageEditDisplay;
