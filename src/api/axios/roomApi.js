import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api/room`

export const getRoom = async (roomNo) => {
    // const token = localStorage.getItem("access")
    const response = await axios.get(`${prefix}/${roomNo}`
        // , {headers:{"access" : token }}
    );
    return response.data;
};

export const getParticipantList = async (roomNo) => {
    // const token = localStorage.getItem("access")
    const response = await axios.get(`${prefix}/${roomNo}/participant`
        // , {headers:{"access" : token }}
    );
    return response.data;
};

export const join = async (roomNo) => {
    // const token = localStorage.getItem("access")
    const response = await axios.post(`${prefix}/join/${roomNo}`,{},
        // , {headers:{"access" : token }}
    );
    return response.data;
};
export const exit = async (roomNo) => {
    // const token = localStorage.getItem("access")
    const response = await axios.delete(`${prefix}/join/${roomNo}`,
        // , {headers:{"access" : token }}
    );
    return response.data;
};

export const getRoomList = async (pageParam) => {
    const { page, size, category, searchType, searchTerm, orderBy } = pageParam;
    const response = await axios.get(`${prefix}/list`, { params: { page: page, size: size, category: category, searchType: searchType, searchTerm: searchTerm, orderBy: orderBy } })
    return response.data;
};

export const createRoom = async (data) => {
    // const token = localStorage.getItem("access")
    const response = await axios.post(`${prefix}`, data
        // , {headers:{"access" : token }}
    )
    return response.data;
};

export const destoryRoom = async (roomNo) => {
    // const token = localStorage.getItem("access")
    const response = await axios.delete(`${prefix}/${roomNo}`
        // , {headers:{"access" : token }}
    )
    return response.data;
};

export const checkPassword = async (data) => {
    // const token = localStorage.getItem("access")
    const response = await axios.post(`${prefix}/checkPw`, data
        // , {headers:{"access" : token }}
    )
    return response.data;
};