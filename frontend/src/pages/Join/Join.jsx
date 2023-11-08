import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Container, Input, Form, Title, ButtonWrapper, RoleInput } from '../../components';
import { requestJoin } from '@/api/requestJoin';

const Li = styled.li`
  display: flex;
  height: 60px;
  padding: 20px 0;
  line-height: 60px;
`;
const Label = styled.label`
  width: 120px;

`;

const RadioWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;


function Join() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [role, setRole] = useState('GENERAL');
  
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRePasswordChange = (e) => setRePassword(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const Join = requestJoin();

  const joinData = {
    email,
    name,
    loginPassword: password,
    role
  };

  // 회원가입 폼 제출 요청 
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if(password !== rePassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    Join(joinData);
    
  }

  return (
    <Container as="section" align="center" width="widthMedium">
      <Title as="h2" titleStyle="XXL" align="center">Join DND</Title>
      <Form onSubmit={handleSubmitForm}>
        <ul>
          <Li>
            <Label htmlFor="name">이름</Label>
            <Input 
              type="text" 
              id="name" 
              name="name"
              placeholder='이름을 입력해주세요' 
              required 
              onChange={handleNameChange}
            />
          </Li>
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
            <Button isSecondary>이메일 인증</Button>
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
          <Li>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='비밀번호를 확인해주세요'
              required
              onChange={handleRePasswordChange}
            />
          </Li>
          <Li>
            <RadioWrapper>
              <Label htmlFor='role'>
                일반사용자
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
          <Li>
            <RadioWrapper>
              <Label htmlFor='role'>
                관리자
              </Label>
              <RoleInput 
                type="radio"
                name="role"
                value="ADMIN"
                checked={role==='ADMIN'}
                onChange={handleRoleChange}
              />
            </RadioWrapper>
          </Li>
        </ul>
        <ButtonWrapper>
          <Button type="submit">회원가입하기</Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

export default Join;