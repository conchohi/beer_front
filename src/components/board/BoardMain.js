import React, { useState, useEffect } from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import AddPostModalComponent from './modal/AddPostModalComponent';
import DetailPostModalComponent from './modal/DetailPostModalComponent';
import Astronaut4 from '../animation/Astronaut4';
import { getAllBoards } from '../../api/BoardApi';
import BasicModalComponent from '../common/BasicModalComponent';

const BoardMain = () => {
    const [boardData, setBoardData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('title');
    const [refresh, setRefresh] = useState(false);
    //상세
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    //글 등록
    const [isModalOpen, setIsModalOpen] = useState(false);
    //선택한 글 번호
    const [selectedPost, setSelectedPost] = useState(null);

    const [basicModal, setBasicModal] = useState(false);
    const [message, setMessage] = useState("")

    // useEffect를 사용하여 컴포넌트가 마운트될 때 API에서 전체리스트 데이터를 가져옴
    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAllBoards();
                setBoardData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, [refresh]);

    const refreshList = () => {
        setRefresh(!refresh)
    }


    //페이징 처리
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
    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredData.length / postsPerPage);


    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    return (<>
        {basicModal && <BasicModalComponent message={message} callbackFunction={() => { setBasicModal(false) }} />}
        <BasicLayout>
            <div className="w-full h-auto text-lg md:text-4xl text-black font-sans p-6 px-80 py-30 flex flex-col ">
                <div className="bg-gray-700 w-full h-auto rounded-2xl flex flex-col justify-between p-6 md:p-12 min-w-[500px] min-h-[600px]">
                    <div className="bg-gray-900 w-full h-auto rounded-2xl p-5 md:p-18 text-left mb-6  md:mb-12 min-w-[250px]">

                        <h1 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center justify-center">
                            <Astronaut4 />
                            <span className="ml-2">커뮤니티</span>
                        </h1>

                        {/* 검색창 */}
                        <div className="flex justify-center items-center mb-2 px-6 py-2 rounded-md shadow-md font-semibold ">
                            <div className="flex space-x-4 items-center justify-center w-2/3">
                                <select
                                    className="border rounded-md bg-gray-300 text-gray-700 drop-shadow-md "
                                    value={searchCategory}
                                    onChange={(e) => setSearchCategory(e.target.value)}
                                >
                                    <option value="title">글제목</option>
                                    <option value="content">글내용</option>
                                    <option value="author">작성자</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="검색"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="border rounded-md min-w-[150px] max-w-[300px] w-full"
                                />
                            </div>
                        </div>

                        {/* 등록버튼 */}
                        <div className='flex justify-end mr-4 mb-4'>
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
                                    key={item.boardNo}
                                    className="mb-2 p-2 border-b border-pink-300 cursor-pointer"
                                    onClick={() => {
                                        setSelectedPost(item.boardNo);
                                        setIsDetailModalOpen(true);
                                    }}
                                >
                                    <h2 className="text-base font-bold text-pink-500">{truncateText(item.title, 20)}</h2>
                                    <p className="text-white text-sm">{truncateText(item.content, 20)}</p>
                                    <div className="text-sm text-gray-500 mt-1 min-w-[350px]">
                                        <span className="mr-4">작성자: {item.writer}</span>
                                        <span className="mr-4">등록일: {item.regDate}</span>
                                        <span>조회수: {item.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-1 mb-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="flex justify-end">
                    </div>
                </div>
            </div>


            {isModalOpen && <AddPostModalComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refresh={refreshList}
                setMessage={setMessage}
                setBasicModal={setBasicModal}
            />}

            {isDetailModalOpen && (
                <DetailPostModalComponent
                    boardNo={selectedPost}
                    onClose={() => setIsDetailModalOpen(false)}
                    refresh={refreshList}
                    setMessage={setMessage}
                    setBasicModal={setBasicModal}
                />
            )}

        </BasicLayout>
    </>
    );
};

export default BoardMain;
