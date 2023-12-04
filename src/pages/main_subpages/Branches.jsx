import React, { useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import BranchItemModal from "../../components/branches/BranchItemModal";
import DeleteModal from "../../components/DeleteModal";
import BranchItem from "../../components/branches/BranchItem";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  addBranch,
  editBranch,
  deleteBranch,
  initializeBranches,
} from "../../store/branchSlice";
import "../../styles/pages/subpages/branches/branches.css";

const Branches = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const [modalOpen, setModalOpen] = useState(false);
  const [editableBranch, setEditableBranch] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");

  const handleBranchesSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
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

    // Update local storage after state update
    const updatedBranches = branches.filter(
      (branch) => branch.id !== branchToDelete
    );
    localStorage.setItem("branches", JSON.stringify(updatedBranches));

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

  const filteredBranches = searchTerm
    ? branches.filter((branch) =>
        branch.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : branches;

  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = filteredBranches.slice(
    indexOfFirstBranch,
    indexOfLastBranch
  );

  const totalPages = Math.ceil(filteredBranches.length / branchesPerPage);

  useEffect(() => {
    // Load branches from local storage
    const savedBranches = JSON.parse(localStorage.getItem("branches")) || [];
    dispatch(initializeBranches(savedBranches));
    console.log(branches);
  }, [dispatch]);

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
        {currentBranches.length > 0 ? (
          currentBranches.map((branch, index) => (
            <BranchItem
              key={branch.id}
              branch={branch}
              index={index + indexOfFirstBranch}
              onEdit={() => handleEditBranch(branch)}
              onDeleteInitiated={() => handleDeleteInitiated(branch.id)}
            />
          ))
        ) : (
          <div className="no-results-message">Нет филиалов</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
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
