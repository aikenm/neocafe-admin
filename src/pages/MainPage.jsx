import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Menu from './main_subpages/Menu';
import Stock from './main_subpages/Stock';
import Branches from './main_subpages/Branches';
import Employees from './main_subpages/Employees';
import DeleteModal from '../components/DeleteModal';
import '../styles/pages/main_page.css';
import logo from '../images/logo.svg';
import notificationsIcon from '../images/notifications.svg';

const MainPage = () => {
    const [activeComponent, setActiveComponent] = useState('menu');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate(); 

    const handleSetActiveComponent = (newComponent) => {
        setActiveComponent(newComponent);
    };

    const handleLogOut = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        navigate('/'); 
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'menu':
                return <Menu />;
            case 'stock':
                return <Stock />;
            case 'branches':
                return <Branches />;
            case 'employees':
                return <Employees />;
            default:
                return <Menu />;
        }
    };

    return (
        <div className='main-page'>
            <div className="side-bar">  
                <img src={logo} alt='logo' className='logo'/>
                <div className='side-bar-buttons-wrapper'>
                    <button 
                        onClick={() => handleSetActiveComponent('menu')} 
                        className={`side-bar-button ${activeComponent === 'menu' ? 'active-button' : ''}`}>
                            Меню
                    </button>
                    <button 
                        onClick={() => handleSetActiveComponent('stock')} 
                        className={`side-bar-button ${activeComponent === 'stock' ? 'active-button' : ''}`}>
                            Склад
                    </button>
                    <button 
                        onClick={() => handleSetActiveComponent('branches')} 
                        className={`side-bar-button ${activeComponent === 'branches' ? 'active-button' : ''}`}>
                            Филиалы
                    </button>
                    <button 
                        onClick={() => handleSetActiveComponent('employees')} 
                        className={`side-bar-button ${activeComponent === 'employees' ? 'active-button' : ''}`}>
                            Сотрудники
                    </button>
                    <button onClick={handleLogOut} className='side-bar-button log-out-button'>Выход</button>
                </div>
            </div>
            <div className="content">
                <button className='notifications-button'><img src={notificationsIcon} alt='notifications' /></button>
                { renderContent() }
            </div>
            <DeleteModal
                isOpen={showLogoutModal}
                message="Вы уверены что хотите выйти?"
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />
        </div>
    );
}

export default MainPage;
