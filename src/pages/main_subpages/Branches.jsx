import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import BranchItemModal from "../../components/branches/BranchItemModal";
import DeleteModal from "../../components/DeleteModal";
import BranchItem from "../../components/branches/BranchItem";
import { useSelector, useDispatch } from "react-redux";
import { addBranch, editBranch, deleteBranch } from "../../store/branchSlice";
import "../../styles/pages/subpages/branches/branches.css";

const Branches = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const [modalOpen, setModalOpen] = useState(false);
  const [editableBranch, setEditableBranch] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

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

  const handleDeleteInitiated = (branchId) => {
    setBranchToDelete(branchId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteBranch(branchToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleBranchSubmit = (branchData) => {
    if (editableBranch) {
      dispatch(editBranch({ ...editableBranch, ...branchData }));
    } else {
      dispatch(addBranch({ id: Date.now(), ...branchData }));
    }
    setModalOpen(false);
  };

  // useEffect(() => {
  //     const savedBranches = JSON.parse(localStorage.getItem('branches')) || [];
  //     savedBranches.forEach(branch => dispatch(addBranch(branch)));
  // }, [dispatch]);

  // useEffect(() => {
  //     localStorage.setItem('branches', JSON.stringify(branches));
  // }, [branches]);

  return (
    <div className="branches-container">
      <ContentHeader
        title="Филиалы"
        onSearch={handleBranchesSearch}
        onCreate={handleCreateNewBranch}
      />
      <div className="branches-content">
        <div className="branches-content-header">
          <span className="branches-content-header-subtitle branch-id">№</span>
          <span className="branches-content-header-subtitle branch-name">
            Название кофейни
          </span>
          <span className="branches-content-header-subtitle branch-adress">
            Адрес
          </span>
          <span className="branches-content-header-subtitle branch-schedule">
            Время работы
          </span>
          <span className="branches-content-header-subtitle branch-edit">
            Ред.
          </span>
        </div>
        {branches.map((branch, index) => (
          <BranchItem
            key={branch.id}
            branch={branch}
            index={index}
            onEdit={() => handleEditBranch(branch)}
            onDeleteInitiated={handleDeleteInitiated}
          />
        ))}
      </div>
      <BranchItemModal
        isOpen={modalOpen}
        toggleModal={() => setModalOpen(false)}
        editable={editableBranch}
        onSubmit={handleBranchSubmit}
      />
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          message="Вы уверены, что хотите удалить этот филиал?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Branches;
