import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@/@state/authState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Input, Form } from '../../components';
const Li = styled.li`
  display: flex;
  height: 60px;
  padding: 20px 0;
  line-height: 60px;
`;

const Label = styled.label`
  width: 120px;
  background-color: grey;
  text-align: center;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Recoil 상태 설정
  const setLogin = useSetRecoilState(loginState);

  // 로그인 요청 
  const handleLoginRequest = async (event) => {
    event.preventDefault();

    const LoginData = {
      email,
      loginPassword: password,
    };
    
    console.log(LoginData);

    try {
      const response = await axios.post('/api/login', LoginData);
      alert('환영합니다 ' + response.data.message + '님!');
      // 로그인 상태 업데이트
      setLogin(response.data.user);
      // 페이지 이동
      useNavigate('/');


    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
        alert('로그인 실패: ' + error.response.data.message);
      } else if (error.request) {
        // 요청 실패
        alert('로그인 요청 실패: 서버에서 응답이 없습니다.');
      } else {
        // 요청 설정 중, 문제발생
        alert('로그인 요청 중 오류 발생: ' + error.message);
      }
    }
  }


  return (
    <Container as="section" align="center" width="widthMedium">
      <Form onSubmit={handleLoginRequest}>
        <ul>
          <Li>
            <Label htmlFor="email">이메일</Label>
            <Input 
              type="email"
              id="email"
              name="email"
              placeholder='이메일을 입력해주세요' 
              required
              onChange={handleEmailChange}
            />
          </Li>
          <Li>
            <Label htmlFor="loginPassword">비밀번호</Label>
            <Input 
              type="password"
              id="loginPassword"
              name="loginPassword"
              placeholder='비밀번호를 입력해주세요'
              required
              onChange={handlePasswordChange}
            />
          </Li>
        </ul>
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  )
}

export default Login;