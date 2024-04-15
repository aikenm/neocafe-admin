import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Menu from "./pages/main_subpages/Menu";
import Stock from "./pages/main_subpages/Stock";
import Branches from "./pages/main_subpages/Branches";
import Employees from "./pages/main_subpages/Employees";
// import { initializeBranches } from "./store/branchSlice";
import { initialItems, initialCategories, initialBranches } from "./common";

const App = () => {
  useEffect(() => {
    // localStorage.clear();
    if (!localStorage.getItem("items")) {
      localStorage.setItem("items", JSON.stringify(initialItems));
    }
    if (!localStorage.getItem("categories")) {
      localStorage.setItem("categories", JSON.stringify(initialCategories));
    }
    if (!localStorage.getItem("branches")) {
      localStorage.setItem("branches", JSON.stringify(initialBranches));
    }
  }, []);

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
