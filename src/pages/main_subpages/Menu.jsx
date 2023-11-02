import React from 'react';
import ContentHeader from '../../components/ContentHeader';

const Menu = () => {
    const handleMenuSearch = (searchTerm) => {
        
    };

  return (
    <div className="menu-container">
      <ContentHeader title="Меню" onSearch={handleMenuSearch} />
      <div className="menu-content">
      </div>
    </div>
  );
};

export default Menu;