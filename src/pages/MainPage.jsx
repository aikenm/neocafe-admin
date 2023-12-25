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
import signoutIcon from "../images/signout.svg";
import notificationsIcon from "../images/notifications.svg";
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
            Меню
          </button>
          <button
            onClick={() => handleSetActiveComponent("stock")}
            className={`side-bar-button ${
              activeComponent === "stock" ? "active-button" : ""
            }`}
          >
            Склад
          </button>
          <button
            onClick={() => handleSetActiveComponent("branches")}
            className={`side-bar-button ${
              activeComponent === "branches" ? "active-button" : ""
            }`}
          >
            Филиалы
          </button>
          <button
            onClick={() => handleSetActiveComponent("employees")}
            className={`side-bar-button ${
              activeComponent === "employees" ? "active-button" : ""
            }`}
          >
            Сотрудники
          </button>
          <button
            onClick={handleLogOut}
            className="side-bar-button log-out-button"
          >
            Выход{" "}
            <img src={signoutIcon} alt="sign-out" className="signout-icon" />
          </button>
        </div>
      </div>
      <div className="content">
        <button className="notifications-button">
          <img src={notificationsIcon} alt="notifications" />
        </button>
        {renderContent()}
      </div>
      <DeleteModal
        isOpen={showLogoutModal}
        message="Вы уверены что хотите выйти?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default MainPage;
