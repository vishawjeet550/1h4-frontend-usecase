import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LazyLoad from './pages/LazyLoad';

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lazy" element={<LazyLoad />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
