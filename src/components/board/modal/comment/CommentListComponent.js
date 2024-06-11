import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

const CommentListComponent = ({ 
    comments, 
    editingCommentId, 
    editingCommentContent, 
    handleEditCommentChange, 
    handleDeleteComment, 
  }) => {
      if (!comments) {
          return null;
      }
  
      return (
          <div>
              {comments.map(comment => (
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
                                  {/* Additional buttons or actions can go here */}
                              </div>
                          </div>
                      ) : (
                          <div className="flex-1">
                              <div className="bg-gray-800 p-4 rounded-lg">
                                  <div className="space-y-4">
                                      <div className="bg-gray-600 p-2 rounded-lg flex items-center mb-2">
                                          <CgProfile className="w-10 h-10 mr-2" />
                                          <div className="bg-gray-700 p-2 rounded-lg flex-grow mr-1">
                                              <div className="text-pink-500 font-semibold justify-between">{comment.writer} {comment.createDate}</div>
                                              <div className="text-gray-200">{comment.content}</div>
                                          </div>
                                          <AiOutlineCloseCircle className="w-6 h-6 ml-2" onClick={() => handleDeleteComment(comment.id)} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              ))}
          </div>
      );
  };
export default CommentListComponent;
