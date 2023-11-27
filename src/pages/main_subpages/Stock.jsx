import React, { useState, useEffect } from 'react';
import ContentHeader from '../../components/ContentHeader';
import StockItem from '../../components/stock/StockItem';
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
    switch (selectedSubpage) {
      case 'finishedGoods':
        return item.category === 'finishedGoods';
      case 'rawMaterials':
        return item.category === 'rawMaterials';
      case 'expiringProducts':
        return item.amount <= item.minLimit; 
      default:
        return true;
    }
  });
  

  const handleEditItem = (item) => {
    setEditableItem(item);
    setModalOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    // Dispatch an action to delete the item
    // Update local storage or handle it as per your application logic
  };

  // Render content based on selected subpage
  const renderSubpageContent = () => {
    return filteredItems.map((item, index) => (
      <StockItem 
        key={item.id} 
        item={item}
        index={index}
        onEdit={() => handleEditItem(item)}
        onDelete={() => handleDeleteItem(item.id)}
      />
    ));
  };

  return (
    <div className="stock-container">
      <ContentHeader 
        title="Склад"
        onCreate={() => setModalOpen(true)} 
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

