import { Container } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  width: 100%;
`;

const Input = styled.input`
  border: 2px solid black;
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  width: 100%;
  height: 30px;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
`;

const SubmitBtn = styled.input`
  padding: 10px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  height: 100%;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
      background-color: #5538ee;
      color: white;
    }
  }
`;

export default function Search() {
  const navigate = useNavigate();
  const [word, setWord] = useState('');

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/posts', { state: { keyword: word } });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          required
          onChange={onChange}
          placeholder="검색어를 입력해주세요"
        />
        <SubmitBtn type="submit" value="Enter" />
      </Form>
    </Container>
  );
}
