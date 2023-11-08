import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, Container, Input, Form, Title, ButtonWrapper } from '../../components';
import { requestLogin } from '@/api/requestLogin';

const InputWrapper = styled.div`
  padding: 10px 0
`;

const Li = styled.li`
  height: 80px;
  padding: 20px 0;
`;

const Label = styled.label`
  display: block;
  padding: 4px;
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
      <Title as="h2" titleStyle="XXL" align="center">Log in to DND</Title>
      <Form onSubmit={handleLoginRequest}>
        <ul>
          <Li>
            <Label htmlFor="email">이메일</Label>
            <InputWrapper>
              <Input 
                type="email"
                id="email"
                name="email"
                placeholder='이메일을 입력해주세요' 
                required
                onChange={handleEmailChange}
              />
            </InputWrapper>
          </Li>
          <Li>
            <Label htmlFor="loginPassword">비밀번호</Label>
            <InputWrapper>
              <Input 
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder='비밀번호를 입력해주세요'
                required
                onChange={handlePasswordChange}
              />
            </InputWrapper>
          </Li>
        </ul>
        <ButtonWrapper>
          <Button type="submit">로그인</Button>
          <Link to='/join'>Already have an account?</Link>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default Login;