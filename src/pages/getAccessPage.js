import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

const GetAccessPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const getAccessToken = async () => {



          
          try {
            // refresh 토큰을 사용하여 access 토큰을 요청
            const response = await axios.post('http://localhost:8080/reissue', {}, {
              withCredentials: true // 쿠키를 포함하여 요청
            });
            
            // 서버에서 받은 access 토큰을 로컬 스토리지에 저장
            const accessToken = response.headers['access']; 
            localStorage.setItem('access', accessToken);
    
            navigate("/");
          } catch (error) {
            console.error('서버오류', error);
            alert('서버오류');
            navigate('/login');
          }
        };
    
        getAccessToken(); // 비동기 함수 호출
      }, [navigate]);
    return ( <Loading/> );
}
 
export default GetAccessPage;