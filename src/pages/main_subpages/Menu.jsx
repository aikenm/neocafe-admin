import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import '../../styles/pages/subpages/menu.css';

const Menu = () => {
    const handleMenuSearch = (searchTerm) => {
        
    };

  return (
    <div className="menu-container">
      <ContentHeader title="Меню" onSearch={handleMenuSearch} />
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
      </div>
    </div>
  );
};

export default Menu;