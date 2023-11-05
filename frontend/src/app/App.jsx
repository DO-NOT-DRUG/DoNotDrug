import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BaseLayout } from '../../src/components/Layout/Layout';
import LandingPage from '../../src/pages/LandingPage/LandingPage';
import Join from '../../src/pages/Join/Join';
import Login from '../../src/pages/Login/Login';

function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join" element={<Join />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BaseLayout>
    </Router>
  )
}

export default App
