import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store/adminSlice';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Menu from './pages/main_subpages/Menu';
import Stock from './pages/main_subpages/Stock';
import Branches from './pages/main_subpages/Branches';
import Employees from './pages/main_subpages/Employees';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loginSuccess());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
        <Route path="/stock" element={<PrivateRoute><Stock /></PrivateRoute>} />
        <Route path="/branches" element={<PrivateRoute><Branches /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><Employees /></PrivateRoute>} /> */}
        <Route path="/main" element={<MainPage />}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
