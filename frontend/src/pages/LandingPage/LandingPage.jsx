import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container } from '../../components';


function LandingPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <Container 
      as="section" 
      align="center" 
      width="widthMedium"
      additionalStyles={`text-align: center;`}
    >
      <h1>Welcome to the Landing Page!</h1>
      <Button 
        isSecondary 
        onClick={handleStartClick}
        width="widthStart"
      >
        시작하기
      </Button>
    </Container>
  )
}

export default LandingPage;