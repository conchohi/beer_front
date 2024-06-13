import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { API_SERVER_HOST } from '../../../../api/axios_intercepter';
import { deleteComment } from '../../../../api/BoardApi';

const CommentListComponent = ({
    comments, setComments
}) => {
    if (!comments) {
        return null;
    }
    const nickname = localStorage.getItem('nickname');

    const clickDeleteComment = ( commentNo ) => {
        deleteComment(commentNo).then(result => {
            setComments(comments.filter((item) => item.commentNo !== commentNo));
        });
    };

    return (
        <div className="max-h-[240px] overflow-y-scroll scrollbar-hide">
            {comments.map(comment => (
                <div key={comment.id} className="mb-2 flex justify-between items-center">
                    <div className="flex-1">
                        <div className="bg-gray-800 rounded-lg">
                            <div className="">
                                <div className="bg-gray-600 p-2 rounded-lg flex items-center mb-2">
                                    {comment.profileImage ? <img alt={comment.nickname} src={`${API_SERVER_HOST}/api/user/${comment.profileImage}`} className="rounded-full w-10 h-10 mr-2" />
                                        : <CgProfile className="w-10 h-10 mr-2" />}
                                    <div className="bg-gray-700 p-2 rounded-lg flex-grow mr-1">
                                        <div className="text-pink-500 font-semibold justify-between">{comment.nickname} <span className="text-xs">{comment.createDate}</span></div>
                                        <div className="text-gray-200">{comment.content}</div>
                                    </div>
                                    {nickname === comment.nickname && <AiOutlineCloseCircle className="w-6 h-6 ml-2 cursor-pointer" onClick={()=>{clickDeleteComment(comment.commentNo)}} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CommentListComponent;
