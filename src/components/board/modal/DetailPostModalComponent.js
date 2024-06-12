import React, { useEffect, useState } from 'react';
import BoardModalComponent from './BoardModalComponent';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineWatchLater } from "react-icons/md";
import CommentListComponent from './comment/CommentListComponent';
import CommentInputComponent from './comment/CommentInputComponent';
import { getBoardById } from '../../../api/BoardApi';

const DetailPostModalComponent = ({ boardNo, onClose}) => {
    const [selectedPost, setSelectedPost] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentContent, setEditingCommentContent] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(()=>{
        getBoardById(boardNo).then(result=>{
            setSelectedPost(result)
        }).catch(error=>{
            console.log(error)
        })
    },[boardNo])

    const handleEditCommentChange = (e) => {
        setEditingCommentContent(e.target.value);
    };
    const handleMouseDown = (e) => {
        e.stopPropagation();
    };
    

    return (<>
        <BoardModalComponent>
            <div className="fixed inset-0 flex justify-center items-center z-50 ">
                <div className="bg-gray-800 border-2 border-pink-500 text-gray-200 rounded-lg w-11/12 max-w-2xl p-6 relative">
                <button className="absolute top-4 right-4 text-pink-500" onClick={onClose}>
                        <AiOutlineClose size={24} />
                    </button>

                    <h2 className="text-pink-500 text-2xl mb-4 font-semibold" onMouseDown={handleMouseDown}> {selectedPost.title}</h2>
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                            <div className="text-gray-400 ">
                                <div className="fas fa-user mr-2"onMouseDown={handleMouseDown}></div>작성자: {selectedPost.writer}
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <MdOutlineWatchLater className="text-gray-400 mr-1" />
                            <div className="text-gray-400 font-normal" onMouseDown={handleMouseDown}> 등록일 :  {selectedPost.regDate}</div>
                        </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg mb-4 h-52" onMouseDown={handleMouseDown}>{selectedPost.content}</div>

                    <div className="mb-4 flex justify-end">
                        <button
                            className="px-4 py-2 mr-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600"
                            onClick={onEdit}
                        >
                            수정
                        </button>
                        <button
                            className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600"
                            onClick={onDelete}
                        >
                            삭제
                        </button>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-pink-400 mb-2" onMouseDown={handleMouseDown}>댓글</h3>
                        <CommentListComponent
                            comments={selectedPost.commentList}
                            editingCommentId={editingCommentId}
                            editingCommentContent={editingCommentContent}
                            handleEditCommentChange={handleEditCommentChange}
                            handleDeleteComment={handleDeleteComment}
                            setEditingCommentId={setEditingCommentId}
                            setEditingCommentContent={setEditingCommentContent}
                        />
                        <CommentInputComponent handleAddComment={handleAddComment} />
                    </div>
                </div>
            </div>
        </BoardModalComponent>
        {isEdit}
        </>
    );
};

export default DetailPostModalComponent;
