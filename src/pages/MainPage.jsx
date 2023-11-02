import React, { useState } from 'react';
import Menu from './main_subpages/Menu';
import Stock from './main_subpages/Stock';
import Branches from './main_subpages/Branches';
import Employees from './main_subpages/Employees';
import '../styles/pages/main_page.css';
import logo from '../images/logo.svg'

const MainPage = () => {
    const [activeComponent, setActiveComponent] = useState('menu'); 

    const handleSetActiveComponent = (newComponent) => {
        setActiveComponent(newComponent);
    };

    const handleLogOut = () => {

    }

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
                    <button onClick={() => handleSetActiveComponent('menu')} className='side-bar-button'>Меню</button>
                    <button onClick={() => handleSetActiveComponent('stock')} className='side-bar-button'>Склад</button>
                    <button onClick={() => handleSetActiveComponent('branches')} className='side-bar-button'>Филиалы</button>
                    <button onClick={() => handleSetActiveComponent('employees')} className='side-bar-button'>Сотрудники</button>
                    <button onClick={() => handleLogOut()} className='side-bar-button log-out-button'>Выход</button>
                </div>
            </div>
            <div className="content">
                { renderContent() }
            </div>
        </div>
    );
}

export default MainPage;
