import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./main_subpages/Menu";
import Stock from "./main_subpages/Stock";
import Branches from "./main_subpages/Branches";
import Employees from "./main_subpages/Employees";
import DeleteModal from "../components/DeleteModal";
import "../styles/pages/main_page.css";
import logo from "../images/logo.svg";
import menuIcon from "../images/menu-icon.svg";
import warehouseIcon from "../images/warehouse-icon.svg";
import employeesIcon from "../images/employees-icon.svg";
import branchesIcon from "../images/branches-icon.svg";
import signoutIcon from "../images/signout.svg";
import { useDispatch } from "react-redux";
import { logout } from "../store/adminSlice";
import { initializeBranches } from "../store/branchSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const savedActiveComponent = localStorage.getItem("activeComponent");
  const [activeComponent, setActiveComponent] = useState(
    savedActiveComponent || "menu"
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleSetActiveComponent = (newComponent) => {
    setActiveComponent(newComponent);
    localStorage.setItem("activeComponent", newComponent);
  };

  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    axios
      .get("https://neo-cafe.org.kg/api-admin/branches/", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(initializeBranches(response.data));
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  }, [dispatch]);

  const renderContent = () => {
    switch (activeComponent) {
      case "menu":
        return <Menu />;
      case "stock":
        return <Stock />;
      case "branches":
        return <Branches />;
      case "employees":
        return <Employees />;
      default:
        return <Menu />;
    }
  };

  return (
    <div className="main-page">
      <div className="side-bar">
        <img src={logo} alt="logo" className="logo" />
        <div className="side-bar-buttons-wrapper">
          <button
            onClick={() => handleSetActiveComponent("menu")}
            className={`side-bar-button ${
              activeComponent === "menu" ? "active-button" : ""
            }`}
          >
            <img src={menuIcon} alt="icon" className="sidebar-button-icon" />
            Меню
          </button>
          <button
            onClick={() => handleSetActiveComponent("stock")}
            className={`side-bar-button ${
              activeComponent === "stock" ? "active-button" : ""
            }`}
          >
            <img
              src={warehouseIcon}
              alt="icon"
              className="sidebar-button-icon"
            />
            Склад
          </button>
          <button
            onClick={() => handleSetActiveComponent("branches")}
            className={`side-bar-button ${
              activeComponent === "branches" ? "active-button" : ""
            }`}
          >
            <img
              src={branchesIcon}
              alt="icon"
              className="sidebar-button-icon"
            />
            Филиалы
          </button>
          <button
            onClick={() => handleSetActiveComponent("employees")}
            className={`side-bar-button ${
              activeComponent === "employees" ? "active-button" : ""
            }`}
          >
            <img
              src={employeesIcon}
              alt="icon"
              className="sidebar-button-icon"
            />
            Сотрудники
          </button>
          <button
            onClick={handleLogOut}
            className="side-bar-button log-out-button"
          >
            <img src={signoutIcon} alt="sign-out" className="signout-icon" />
            Выход
          </button>
        </div>
      </div>
      <div className="content">{renderContent()}</div>
      <DeleteModal
        isOpen={showLogoutModal}
        title="Выход"
        message="Вы уверены что хотите выйти?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default MainPage;
