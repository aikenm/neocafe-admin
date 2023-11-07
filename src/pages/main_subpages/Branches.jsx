import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import '../../styles/pages/subpages/branches.css';

const Branches = () => {
    const handleBranchesSearch = (searchTerm) => {
       
    };
      
  return (
    <div className="branches-container">
      <ContentHeader title="Филиалы" onSearch={handleBranchesSearch} />
      <div className="branches-content">
        <div className='branches-content-header'>
                <span className='branches-content-header-subtitle'>
                    №
                </span>
                <span className='branches-content-header-subtitle'>
                    Название кофейни
                </span>
                <span className='branches-content-header-subtitle'>
                    Адрес
                </span>
                <span className='branches-content-header-subtitle'>
                    Время работы
                </span>
                <span className='branches-content-header-subtitle'>
                    Ред.
                </span>
            </div>
      </div>
    </div>
  );
};

export default Branches;