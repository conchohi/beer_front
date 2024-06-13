import privateApi, { publicApi, API_SERVER_HOST } from "./axios_intercepter";

const prefix = '/api/user';

export const getUserByNickname = async (nickname) => {
    const response = await publicApi.get(`${prefix}/info/${nickname}`);
    return response.data;
};
