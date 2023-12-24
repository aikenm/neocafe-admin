import React, { useState, useEffect } from "react";
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
  const [selectedStock, setSelectedStock] = useState("stock1");
  const [selectedSubpage, setSelectedSubpage] = useState("finishedGoods");
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStockSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const fetchInventoryItems = async (branchId) => {
    try {
      const response = await axios.get(
        `https://neo-cafe.org.kg/api-warehouse/branches/${branchId}/inventory/`,
        {
          headers: {
            accept: "application/json",
            "X-CSRFToken":
              "zeruwFWl4OSHaunglUEwhc0nHSKG6iBx7iSK6078MxDtAulJyFyWcXIvBZDFnxon",
          },
        }
      );
      dispatch(initializeStockItems(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  const handleSelectStock = (stockName) => {
    const selectedStock = branches.find((b) => b.name === stockName);
    if (selectedStock) {
      setSelectedStock(String(selectedStock.id));
      setDisplayedStockName(selectedStock.name);
      fetchInventoryItems(1);
    } else {
      setSelectedStock("all");
      setDisplayedStockName("Выберите склад");
    }
    setIsDropdownOpen(false);
  };

  const handleSubpageChange = (subpage) => {
    setSelectedSubpage(subpage);
    setCurrentPage(1);
  };

  const filteredItems = stockItems.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
    const isCorrectStock = item.stockId === selectedStock;
    let isCorrectCategory = true;

    switch (selectedSubpage) {
      case "finishedGoods":
        isCorrectCategory = item.category === "finishedGoods";
        break;
      case "rawMaterials":
        isCorrectCategory = item.category === "rawMaterials";
        break;
      case "expiringProducts":
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
    // Update local storage for edit
    const updatedItems = stockItems.map((it) =>
      it.id === item.id ? item : it
    );
    localStorage.setItem("stockItems", JSON.stringify(updatedItems));
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

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteStockItem(itemToDelete.id));
      // Update local storage
      const updatedItems = stockItems.filter(
        (item) => item.id !== itemToDelete.id
      );
      localStorage.setItem("stockItems", JSON.stringify(updatedItems));
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

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

  useEffect(() => {
    // Load stock items from local storage on component mount
    const savedStockItems =
      JSON.parse(localStorage.getItem("stockItems")) || [];
    dispatch(initializeStockItems(savedStockItems));
    console.log(savedStockItems);
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("stockItems", JSON.stringify(stockItems));
  }, [stockItems]);

  return (
    <div className="stock-container">
      <ContentHeader
        title="Склад"
        onCreate={handleCreateNewItem}
        onSearch={handleStockSearch}
      />
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
                <div className="stock-wrapper">
                  <span
                    onClick={() => handleSelectStock("all")}
                    className="stock-option"
                  >
                    Все
                  </span>
                </div>
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
          onClick={() => handleSubpageChange("finishedGoods")}
          className={`stock-subpage-button ${
            selectedSubpage === "finishedGoods" ? "active-subpage-button" : ""
          }`}
        >
          Готовая продукция
        </button>
        <button
          onClick={() => handleSubpageChange("rawMaterials")}
          className={`stock-subpage-button ${
            selectedSubpage === "rawMaterials" ? "active-subpage-button" : ""
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
      <div className="stock-content">
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
