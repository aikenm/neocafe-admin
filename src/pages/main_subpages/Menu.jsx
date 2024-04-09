import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "../../components/ContentHeader";
import Pagination from "../../components/Pagination";
import MenuItem from "../../components/menu/MenuItem";
import MenuItemModal from "../../components/menu/MenuItemModal";
import DeleteModal from "../../components/DeleteModal";
import CategoryCreateModal from "../../modal_windows/menu/CategoryCreateModal";
import {
  deleteItem,
  addCategory,
  deleteCategory,
  initializeCategoriesInBulk,
  initializeItems,
} from "../../store/menuSlice";
import dropClosed from "../../images/down-closed.svg";
import dropOpen from "../../images/drop-down-open.svg";
import categoryDelete from "../../images/category-delete.svg";
import plusSign from "../../images/plus.svg";
import "../../styles/pages/subpages/menu/menu.css";

const Menu = () => {
  const dispatch = useDispatch();

  const menuItems = useSelector((state) => state.menu.items);
  const categories = useSelector((state) => state.menu.categories);

  const [modalOpen, setModalOpen] = useState(false);
  const [editableItem, setEditableItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [internalSelectedCategory, setInternalSelectedCategory] =
    useState("Все");
  const [isCategoryCreateModalOpen, setIsCategoryCreateModalOpen] =
    useState(false);
  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const dropdownRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchTerm, setSearchTerm] = useState("");

  // Removed axios call for categories from useEffect

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("token");

  //   axios
  //     .get("https://neo-cafe.org.kg/api-admin/category/", {
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       dispatch(initializeCategories(response.data));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching categories:", error);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      dispatch(initializeCategoriesInBulk(parsedCategories));
    }

    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);

      dispatch(initializeItems(parsedItems));
    }
  }, [dispatch]);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      internalSelectedCategory === "Все" ||
      item.category === internalSelectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (updatedItem) => {
    setEditableItem(updatedItem);
    setModalOpen(true);
  };

  const handleDeleteInitiated = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteItem(itemToDelete.id));
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditableItem(null);
  };

  const handleCreateCategory = () => {
    setIsCategoryCreateModalOpen(true);
  };

  const handleCategoryCreation = (categoryData) => {
    dispatch(addCategory(categoryData));
    setIsCategoryCreateModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "Все" ? "all" : category);
    setInternalSelectedCategory(category);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleDeleteCategoryInitiated = (event, categoryId) => {
    event.stopPropagation();
    const category = categories.find((cat) => cat.id === categoryId);
    setCategoryToDelete(category);
    setIsCategoryDeleteModalOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete.id));
      setIsCategoryDeleteModalOpen(false);
      setCategoryToDelete(null);
      if (selectedCategory === categoryToDelete.name) {
        setSelectedCategory("all");
        setInternalSelectedCategory("Все");
      }
    }
  };

  const handleCancelDeleteCategory = () => {
    setIsCategoryDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="menu-container">
      <ContentHeader
        title="Меню"
        onCreate={() => setModalOpen(true)}
        onSearch={setSearchTerm}
      />
      {modalOpen && (
        <MenuItemModal
          isOpen={modalOpen}
          toggleModal={handleCloseModal}
          editable={editableItem}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        message="Вы действительно хотите удалить данную позицию?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <div className="menu-content">
        <div className="menu-content-header">
          <span className="menu-content-header-subtitle menu-id">№</span>
          <span className="menu-content-header-subtitle menu-name">
            Наименование
          </span>
          <span
            className={`menu-content-header-subtitle menu-category ${
              isDropdownOpen ? "category-open" : "category-closed"
            }`}
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            {selectedCategory === "all" ? "Категория" : selectedCategory}
            <img
              src={isDropdownOpen ? dropOpen : dropClosed}
              alt="drop-down"
              className="drop-down-icon"
            />
            {isDropdownOpen && (
              <div className="category-dropdown">
                <div className="categories-wrapper">
                  <span
                    onClick={() => handleCategorySelect("Все")}
                    className="category-option"
                  >
                    Все
                  </span>
                </div>
                {categories.map((category) => (
                  <div key={category.id} className="categories-wrapper">
                    <span
                      onClick={() => handleCategorySelect(category.name)}
                      className="category-option"
                    >
                      {category.name}
                      <button
                        onClick={(event) =>
                          handleDeleteCategoryInitiated(event, category.id)
                        }
                        className="category-delete-btn"
                      >
                        <img
                          src={categoryDelete}
                          alt="delete-icon"
                          className="category-delete-icon"
                        />
                      </button>
                    </span>
                  </div>
                ))}
                <button
                  onClick={handleCreateCategory}
                  className="category-create-btn"
                >
                  Добавить{" "}
                  <img
                    src={plusSign}
                    alt="more-icon"
                    className="category-create-icon"
                  />
                </button>
              </div>
            )}
          </span>
          {isCategoryCreateModalOpen && (
            <CategoryCreateModal
              isOpen={isCategoryCreateModalOpen}
              toggleModal={() => setIsCategoryCreateModalOpen(false)}
              onCreate={handleCategoryCreation}
            />
          )}
          <DeleteModal
            isOpen={isCategoryDeleteModalOpen}
            message={`Вы действительно хотите удалить категорию "${categoryToDelete?.name}"?`}
            onConfirm={handleConfirmDeleteCategory}
            onCancel={handleCancelDeleteCategory}
          />
          <span className="menu-content-header-subtitle menu-ingredients">
            Состав блюда и граммовка
          </span>
          <span className="menu-content-header-subtitle menu-price">
            Стоимость
          </span>
          <span className="menu-content-header-subtitle menu-edit">Ред.</span>
        </div>
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              index={indexOfFirstItem + index}
              onEdit={handleEdit}
              onDelete={() => handleDeleteInitiated(item)}
            />
          ))
        ) : (
          <div className="no-results-message">Нет элементов</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Menu;
