import React from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  padding: 20px;
  border: 1px solid black;
  border-radius: 15px;
  margin: 10px 0px;
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 15px;
`;

const UserId = styled.div`
  font-weight: 300;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export default function Tweet({ userName, tweet, userId, url }) {
  return (
    <Wrapper onClick={() => window.open(url)}>
      <UserName>{userName}</UserName>
      <UserId>{'@' + userId}</UserId>
      <Payload>{tweet}</Payload>
    </Wrapper>
  );
}
