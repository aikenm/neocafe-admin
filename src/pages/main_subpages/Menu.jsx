import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
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
            <span className='menu-content-header-subtitle'>
                №
            </span>
            <span className='menu-content-header-subtitle'>
                Наименование
            </span>
            <span className='menu-content-header-subtitle'>
                Категория
            </span>
            <span className='menu-content-header-subtitle'>
                Состав блюда и граммовка
            </span>
            <span className='menu-content-header-subtitle'>
                Стоимость
            </span>
            <span className='menu-content-header-subtitle'>
                Филиал
            </span>
        </div>
        {menuItems.map((item, index) => (
                    <div key={index} className="menu-item">
                        <span className='menu-item-detail'>№{index + 1}</span>
                        <span className='menu-item-detail'>{item.name}</span>
                        <span className='menu-item-detail'>{item.category}</span>
                        <span className='menu-item-detail'>{item.price}</span>
                        <span className='menu-item-detail'>
                            {item.ingredients.map((ing, i) => (
                                <div key={i}>{`${ing.name} ${ing.amount}${ing.unit}`}</div>
                            ))}
                        </span>
                        <span className='menu-item-detail'>Главный филиал</span>
                    </div>
                ))}
      </div>
    </div>
  );
};

export default Menu;