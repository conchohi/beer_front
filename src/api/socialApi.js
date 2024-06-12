import { API_SERVER_HOST } from "./axios_intercepter";


export const onNaverLogin = () => {
    window.location.href = `${API_SERVER_HOST}/oauth2/authorization/naver`;
}

export const onKakaoLogin = () => {
    window.location.href = `${API_SERVER_HOST}/oauth2/authorization/kakao`;
}
