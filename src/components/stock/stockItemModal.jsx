import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addStockItem, editStockItem } from '../../store/stockSlice';
import CloseIcon from '../../images/close-icon.svg';
import '../../styles/components/stock/stock_modal.css';

const StockItemModal = ({ isOpen, toggleModal, editable }) => {
    const dispatch = useDispatch();
    const stockItems = useSelector((state) => state.stock.items);
    const isEditMode = editable != null;

    const { register, handleSubmit, reset } = useForm({
        defaultValues: isEditMode ? editable : {
            name: '',
            category: '',
            amount: 0,
            unit: '',
            minLimit: 0
        }
    });

    const onSubmit = (data) => {
        if (isEditMode) {
            dispatch(editStockItem({ ...data, id: editable.id }));

            // Update local storage for editStockItem
            const updatedItems = stockItems.map(item => 
                item.id === editable.id ? { ...data, id: editable.id } : item
            );
            localStorage.setItem('stockItems', JSON.stringify(updatedItems));
        } else {
            const newItem = { ...data, id: Date.now() };
            dispatch(addStockItem(newItem));

            // Update local storage for addStockItem
            const updatedItems = [...stockItems, newItem];
            localStorage.setItem('stockItems', JSON.stringify(updatedItems));
        }
        toggleModal();
        reset();
    };

    const handleCloseModal = () => {
        reset();
        toggleModal();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='modal-title'>{isEditMode ? 'Edit Stock Item' : 'New Stock Item'}</h2>
                        <button type="button" className="close-button" onClick={handleCloseModal}>
                            <img src={CloseIcon} alt='close-icon' />
                        </button>
                    </div>
                    <div className="modal-body">
                        <input {...register('name')} placeholder="Item Name" className='input-field'/>
                        <select {...register('category')} className='input-field'>
                            <option value="">Выберите категорию</option>
                            <option value="rawMaterials">Сырье</option>
                            <option value="finishedGoods">Готовая продукция</option>
                        </select>
                        <input {...register('amount', { valueAsNumber: true })} placeholder="Amount" type="number" className='input-field'/>
                        <input {...register('unit')} placeholder="Unit (e.g., kg, pcs)" className='input-field'/>
                        <input {...register('minLimit', { valueAsNumber: true })} placeholder="Minimal Limit" type="number" className='input-field'/>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button button" onClick={handleCloseModal}>Cancel</button>
                        <button type="submit" className="save-button button">{isEditMode ? 'Save' : 'Create'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StockItemModal;
