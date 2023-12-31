import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button, Container, Input, Form, Title, ButtonWrapper, RoleInput } from '../../components';
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

const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const login = requestLogin();

  const loginData = {
    email,
    loginPassword: password,
    role
  };

  const handleLoginRequest = async (event) => {
    event.preventDefault();
    login(loginData);
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
          <Li>
            <RadioWrapper>
              <Label htmlFor='role'>
                일반사용자
              </Label>
              <RoleInput 
                type="radio"
                name="role"
                value="CRIMINAL"
                checked={role==='CRIMINAL'}
                onChange={handleRoleChange}
              />
            </RadioWrapper>
          </Li>
          <Li>
            <RadioWrapper>
              <Label htmlFor='role'>
                관리자
              </Label>
              <RoleInput 
                type="radio"
                name="role"
                value="GENERAL"
                checked={role==='GENERAL'}
                onChange={handleRoleChange}
              />
            </RadioWrapper>
          </Li>
        </ul>
        <ButtonWrapper>
          <Button type="submit">로그인</Button>
          <Link to='/join'>No account?</Link>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default Login;