import React, {useEffect, useState} from 'react';
import BoardModalComponent from './BoardModalComponent';
import { AiOutlineClose } from 'react-icons/ai';
import { registerBoard } from '../../../api/BoardApi';

const AddPostModalComponent = ({ isOpen, onClose, refresh,setMessage, setBasicModal }) => {
    const [newPost, setNewPost] = useState({writer:localStorage.getItem('nickname')});

    const handleMouseDown = (e) => {
        e.stopPropagation();
    };

    const handleAddPost = (()=>{
        if(!newPost.title || newPost.title.length === 0){
            setMessage('제목을 입력하세요.')
            setBasicModal(true)
            return
        }
        if(!newPost.content || newPost.content.length === 0){
            setMessage('내용을 입력하세요.')
            setBasicModal(true)
            return
        }
        registerBoard(newPost).then(result=>{
            setMessage('게시글 등록 완료!')
            setBasicModal(true)
            onClose();
            refresh();
        })
    })

    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="fixed inset-0 flex justify-center items-center z-30 ">
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
