import React from 'react';
import BoardModalComponent from './BoardModalComponent';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineWatchLater } from "react-icons/md";

const EditPostModalComponent = ({ isOpen, onClose, selectedPost, setSelectedPost, handleEditPost }) => {
    const handleMouseDown = (e) => {
        e.stopPropagation();
    };
    
    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <div className="fixed inset-0 flex justify-center items-center z-50">
                <div className="bg-gray-800 border-2 border-pink-500 text-gray-200 rounded-lg w-11/12 max-w-2xl p-6 relative">
                    <button className="absolute top-4 right-4 text-pink-500" onClick={onClose}>
                        <AiOutlineClose size={24} />
                    </button>

                    <h2 className="text-2xl mb-4 text-pink-500 font-semibold" onMouseDown={handleMouseDown}>글 수정</h2>
                    {/* 게시판 제목 불러오기 */}
                    <div className="text-pink-500 text-xl mb-4 font-semibold" onMouseDown={handleMouseDown}>
                        <input
                        
                            type="text"
                            name="title"
                            placeholder="제목"
                            value={selectedPost.title}
                            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                            className="mb-4 p-2 border rounded w-full text-pink-500 font-semibold"
                        />
                    </div>

                    {/* 선택게시판 내용 불러오기 */}
                    <textarea
                        placeholder="내용"
                        value={selectedPost.content}
                        onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                        className="mb-4 p-2 border rounded w-full bg-gray-700 h-52"
                        onMouseDown={handleMouseDown}
                    />

                    <div className="mb-4 flex justify-center">
                        <button className="px-4 py-2 mr-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600" onClick={handleEditPost}>
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </BoardModalComponent>
    );
};

export default EditPostModalComponent;
