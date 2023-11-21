import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import Pagination from '../../components/Pagination';
import MenuItem from '../../components/menu/MenuItem';
import MenuItemModal from '../../components/menu/MenuItemModal';
import DeleteModal from '../../components/DeleteModal';
import CategoryCreateModal from '../../modal_windows/menu/CategoryCreateModal';
import { deleteItem, addCategory, deleteCategory } from '../../store/menuSlice'; 
import dropClosed from '../../images/down-closed.svg';
import dropOpen from '../../images/drop-down-open.svg';
import categoryDelete from '../../images/category-delete.svg';
import plusSign from '../../images/plus.svg';
import '../../styles/pages/subpages/menu/menu.css';

const Menu = () => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.menu.items);
    const categories = useSelector((state) => state.menu.categories);
    
    const [modalOpen, setModalOpen] = useState(false);
    const [editableItem, setEditableItem] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menuItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(menuItems.length / itemsPerPage);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isCategoryCreateModalOpen, setIsCategoryCreateModalOpen] = useState(false);

    const handleEdit = (item) => {
        setEditableItem(item);
        setModalOpen(true);
    };

    const handleDeleteInitiated = (item) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            dispatch(deleteItem(itemToDelete.id));
        }
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
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
        setIsDropdownOpen(true);
        setIsCategoryCreateModalOpen(true);
    };
    
    const handleCategoryCreation = (categoryData) => {
        dispatch(addCategory(categoryData));
        setIsCategoryCreateModalOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };

    return (
        <div className="menu-container">
            <ContentHeader title="Меню" onCreate={() => setModalOpen(true)} />
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
                <div className='menu-content-header'>
                    <span className='menu-content-header-subtitle id'>
                        №
                    </span>
                    <span className='menu-content-header-subtitle name'>
                        Наименование
                    </span>
                    <span className={`menu-content-header-subtitle category ${isDropdownOpen ? 'category-open' : 'category-closed'}`} onClick={toggleDropdown}>
                        {selectedCategory === 'all' ? 'Категория' : selectedCategory}
                        <img src={isDropdownOpen ? dropOpen : dropClosed} alt='drop-down' className='drop-down-icon' />                   
                        {isDropdownOpen && (
                            <div className="category-dropdown">
                                {categories.map(category => (
                                    <div key={category.id} className='categories-wrapper'>
                                        <span  onClick={() => handleCategorySelect(category.name)} className='category-option'>
                                                {category.name}
                                                <button onClick={() => handleDeleteCategory(category.id)} className='category-delete-btn'>
                                                    <img src={categoryDelete} alt='delete-icon' className='category-delete-icon' />
                                                </button>
                                        </span>
                                    </div>
                                ))}
                                <button onClick={handleCreateCategory} className='category-create-btn'>Добавить <img src={plusSign} alt='more-icon' className='category-create-icon' /></button>
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
                    <span className='menu-content-header-subtitle ingredients'>
                        Состав блюда и граммовка
                    </span>
                    <span className='menu-content-header-subtitle price'>
                        Стоимость
                    </span>
                    <span className='menu-content-header-subtitle edit'>
                        Ред.
                    </span>
                </div>
                {currentItems.map((item, index) => (
                    <MenuItem 
                        key={item.id}
                        item={item} 
                        index={indexOfFirstItem + index} 
                        onMoreClick={() => {}}
                        onEdit={handleEdit} 
                        onDelete={() => handleDeleteInitiated(item)} 
                    />
                ))}
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
