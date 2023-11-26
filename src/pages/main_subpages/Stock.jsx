// Stock.jsx
import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState('stock1');
  const [items, setItems] = useState([]); // This will store items for the selected stock

  // Sample data for stocks
  const stocks = [
    { id: 'stock1', name: 'Stock 1' },
    { id: 'stock2', name: 'Stock 2' },
    { id: 'stock3', name: 'Stock 3' },
    // Add more stocks as needed
  ];

  const handleStockSearch = (searchTerm) => {
    // Implement search logic
  };

  const handleSelectStock = (stockId) => {
    setSelectedStock(stockId);
    // Fetch items for the selected stock and update `items`
  };

  return (
    <div className="stock-container">
      <ContentHeader 
        title="Склад"
        onSearch={handleStockSearch}
        stocks={stocks}
        selectedStock={selectedStock}
        onSelectStock={handleSelectStock}
      />
      <div className="stock-content">
        {/* Render items for the selected stock */}
      </div>
    </div>
  );
};

export default Stock;
