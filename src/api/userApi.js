import privateApi, { publicApi, API_SERVER_HOST } from "./axios_intercepter";

const prefix = '/api/user';

export const getUserByNickname = async (nickname) => {
    const response = await publicApi.get(`${prefix}/info/${nickname}`);
    return response.data;
};

export const followUser = async (followId) => {
    console.log(followId)
    try {
      const response = await privateApi.post(
        `/api/follow/follow`,
        { followId:followId }
      );
      return response.data;
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  };