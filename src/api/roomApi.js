import privateApi, { publicApi } from "./axios_intercepter";

const prefix = `/api/room`

export const getRoom = async (roomNo) => {
    const response = await privateApi.get(`${prefix}/${roomNo}`);
    return response.data;
};

export const getParticipantList = async (roomNo) => {
    const response = await privateApi.get(`${prefix}/${roomNo}/participant`);
    return response.data;
};

export const join = async (roomNo) => {
    const response = await privateApi.post(`${prefix}/join/${roomNo}`);
    return response.data;
};
export const exit = async (roomNo) => {
    const response = await privateApi.delete(`${prefix}/exit/${roomNo}`);
    return response.data;
};

export const getRoomList = async (pageParam) => {
    const { page, size, category, searchType, searchTerm, orderBy } = pageParam;
    const response = await publicApi.get(`${prefix}/list`, { params: { page: page, size: size, category: category, searchType: searchType, searchTerm: searchTerm, orderBy: orderBy } })
    return response.data;
};

export const createRoom = async (data) => {
    const response = await privateApi.post(`${prefix}`, data )
    return response.data;
};

export const destoryRoom = async (roomNo) => {
    const response = await privateApi.delete(`${prefix}/${roomNo}`)
    return response.data;
};

export const checkPassword = async (data) => {
    const response = await privateApi.post(`${prefix}/checkPw`, data)
    return response.data;
};