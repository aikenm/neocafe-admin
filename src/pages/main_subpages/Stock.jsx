import React from 'react';
import ContentHeader from '../../components/ContentHeader';

const Stock = () => {
    const handleStockSearch = (searchTerm) => {
        
    };

  return (
    <div className="stock-container">
      <ContentHeader title="Склад" onSearch={handleStockSearch} />
      <div className="stock-content">
      </div>
    </div>
  );
};

export default Stock;