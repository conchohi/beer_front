import axios from "axios";
import privateApi, { publicApi } from "./axios_intercepter";

const prefix = `/api/board`
const commetnPrefix = `/api/comment`

// 게시글 전체리스트
export const getAllBoards = async () => {
    const response = await publicApi.get(prefix);
    return response.data;
};

// 특정아이디의 게시글 조회
export const getBoardById = async (id) => {
    const response = await publicApi.get(`${prefix}/${id}`);
    return response.data;
};

// 새로운 게시글 등록
export const registerBoard = async (data) => {
    const response = await axios.post(prefix, data);
    return response.data;
};

// 게시글 수정
export const updateBoard = async (id, data) => {
    const response = await privateApi.put(`${prefix}/${id}`, data);
    return response.data;
};

// 게시글 삭제
export const deleteBoard = async (id) => {
    const response = await privateApi.delete(`${prefix}/${id}`);
    return response.data;
};

// 특정 게시글에 댓글 추가
export const addComment = async (data) => {
    const response = await privateApi.post(`${commetnPrefix}`, data);
    return response.data;
};

// 특정 게시글에 댓글 삭제
export const deleteComment = async (commentNo) => {
    const response = await privateApi.delete(`${commetnPrefix}/${commentNo}`);
    return response.data;
};
