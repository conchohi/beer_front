import React, { useState, useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import AddPostModalComponent from './modal/AddPostModalComponent';
import DetailPostModalComponent from './modal/DetailPostModalComponent';
import EditPostModalComponent from './modal/EditPostModalComponent';
import Astronaut4 from '../animation/Astronaut4';
import { getAllBoards, registerBoard, updateBoard, deleteBoard, addComment, deleteComment } from '../../api/BoardApi';

// const initialBoardData = [
//     {
//         id: 1,
//         title: '11시에 술드실분 1/4',
//         content: '오늘 11시에 술드실분',
//         author: '사용자',
//         date: '2024-06-04',
//         views: 10,
//         comments: []
//     },
//     {
//         id: 2,
//         title: '7시에 급벙하실분 2/4',
//         content: '7시에 노실분 구해요!',
//         author: '유저',
//         date: '2024-06-03',
//         views: 20,
//         comments: []
//     },
//     {
//         id: 3,
//         title: '10시에 게임하실분',
//         content: '게임 고고',
//         author: '작성자',
//         date: '2024-06-02',
//         views: 30,
//         comments: []
//     },
//     // Add more dummy data for demonstration
//     {
//         id: 4,
//         title: 'New Title 1',
//         content: 'New Content 1',
//         author: 'Author 1',
//         date: '2024-06-01',
//         views: 15,
//         comments: []
//     },
//     {
//         id: 5,
//         title: 'New Title 2',
//         content: 'New Content 2',
//         author: 'Author 2',
//         date: '2024-06-01',
//         views: 25,
//         comments: []
//     },
//     {
//         id: 6,
//         title: 'New Title 3',
//         content: 'New Content 3',
//         author: 'Author 3',
//         date: '2024-06-01',
//         views: 35,
//         comments: []
//     }
// ];


const BoardMain = () => {
    const [boardData, setBoardData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('title');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        writer: '',
        regDate: '',
        modifyDate: '',
        count: 0,
        commentEntityList: []
    });


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    const filteredData = boardData.filter((item) => {
        if (searchCategory === 'title') {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCategory === 'content') {
            return item.content.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchCategory === 'writer') {
            return item.writer.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    const handleAddPost = () => {
        const updatedBoardData = [...boardData, { ...newPost, id: boardData.length + 1, date: new Date().toISOString().split('T')[0] }];
        setBoardData(updatedBoardData);
        setNewPost({ title: '', content: '', writer: '', regDate: '', count: 0 });
        setIsModalOpen(false);
    };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredData.length / postsPerPage);

    const handleAddComment = (content) => {
        const updatedBoardData = boardData.map((post) => {
            if (post.id === selectedPost.id) {
                const updatedComments = Array.isArray(post.comments) ? post.comments : [];
                return {
                    ...post,
                    comments: [...updatedComments, {
                        id: updatedComments.length + 1,
                        content,
                        writer: 'current_user',
                        createDate: new Date().toISOString().split('T')[0]
                    }]
                };
            }
            return post;
        });
        setBoardData(updatedBoardData);
        const updatedSelectedPostComments = Array.isArray(selectedPost.comments) ? selectedPost.comments : [];
        setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, { id: selectedPost.comments.length + 1, content, writer: 'current_user', date: new Date().toISOString().split('T')[0] }] });
    };

  

    const handlePostSelection = (post) => {
        setSelectedPost({
            ...post,
            comments: Array.isArray(post.comments) ? post.comments : []
        });
        setIsDetailModalOpen(true);
    };

  const handleEditComment = (commentId, content) => {
    const updatedBoardData = boardData.map((post) => {
      if (post.id === selectedPost.id) {
        const updatedComments = post.comments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setBoardData(updatedBoardData);
    setSelectedPost({
      ...selectedPost,
      comments: selectedPost.comments.map((comment) =>
        comment.id === commentId ? { ...comment, content } : comment
      ),
    });
  };

  const handleDeleteComment = (commentId) => {
    const updatedBoardData = boardData.map((post) => {
      if (post.id === selectedPost.id) {
        const updatedComments = post.comments.filter(
          (comment) => comment.id !== commentId
        );
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setBoardData(updatedBoardData);
    setSelectedPost({
      ...selectedPost,
      comments: selectedPost.comments.filter(
        (comment) => comment.id !== commentId
      ),
    });
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <BasicLayout>
      <div className="w-full h-auto text-lg md:text-4xl text-black font-sans p-6 md:px-80 md:py-30 flex flex-col ">
        <div className="bg-gray-700 bg-opacity-50 w-full h-auto rounded-2xl flex flex-col justify-between p-6 md:p-12 min-w-[500px] min-h-[600px]">
          <div className="bg-gray-900 bg-opacity-90 w-full h-auto rounded-2xl p-5 md:p-18 text-left mb-6  md:mb-12 min-w-[250px]">
            <h1 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center justify-center">
              <Astronaut4 />
              <span className="ml-2">커뮤니티</span>
            </h1>
                        {/* 게시글 */}
                        <div className="p-4 m-4 rounded-md shadow-md min-w-[300px]">
                            {currentPosts.map((item) => (
                                <div
                                    key={item.id}
                                    className="mb-2 p-2 border-b border-pink-300 cursor-pointer"
                                    onClick={() => {
                                        handlePostSelection(item);
                                        setIsDetailModalOpen(true);
                                    }}
                                >
                                    <h2 className="text-base font-bold text-pink-500">{truncateText(item.title, 20)}</h2>
                                    <p className="text-white text-sm">{truncateText(item.content, 20)}</p>
                                    <div className="text-sm text-gray-500 mt-1 min-w-[350px]">
                                        <span className="mr-4">작성자: {item.writer}</span>
                                        <span className="mr-4">등록일: {item.regDate}</span>
                                        <span>조회수: {item.views}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
            {/* 등록버튼 */}
            <div className="flex justify-end mr-4 mb-4">
              <button
                className=" ml-4 px-3 py-2 bg-pink-500 text-white text-base font-semibold rounded-md hover:bg-pink-600 bottom-10 mt-4 md:mt-0"
                onClick={() => setIsModalOpen(true)}
              >
                글 등록
              </button>
            </div>

            {/* 게시글 */}
            <div className="p-4 m-4 rounded-md shadow-md min-w-[300px]">
              {currentPosts.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 p-2 border-b border-pink-300 cursor-pointer"
                  onClick={() => {
                    setSelectedPost(item);
                    setIsDetailModalOpen(true);
                  }}
                >
                  <h2 className="text-base font-bold text-pink-500">
                    {truncateText(item.title, 20)}
                  </h2>
                  <p className="text-white text-sm">
                    {truncateText(item.content, 20)}
                  </p>
                  <div className="text-sm text-gray-500 mt-1 min-w-[350px]">
                    <span className="mr-4">작성자: {item.author}</span>
                    <span className="mr-4">등록일: {item.date}</span>
                    <span>조회수: {item.views}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-1 mb-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end"></div>
        </div>
      </div>

      <AddPostModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newPost={newPost}
        setNewPost={setNewPost}
        handleAddPost={handleAddPost}
      />

      {selectedPost && (
        <DetailPostModalComponent
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          selectedPost={selectedPost}
          onEdit={() => {
            setIsEditModalOpen(true);
            setIsDetailModalOpen(false);
          }}
          onDelete={handleDeletePost}
          handleAddComment={handleAddComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      )}

      {selectedPost && (
        <EditPostModalComponent
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          handleEditPost={handleEditPost}
        />
      )}
    </BasicLayout>
  );
};

export default BoardMain;
