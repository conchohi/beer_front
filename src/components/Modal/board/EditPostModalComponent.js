import React from 'react';
import BoardModalComponent from './BoardModalComponent';

const EditPostModalComponent = ({ isOpen, onClose, selectedPost, setSelectedPost, handleEditPost }) => {
    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl mb-4 text-pink-500">글 수정</h2>
            <input
                type="text"
                placeholder="제목"
                value={selectedPost.title}
                onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
            />
            <textarea
                placeholder="내용"
                value={selectedPost.content}
                onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleEditPost}
            >
                수정
            </button>
        </BoardModalComponent>
    );
};

export default EditPostModalComponent;
