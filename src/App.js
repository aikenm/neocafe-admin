import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Menu from './pages/main_subpages/Menu';
import Stock from './pages/main_subpages/Stock';
import Branches from './pages/main_subpages/Branches';
import Employees from './pages/main_subpages/Employees';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
