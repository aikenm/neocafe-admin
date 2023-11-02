import React from 'react';
import ContentHeader from '../../components/ContentHeader';

const Branches = () => {
    const handleBranchesSearch = (searchTerm) => {
       
    };
      
  return (
    <div className="branches-container">
      <ContentHeader title="Филиалы" onSearch={handleBranchesSearch} />
      <div className="branches-content">
        
      </div>
    </div>
  );
};

export default Branches;