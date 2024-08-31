import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ArticlePage from'./pages/ArticlePage'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard/:userId" element={<DashboardPage />} />
          <Route path="/article/:userId/:articleId" element={<ArticlePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
