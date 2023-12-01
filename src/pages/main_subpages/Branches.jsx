import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import BranchItemModal from "../../components/branches/BranchItemModal";
import DeleteModal from "../../components/DeleteModal";
import BranchItem from "../../components/branches/BranchItem";
import Pagination from "../../components/Pagination"; // Import Pagination
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
  const [currentPage, setCurrentPage] = useState(1); // Add current page state
  const branchesPerPage = 6; // Number of branches to display per page

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

  // Paginate branches based on current page
  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);

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
        {currentBranches.map((branch, index) => (
          <BranchItem
            key={branch.id}
            branch={branch}
            index={index + indexOfFirstBranch}
            onEdit={() => handleEditBranch(branch)}
            onDeleteInitiated={handleDeleteInitiated}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(branches.length / branchesPerPage)}
        paginate={setCurrentPage}
      />
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
