import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  }

  // 회원가입 폼 제출 요청 
  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if(password !== rePassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const joinData = {
      email,
      name,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/join', joinData);
      alert('회원가입 성공: ' + response.data.message);
      /* 로그인 페이지 이동 로직 */
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으나 서버가 2xx 범위가 아닌 상태 코드로 응답
        alert('회원가입 실패: ' + error.response.data.message);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못함
        alert('회원가입 요청 실패: 서버에서 응답이 없습니다.');
      } else {
        // 요청을 설정하는 중에 문제가 발생함
        alert('회원가입 요청 중 오류 발생: ' + error.message);
      }
    }
  }


  return (
    <Container as="section" align="center" width="widthMedium">
      <Form onSubmit={handleSubmitForm}>
        <Ul>
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
        </Ul>
        <Button type="submit">회원가입하기</Button>
      </Form>
    </Container>
  )
}

export default Join;