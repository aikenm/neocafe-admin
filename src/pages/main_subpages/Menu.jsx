import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import MenuItem from '../../components/menu/MenuItem';
import MenuItemModal from '../../modal_windows/MenuItemModal';
import '../../styles/pages/subpages/menu/menu.css';

const Menu = () => {
    const menuItems = useSelector((state) => state.menu.items);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);
    const handleMenuSearch = (searchTerm) => {
        
    };

  return (
    <div className="menu-container">
      <ContentHeader title="Меню" onCreate={toggleModal} onSearch={handleMenuSearch} />
      <MenuItemModal isOpen={modalOpen} toggleModal={toggleModal} />
      <div className="menu-content">
        <div className='menu-content-header'>
            <span className='menu-content-header-subtitle id'>
                №
            </span>
            <span className='menu-content-header-subtitle name'>
                Наименование
            </span>
            <span className='menu-content-header-subtitle category'>
                Категория
            </span>
            <span className='menu-content-header-subtitle ingredients'>
                Состав блюда и граммовка
            </span>
            <span className='menu-content-header-subtitle price'>
                Стоимость
            </span>
            <span className='menu-content-header-subtitle branch'>
                Филиал
            </span>
        </div>
        {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Menu;