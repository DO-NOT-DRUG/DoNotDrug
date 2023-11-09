import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '@/states/authState';
import { useNavigate } from 'react-router-dom';

// 로그인 요청 함수
export function requestLogin() {
  // Recoil 상태 설정
  const setAccessToken = useSetRecoilState(accessTokenState);
  const navigate = useNavigate();

  const Login = async (LoginData) => {
    try {
      const response = await axios.post('/api/member/login', LoginData);
      console.log(response)
      const { accessToken, refreshToken, Role } = response.data
      
      // AccessToken ->  Recoil 상태에 저장.
      setAccessToken(accessToken);
      sessionStorage.setItem('accessToken', accessToken);
  
      localStorage.setItem('refreshToken', refreshToken);
  
      alert('환영합니다 ' + response.data.message + '님!');
      
      // 성공시 페이지 이동
      if (Role === 'CRIMINAL') {
        navigate('/search');
      } else {
        navigate('/adminMain');
      }
      

  
    } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          alert('로그인 실패: ' + error.response.data.message);
        } else if (error.request) {
          alert('로그인 요청 실패: 서버에서 응답이 없습니다.');
        } else {
          alert('로그인 요청 중 오류 발생: ' + error.message);
        }
      }

  };

  return Login;
}
