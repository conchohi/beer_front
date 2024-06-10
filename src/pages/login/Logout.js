import React from 'react';

const Logout = () => {
    const logoutFunction =  async () => {
        try {
          // 서버에 로그아웃 요청을 보냅니다.
          const response = await axios.post('http://localhost:8080/logout', {}, {
            withCredentials: true // 쿠키를 포함하여 요청
          });
      
          if (response.status === 200) {
            // 로그아웃 성공 시, 로컬 스토리지에서 토큰 제거
            localStorage.removeItem('access');
            
            // 홈으로 이동
            window.location.href = '/';
          } else {
            localStorage.removeItem('access');
            
            // 홈으로 이동
            window.location.href = '/';
          }
        } catch (error) {
          console.error('로그아웃 오류', error);
          localStorage.removeItem('access');
            
            // 홈으로 이동
            window.location.href = '/';

        }
      };


    return (
        <div>
            
        </div>
    );
};

export default Logout;