import React from 'react';
import { RotateLoader } from 'react-spinners';
import styled from 'styled-components';

const StyledLoader = styled(RotateLoader)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <div>
      <h3>Loading...</h3>
      <StyledLoader color="#6B4EFF" />
    </div>
  );
}
