import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import MenuItem from '../../components/menu/MenuItem';
import MenuItemModal from '../../components/menu/MenuItemModal';
import { editItem, deleteItem } from '../../store/menuSlice'; // Import actions
import '../../styles/pages/subpages/menu/menu.css';

const Menu = () => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.menu.items);
    const [modalOpen, setModalOpen] = useState(false);
    const [editableItem, setEditableItem] = useState(null);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleEdit = (item) => {
        setEditableItem(item);
        setModalOpen(true);
    };

    const handleDelete = (itemId) => {
        // Dispatch an action to delete the item
        dispatch(deleteItem(itemId));
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
                </div>
                {menuItems.map((item, index) => (
                    <MenuItem 
                        key={item.id}
                        item={item} 
                        index={index} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
