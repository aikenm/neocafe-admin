import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import StockItemModal from '../../components/stock/StockItemModal';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/pages/subpages/stock/stock.css';

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState('stock1');
  const [selectedSubpage, setSelectedSubpage] = useState('finishedGoods');
  const [modalOpen, setModalOpen] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const stockItems = useSelector((state) => state.stock.items);
  const dispatch = useDispatch();

  // Sample stocks data
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

  const filteredItems = stockItems.filter(item => {
    if (selectedSubpage === 'finishedGoods') {
      return item.category === 'готовая продукция';
    } else if (selectedSubpage === 'rawMaterials') {
      return item.category === 'сырье';
    }
    // Add more conditions as needed
    return true;
  });

  const handleEditItem = (item) => {
    setEditableItem(item);
    setModalOpen(true);
  };

  // Render content based on selected subpage
  const renderSubpageContent = () => {
    // Map through filtered items and display them
    return filteredItems.map((item, index) => (
      <div key={index}>
        {item.name}
        {/* Add more item details */}
        <button onClick={() => handleEditItem(item)}>Edit</button>
      </div>
    ));
  };

  return (
    <div className="stock-container">
      <ContentHeader 
        title="Склад"
        onCreate={() => setModalOpen(true)} // Open modal for creating a new item
        onSearch={handleStockSearch}
        stocks={stocks}
        selectedStock={selectedStock}
        onSelectStock={handleSelectStock}
      />
      <div className="stock-subpages-header">
        <button onClick={() => setSelectedSubpage('finishedGoods')} className='stock-subpage-button'>Готовая продукция</button>
        <button onClick={() => setSelectedSubpage('rawMaterials')} className='stock-subpage-button'>Сырье</button>
        <button onClick={() => setSelectedSubpage('expiringProducts')} className='stock-subpage-button expiringProducts'>Заканчивающиеся продукты</button>
      </div>
      <div className="stock-content">
        <div className='stock-content-header'>
            <span className='stock-content-header-subtitle stock-id'>
                №
            </span>
            <span className='stock-content-header-subtitle stock-name'>
                Наименование
            </span>
            <span className='stock-content-header-subtitle stock-amount'>
                Количество
            </span>
            <span className='stock-content-header-subtitle stock-limit'>
                Лимит
            </span>
            <span className='stock-content-header-subtitle stock-date'>
                Дата прихода
            </span>
            <span className='stock-content-header-subtitle stock-edit'>
                Ред.
            </span>
        </div>
        {renderSubpageContent()}
      </div>
      {modalOpen && (
        <StockItemModal
          isOpen={modalOpen}
          toggleModal={() => setModalOpen(false)}
          editable={editableItem}
        />
      )}
    </div>
  );
};

export default Stock;

