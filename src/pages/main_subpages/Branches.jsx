import React, { useState } from 'react';
import ContentHeader from '../../components/ContentHeader';
import BranchItemModal from '../../components/branches/BranchItemModal';
import '../../styles/pages/subpages/branches/branches.css';

const Branches = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editableBranch, setEditableBranch] = useState(null);

  const handleBranchesSearch = (searchTerm) => {
    // Implement search logic
  };

  const handleCreateNewBranch = () => {
    setEditableBranch(null);
    setModalOpen(true);
  };

  const handleEditBranch = (branch) => {
    setEditableBranch(branch);
    setModalOpen(true);
  };

  return (
    <div className="branches-container">
      <ContentHeader title="Филиалы" onSearch={handleBranchesSearch} onCreate={handleCreateNewBranch} />
      <div className="branches-content">
        <div className='branches-content-header'>
                <span className='branches-content-header-subtitle branch-id'>
                    №
                </span>
                <span className='branches-content-header-subtitle branch-name'>
                    Название кофейни
                </span>
                <span className='branches-content-header-subtitle branch-address'>
                    Адрес
                </span>
                <span className='branches-content-header-subtitle branch-hours'>
                    Время работы
                </span>
                <span className='branches-content-header-subtitle branch-edit'>
                    Ред.
                </span>
            </div>
      </div>
      <BranchItemModal 
        isOpen={modalOpen} 
        toggleModal={() => setModalOpen(false)} 
        editable={editableBranch} 
      />
    </div>
  );
};

export default Branches;