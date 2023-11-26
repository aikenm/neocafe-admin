import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import '../../styles/pages/subpages/stock/stock.css';

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState('stock1');
  const [selectedSubpage, setSelectedSubpage] = useState('finishedGoods'); // 'finishedGoods', 'rawMaterials', 'expiringProducts'
//   const [items, setItems] = useState([]);

  const stocks = [
    { id: 'stock1', name: 'Stock 1' },
    { id: 'stock2', name: 'Stock 2' },
    { id: 'stock3', name: 'Stock 3' },
  ];

  const handleStockSearch = (searchTerm) => {
    // Implement search logic
  };

  const handleSelectStock = (stockId) => {
    setSelectedStock(stockId);
    // Fetch items for the selected stock and update `items`
  };

  const renderSubpageContent = () => {
    switch (selectedSubpage) {
      case 'finishedGoods':
        return <div>Готовая продукция</div>;
      case 'rawMaterials':
        return <div>Сырье</div>;
      case 'expiringProducts':
        return <div>Заканчивающиеся продукты</div>;
      default:
        return <div>Готовая продукция</div>;
    }
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
      <div className="stock-subpages-header">
        <button 
          onClick={() => setSelectedSubpage('finishedGoods')} 
          className={`stock-subpage-button ${selectedSubpage === 'finishedGoods' ? 'active-subpage-button' : ''}`}>
          Готовая продукция
        </button>
        <button 
          onClick={() => setSelectedSubpage('rawMaterials')} 
          className={`stock-subpage-button ${selectedSubpage === 'rawMaterials' ? 'active-subpage-button' : ''}`}>
          Сырье
        </button>
        <button 
          onClick={() => setSelectedSubpage('expiringProducts')} 
          className={`stock-subpage-button expiring-products ${selectedSubpage === 'expiringProducts' ? 'active-expiring-products' : ''}`}>
          Заканчивающиеся продукты
        </button>
      </div>
      <div className="stock-content">
        {renderSubpageContent()}
      </div>
    </div>
  );
};

export default Stock;
