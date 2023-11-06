import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BaseLayout } from '@/components/Layout/Layout';
import LandingPage from '@/pages/LandingPage/LandingPage';
import Join from '@/pages/Join/Join';
import Login from '@/pages/Login/Login';
import Search from '@/pages/Search/Search';

function App() {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join" element={<Join />}/>
          <Route path="/login" element={<Login />}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </BaseLayout>
    </Router>
  )
}

export default App
