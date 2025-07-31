import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/landing/Landing';
import { Login } from './pages/login/Login';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
