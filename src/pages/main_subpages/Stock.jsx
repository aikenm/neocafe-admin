import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import StockItem from '../../components/stock/StockItem';
import StockItemModal from '../../components/stock/StockItemModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStockItem } from '../../store/stockSlice'; 
import '../../styles/pages/subpages/stock/stock.css';

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState('stock1');
  const [selectedSubpage, setSelectedSubpage] = useState('finishedGoods');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const stockItems = useSelector((state) => state.stock.items);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const itemsPerPage = 5;

  const stocksData = [
    { id: 'stock1', name: 'Дзержинка' },
    { id: 'stock2', name: 'Карпинка' },
    { id: 'stock3', name: 'Филармония' },
  ];

  const handleStockSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); 
  };

  const handleSelectStock = (stockId) => {
    setSelectedStock(stockId);
    // Fetch items for the selected stock and update `items`
  };

  const handleSubpageChange = (subpage) => {
    setSelectedSubpage(subpage);
    setCurrentPage(1); 
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().startsWith(searchTerm.toLowerCase());    const isCorrectStock = item.stockId === selectedStock; 
    let isCorrectCategory = true; 

    switch (selectedSubpage) {
      case 'finishedGoods':
        isCorrectCategory = item.category === 'finishedGoods';
        break;
      case 'rawMaterials':
        isCorrectCategory = item.category === 'rawMaterials';
        break;
      case 'expiringProducts':
        isCorrectCategory = item.amount <= item.minLimit;
        break;
      default:
        break;
    }

    return matchesSearchTerm && isCorrectStock && isCorrectCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleEditItem = (item) => {
    setEditableItem(item);
    setModalOpen(true);
  };

  const handleCreateNewItem = () => {
    setEditableItem(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditableItem(null);
    setModalOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    const item = stockItems.find((item) => item.id === itemId);
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteInitiated = (itemId) => {
    const item = stockItems.find((item) => item.id === itemId);
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteStockItem(itemToDelete.id)); 
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const renderSubpageContent = () => {
    return paginatedItems.map((item, index) => (
      <StockItem 
        key={item.id} 
        item={item}
        index={indexOfFirstItem + index}
        onEdit={() => handleEditItem(item)}
        onDelete={() => handleDeleteItem(item.id)}
      />
    ));
  };

  return (
    <div className="stock-container">
      <ContentHeader 
        title="Склад"
        onCreate={handleCreateNewItem}
        onSearch={handleStockSearch}
        stocks={stocksData}
        selectedStock={selectedStock}
        onSelectStock={handleSelectStock}
      />
      <div className="stock-subpages-header">
        <button 
          onClick={() => handleSubpageChange('finishedGoods')}
          className={`stock-subpage-button ${selectedSubpage === 'finishedGoods' ? 'active-subpage-button' : ''}`}>
            Готовая продукция
        </button>
        <button 
          onClick={() => handleSubpageChange('rawMaterials')}
          className={`stock-subpage-button ${selectedSubpage === 'rawMaterials' ? 'active-subpage-button' : ''}`}>
            Сырье
        </button>
        <button 
          onClick={() => handleSubpageChange('expiringProducts')}
          className={`stock-subpage-button expiring-products ${selectedSubpage === 'expiringProducts' ? 'active-expiring-products' : ''}`}>
            Заканчивающиеся продукты
        </button>
      </div>
      <div className="stock-content">
        <div className='stock-content-header'>
            <span className='stock-content-header-subtitle stock-id'>№</span>
            <span className='stock-content-header-subtitle stock-name'>Наименование</span>
            <span className='stock-content-header-subtitle stock-amount'>Количество</span>
            <span className='stock-content-header-subtitle stock-limit'>Лимит</span>
            <span className='stock-content-header-subtitle stock-date'>Дата прихода</span>
            <span className='stock-content-header-subtitle stock-edit'>Ред.</span>
        </div>
        {renderSubpageContent()}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
      {modalOpen && (
        <StockItemModal
          isOpen={modalOpen}
          toggleModal={handleCloseModal}
          editable={editableItem}
          selectedStock={selectedStock}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal 
          isOpen={isDeleteModalOpen}
          message="Вы действительно хотите удалить этот товар?" 
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Stock;