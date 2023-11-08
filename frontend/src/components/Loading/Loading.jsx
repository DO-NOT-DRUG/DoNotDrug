import React from 'react';
import { RotateLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div>
      <h3>Loading...</h3>
      <RotateLoader color="#36d7b7" />
    </div>
  );
}
