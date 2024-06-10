import React, { useState } from 'react';

const CommentInputComponent = ({ handleAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = () => {
        handleAddComment(newComment);
        setNewComment('');
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
                type = "submit"
                className="p-2 border-pink-500 rounded w-1/6 mb-2 bg-pink-500 text-white hover:bg-pink-600"
                onClick={handleSubmit}
            >
                등록
            </button>
        </div>
    );
};

export default CommentInputComponent;
