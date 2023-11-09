import { Container } from '@/components';
import axios from 'axios';
import { useState } from 'react';
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
      background-color: #6b4eff;
      color: white;
    }
  }
`;

export default function RegisterCriminal() {
  const [criminalId, setCriminalId] = useState('');
  const probationId = 'admin1';

  const onChange = (e) => {
    setCriminalId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('accessToken');
    axios
      .post(
        `/api/v1/probation/register/criminal/${probationId}`,
        {
          criminalId: criminalId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        alert(id + '가 관리 목록에 추가되었습니다.');
      })
      .catch((error) => {
        // console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        alert('등록에 실패했습니다.');
      })
      .finally(() => {
        setId('');
      });
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          required
          onChange={onChange}
          placeholder="아이디를 입력해주세요"
        />
        <SubmitBtn type="submit" value="추가" />
      </Form>
    </Container>
  );
}
