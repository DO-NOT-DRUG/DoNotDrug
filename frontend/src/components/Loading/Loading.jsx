import React from 'react';
import { RotateLoader } from 'react-spinners';
<<<<<<< HEAD
import styled from 'styled-components';

const StyledLoader = styled(RotateLoader)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
=======
>>>>>>> 4d3a21a1058707f602d81fe0a69d6c8a7187387e

export default function Loading() {
  return (
    <div>
      <h3>Loading...</h3>
<<<<<<< HEAD
      <StyledLoader color="#6B4EFF" />
=======
      <RotateLoader color="#36d7b7" />
>>>>>>> 4d3a21a1058707f602d81fe0a69d6c8a7187387e
    </div>
  );
}
