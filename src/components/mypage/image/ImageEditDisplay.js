import React, { useState, useEffect } from 'react';
import privateApi, { API_SERVER_HOST } from '../../../api/axios_intercepter';

const ImageEditDisplay = ({ fileName }) => {
    return (
        <div>
            {(fileName==null || !fileName.startsWith("blob:")) ? (
                <img
                    src={`${API_SERVER_HOST}/api/user/${fileName}`}
                    alt="profile"
                    className='w-36 h-36 rounded-full border-4 border-transparent'
                />
            ) : (
                <img
                    src={fileName}
                    alt="profile"
                    className='w-36 h-36 rounded-full border-4 border-transparent'
                />
            )}
        </div>
    );
};

export default ImageEditDisplay;
