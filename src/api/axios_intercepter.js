import axios from "axios";

// export const API_SERVER_HOST = 'https://js1.jsflux.co.kr';
export const API_SERVER_HOST = "http://localhost:8080"

export const publicApi = axios.create({
    baseURL: `${API_SERVER_HOST}`
});

const privateApi = axios.create({
    baseURL: `${API_SERVER_HOST}`,
    headers: {
        access: localStorage.getItem("access")
    },
});

// 리프레시 토큰 API
export async function postRefreshToken() {
    const response = await publicApi.post('/api/reissue', {}, {
        withCredentials: true // 쿠키를 포함하여 요청
    });
    return response;
}

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    config.headers.access = token;
    return config;
});

// 토큰을 함께 보내는 privateApi에 인터셉터를 적용합니다
privateApi.interceptors.response.use(
    // 200번대 응답이 올 때 처리
    (response) => {
        return response;
    },
    // 200번대 응답이 아닐 경우 처리
    async (error) => {
        // 토큰이 만료됐을 때
        if (error.response.status === 401) {
            if (error.response.data === 'access token expired') {
                const originRequest = error.config;
                // 리프레시 토큰 API 호출
                const response = await postRefreshToken();
                // 리프레시 토큰 요청이 성공할 때
                if (response.status === 200) {
                    const accessToken = response.headers['access'];
                    localStorage.setItem('access', accessToken);
                    axios.defaults.headers.common.access = `${accessToken}`;
                    // 진행 중이던 요청 이어서 하기
                    originRequest.headers.access = `${accessToken}`;
                    const retryResponse = await axios.request(originRequest);
                    return retryResponse;
                } else {
                    console.log(error);
                    return Promise.reject(error);
                }
            }
        }
        console.log(error);
        return Promise.reject(error);
    },
);


export default privateApi;
