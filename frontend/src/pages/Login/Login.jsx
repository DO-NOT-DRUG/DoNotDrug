import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Container, Input, Form, Title } from '../../components';
import { requestLogin } from '@/api/requestLogin';

const Li = styled.li`
  display: flex;
  height: 60px;
  padding: 20px 0;
  line-height: 60px;
`;

const Label = styled.label`
  width: 120px;
  // background-color: grey;
  text-align: center;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const login = requestLogin();

  const LoginData = {
    email,
    loginPassword: password,
  };

  const handleLoginRequest = async (event) => {
    event.preventDefault();
    login(LoginData);
  };

  return (
    <Container as="section" align="center" width="widthMedium">
      <Title as="h2" titleStyle="XXL" align="center">로그인</Title>
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