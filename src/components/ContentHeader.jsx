import React, { useState } from 'react';
import '../styles/components/content_header.css'

const ContentHeader = ({ title, onCreate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="content-header">
      <h1 className='content-header-title'>{title}</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='search-bar'
        />
        <button onClick={onCreate} className='create-button'>Создать</button>
      </div>
    </div>
  );
};

export default ContentHeader;
