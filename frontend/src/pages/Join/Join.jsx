import React from 'react';
import styled from 'styled-components';

import { Button, Container, Input } from '../../components';

const Form = styled.form`
  width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
  background-color: lightpink;
`;
const Ul = styled.ul`
  background-color: lightgreen;
`
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

const RadioContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

function Join() {
  return (
    <Container as="section" align="center" width="widthMedium">
      <Form>
        <Ul>
          <Li>
            <Label htmlFor="name">이름</Label>
            <Input 
              type="text" 
              id="name" 
              name="name"
              placeholder='이름을 입력해주세요' 
              required 
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
            />
            <Button isSecondary >중복확인</Button>
          </Li>
          <Li>
            <Label htmlFor="loginPassword">비밀번호</Label>
            <Input 
              type="password"
              id="loginPassword"
              name="loginPassword"
              placeholder='비밀번호를 입력해주세요'
              required
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
            />
          </Li>
        </Ul>
        <Button>회원가입하기</Button>
      </Form>
    </Container>
  )
}

export default Join;