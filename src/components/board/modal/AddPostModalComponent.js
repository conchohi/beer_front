import React, {useEffect} from 'react';
import BoardModalComponent from './BoardModalComponent';
import { AiOutlineClose } from 'react-icons/ai';

const AddPostModalComponent = ({ isOpen, onClose, newPost, setNewPost, handleAddPost }) => {
    const handleMouseDown = (e) => {
        e.stopPropagation();
    };

    // useEffect(() => {
    //     // 모달이 열릴 때 작성자를 현재 유저의 닉네임으로 설정
    //     if (isOpen && currentUser) {
    //         setNewPost((prevNewPost) => ({ ...prevNewPost, writer: currentUser.nickname }));
    //     }
    // }, [isOpen, currentUser, setNewPost]);


    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="fixed inset-0 flex justify-center items-center z-50 ">
                <div className="bg-gray-800 border-2 border-pink-500 text-gray-600 rounded-lg w-11/12 max-w-2xl p-6 relative">
                    <button className="absolute top-4 right-4 text-pink-500" onClick={onClose}>
                        <AiOutlineClose size={24} />
                    </button>
            <h2 className="text-2xl mb-4 text-pink-500">글 등록</h2>
            <input
                type="text"
                placeholder="제목"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
                onMouseDown={handleMouseDown}
            />
            <input
                type="text"
                placeholder="작성자"
                value={newPost.writer}
                readOnly
                onChange={(e) => setNewPost({ ...newPost, writer: e.target.value })}
                className="mb-4 p-2 border rounded w-full"
            />
            <textarea
                placeholder="내용"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="mb-4 p-2 border rounded w-full bg-gray-700 h-52"
                onMouseDown={handleMouseDown}

            />

            <button
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                onClick={handleAddPost}
            >
                등록
            </button>
            </div>
            </div>
        </BoardModalComponent>
    );
};

export default AddPostModalComponent;
