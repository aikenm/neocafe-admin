import React from 'react';
import searchIcon from '../images/search-icon.svg';
import '../styles/components/content_header.css'

const ContentHeader = ({ title, onCreate, searchTerm, onSearch, stocks, selectedStock, onSelectStock }) => {
  return (
    <div className="content-header">
      <div className='header-wrapper'>
        <h1 className='content-header-title'>{title}</h1>
          {stocks && onSelectStock && (
            <select value={selectedStock} onChange={(e) => onSelectStock(e.target.value)} className='stock-select'>
              {stocks.map(stock => (
                <option key={stock.id} value={stock.id}>{stock.name}</option>
              ))}
            </select>
          )}
      </div>
      <div className="search-container">
          <img src={searchIcon} alt="Search" className='search-icon'/>
          <input
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className='search-bar'
          />
          <button onClick={onCreate} className='create-button'>Создать</button>
        </div>
      </div>
  );
};

export default ContentHeader;

