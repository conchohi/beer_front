import React from 'react';
import BoardModalComponent from './BoardModalComponent';

const AddPostModalComponent = ({ isOpen, onClose, newPost, setNewPost, handleAddPost }) => {
    const handleMouseDown = (e) => {
        e.stopPropagation();
    };
    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl mb-4 text-pink-500">글 등록</h2>
            <input
                type="text"
                placeholder="제목"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
                onMouseDown={handleMouseDown}
            />
            <textarea
                placeholder="내용"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="mb-4 p-2 border rounded w-full bg-gray-700 h-52"
                onMouseDown={handleMouseDown}

            />
            <input
                type="text"
                placeholder="작성자"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
            />
            <button
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                onClick={handleAddPost}
            >
                등록
            </button>
        </BoardModalComponent>
    );
};

export default AddPostModalComponent;
