import privateApi from "./axios_intercepter";

const prefix = "/api/report"
export const reportUser = async (data) => {
    const response = await privateApi.post(`${prefix}`, data);
    return response.data;
};