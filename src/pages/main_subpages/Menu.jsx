import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
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
                {menuItems.map((item, index) => (
                    <MenuItem 
                        key={item.id}
                        item={item} 
                        index={index} 
                        onMoreClick={() => {}}
                        onEdit={handleEdit} 
                        onDelete={() => handleDeleteInitiated(item)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
