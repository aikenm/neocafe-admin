import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import Pagination from '../../components/Pagination';
import MenuItem from '../../components/menu/MenuItem';
import MenuItemModal from '../../components/menu/MenuItemModal';
import DeleteModal from '../../components/DeleteModal';
import { deleteItem } from '../../store/menuSlice'; 
import '../../styles/pages/subpages/menu/menu.css';

const Menu = () => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.menu.items);
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
                    <span className='menu-content-header-subtitle category'>
                        Категория
                    </span>
                    <span className='menu-content-header-subtitle ingredients'>
                        Состав блюда и граммовка
                    </span>
                    <span className='menu-content-header-subtitle price'>
                        Стоимость
                    </span>
                    <span className='menu-content-header-subtitle branch'>
                        Филиал
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
