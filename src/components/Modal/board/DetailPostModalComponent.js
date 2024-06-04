import React, { useState } from 'react';
import BoardModalComponent from './BoardModalComponent';

const DetailPostModalComponent = ({ isOpen, onClose, selectedPost, onEdit, onDelete, handleAddComment, handleEditComment, handleDeleteComment }) => {
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };

    return (
        <BoardModalComponent isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl mb-4 text-pink-500">{selectedPost.title}</h2>
            <p className="mb-4 text-white">{selectedPost.content}</p>
            <div className="text-sm text-gray-500 mt-2 mb-4">
                <span className="mr-4">작성자: {selectedPost.author}</span>
                <span className="mr-4">등록일: {selectedPost.date}</span>
                <span>조회수: {selectedPost.views}</span>
            </div>
            <div className="flex justify-between mb-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={onEdit}
                >
                    수정
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={onDelete}
                >
                    삭제
                </button>
            </div>
            <div className="mb-4">
                <h3 className="text-xl text-pink-500 mb-2">댓글</h3>
                {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="mb-2 flex justify-between items-center">
                        {editingCommentId === comment.id ? (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={editingCommentContent}
                                    onChange={handleEditCommentChange}
                                    className="p-2 border rounded w-full mb-2"
                                />
                                <div className="flex justify-end space-x-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={() => {
                                            handleEditComment(comment.id, editingCommentContent);
                                            setEditingCommentId(null);
                                            setEditingCommentContent('');
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        onClick={() => {
                                            setEditingCommentId(null);
                                            setEditingCommentContent('');
                                        }}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1">
                                <p className="text-white">{comment.content}</p>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>{comment.author} {comment.date}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={() => {
                                                setEditingCommentId(comment.id);
                                                setEditingCommentContent(comment.content);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className="mt-4 flex items-center ">
                    <input
                        type="text"
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={handleNewCommentChange}
                        className="p-2 border rounded w-5/6 mb-2"
                    />
                    <button
                        className="p-2 border-pink-500 rounded w-1/6 mb-2 bg-pink-500 text-white hover:bg-pink-600"
                        onClick={() => {
                            handleAddComment(newComment);
                            setNewComment('');
                        }}
                    >
                        등록
                    </button>
                </div>
            </div>
        </BoardModalComponent>
    );
};

export default DetailPostModalComponent;
