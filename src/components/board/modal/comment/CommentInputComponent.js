import React, { useState } from 'react';
import { addComment } from '../../../../api/BoardApi';

const CommentInputComponent = ({boardNo, comments, setComments,setMessage,setBasicModal}) => {
    const [newComment, setNewComment] = useState('');

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = () => {
        if(!newComment || newComment.length === 0){
            setMessage('내용을 입력하세요.')
            setBasicModal(true)
            return
        }
        addComment({boardNo:boardNo, content:newComment}).then(result=>{
            const updateComments = [...comments];
            updateComments.push(result)
            setComments(updateComments);
            setNewComment('');
        }).catch(error=>{
            setMessage('로그인 후 이용 가능합니다.')
            setBasicModal(true)
        })
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="mt-4 flex items-center">
            <input
                type="text"
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={handleNewCommentChange}
                onMouseDown={handleMouseDown}
                className="p-2 border rounded w-5/6 mb-2 text-black"
            />
            <button
                className="p-2 border-pink-500 rounded w-1/6 mb-2 bg-pink-500 text-white hover:bg-pink-600"
                onClick={handleSubmit}
            >
                등록
            </button>
        </div>
    );
};

export default CommentInputComponent;
