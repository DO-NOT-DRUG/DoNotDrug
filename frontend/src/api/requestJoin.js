import axios from 'axios';

import { useNavigate } from 'react-router-dom';

export function requestJoin (joinData) {
  const navigate = useNavigate();

  const Join = async (joinData) => {
    try {
      const response = await axios.post('/api/member/join', joinData);
      alert('회원가입 성공: ' + response.data.message);
      navigate('/login');
      
    } catch (error) {
        console.log(error)
        if (error.response) {
          alert('회원가입 실패: ' + error.response.data.message);
        } else if (error.request) {
          alert('회원가입 요청 실패: 서버에서 응답이 없습니다.');
        } else {
          alert('회원가입 요청 중 오류 발생: ' + error.message);
        }
      }
  }

  return Join;
}
