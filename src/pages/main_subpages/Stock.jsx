import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ContentHeader from "../../components/ContentHeader";
import StockItem from "../../components/stock/StockItem";
import StockItemModal from "../../components/stock/StockItemModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { deleteStockItem, initializeStockItems } from "../../store/stockSlice";
import dropClosed from "../../images/down-closed.svg";
import dropOpen from "../../images/drop-down-open.svg";
import "../../styles/pages/subpages/stock/stock.css";

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedSubpage, setSelectedSubpage] = useState("ready_products");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const stockItems = useSelector((state) => state.stock.items);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 5;
  const branches = useSelector((state) => state.branch.branches);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayedStockName, setDisplayedStockName] =
    useState("Выберите склад");

  const fetchInventoryItems = useCallback(
    async (branchId) => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await axios.get(
          `https://neo-cafe.org.kg/api-warehouse/branches/${branchId}/inventory/`,
          {
            headers: {
              accept: "application/json",
              "X-CSRFToken": "your-token-here",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(initializeStockItems(response.data));
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    },
    [dispatch]
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStockSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSelectStock = (stockName) => {
    const selectedBranch = branches.find((b) => b.name === stockName);
    setSelectedStock(String(selectedBranch.id));
    setDisplayedStockName(selectedBranch.name);
    fetchInventoryItems(selectedBranch.id);
    setIsDropdownOpen(false);
  };

  const handleSubpageChange = (subpage) => {
    setSelectedSubpage(subpage);
    setCurrentPage(1);
  };

  const filterItems = useCallback(() => {
    return stockItems.filter((item) => {
      const matchesSearchTerm = item.name
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
      const isCorrectStock = item.branch.toString() === selectedStock;
      const isExpiring = item.is_running_out && item.quantity <= item.limit;
      const isInOriginalCategory = item.category === selectedSubpage;
      const isRunningOutCategory =
        selectedSubpage === "expiringProducts" && isExpiring;

      return (
        matchesSearchTerm &&
        isCorrectStock &&
        (isInOriginalCategory || isRunningOutCategory)
      );
    });
  }, [stockItems, selectedSubpage, searchTerm, selectedStock]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filterItems().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterItems().length / itemsPerPage);

  const handleEditItem = (item) => {
    setEditableItem({ ...item });
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

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        const accessToken = localStorage.getItem("token");
        await axios.delete(
          `https://neo-cafe.org.kg/api-warehouse/branches/${selectedStock}/inventory/${itemToDelete.id}/`,
          {
            headers: {
              accept: "application/json",
              "X-CSRFToken":
                "F1ohOeM7SHkvANB0TEPGlHB9zJdqHzA5U54NGnNxjBoIyTBSKQt5HLNvlxBSntk3",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(deleteStockItem(itemToDelete.id));
      } catch (error) {
        console.error("Error deleting inventory item:", error);
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    if (branches.length > 0) {
      const firstBranchId = String(branches[0].id);
      setSelectedStock(firstBranchId);
      setDisplayedStockName(branches[0].name);
      fetchInventoryItems(firstBranchId);
    }
  }, [branches, fetchInventoryItems]);

  const renderSubpageContent = () => {
    if (paginatedItems.length === 0) {
      return <div className="no-results-message">Нет элементов</div>;
    }

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
      />
      <div className="stock-content">
        <div className="stock-subpages-header">
          <div className="stock-branch-dropdown">
            <span
              className={`stock-content-header-subtitle stock-branch ${
                isDropdownOpen ? "branch-open" : "branch-closed"
              }`}
              onClick={toggleDropdown}
            >
              {displayedStockName}
              <img
                src={isDropdownOpen ? dropOpen : dropClosed}
                alt="drop-down"
                className="drop-down-icon"
              />
              {isDropdownOpen && (
                <div
                  className={`stock-dropdown ${
                    branches.length > 6 ? "stock-dropdown-scrollable" : ""
                  }`}
                >
                  {branches.map((branch) => (
                    <div key={branch.id} className="stock-wrapper">
                      <span
                        onClick={() => handleSelectStock(branch.name)}
                        className="stock-option"
                      >
                        {branch.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
          <button
            onClick={() => handleSubpageChange("ready_products")}
            className={`stock-subpage-button ${
              selectedSubpage === "ready_products"
                ? "active-subpage-button"
                : ""
            }`}
          >
            Готовая продукция
          </button>
          <button
            onClick={() => handleSubpageChange("raw_materials")}
            className={`stock-subpage-button ${
              selectedSubpage === "raw_materials" ? "active-subpage-button" : ""
            }`}
          >
            Сырье
          </button>
          <button
            onClick={() => handleSubpageChange("expiringProducts")}
            className={`stock-subpage-button expiring-products ${
              selectedSubpage === "expiringProducts"
                ? "active-expiring-products"
                : ""
            }`}
          >
            Заканчивающиеся продукты
          </button>
        </div>
        <div className="stock-content-header">
          <span className="stock-content-header-subtitle stock-id">№</span>
          <span className="stock-content-header-subtitle stock-name">
            Наименование
          </span>
          <span className="stock-content-header-subtitle stock-amount">
            Количество
          </span>
          <span className="stock-content-header-subtitle stock-limit">
            Лимит
          </span>
          <span className="stock-content-header-subtitle stock-date">
            Дата прихода
          </span>
          <span className="stock-content-header-subtitle stock-edit">Ред.</span>
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
