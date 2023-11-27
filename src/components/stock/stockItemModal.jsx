import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addStockItem, editStockItem } from '../../store/stockSlice';
import CloseIcon from '../../images/close-icon.svg';
import '../../styles/components/stock/stock_modal.css';

const defaultValues = {
    name: '',
    category: '',
    amount: '',
    unit: 'г',
    minLimit: '',
    arrivalDate: ''
};

const StockItemModal = ({ isOpen, toggleModal, editable }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm({ defaultValues });

    useEffect(() => {
        reset(editable ? editable : defaultValues);
    }, [editable, reset, isOpen]);

    const onSubmit = (data) => {
        const itemData = { ...data, id: editable ? editable.id : Date.now() };
        if (editable) {
            dispatch(editStockItem(itemData));
        } else {
            dispatch(addStockItem(itemData));
        }
        toggleModal();
    };

    const handleCloseModal = () => {
        reset(defaultValues);
        toggleModal();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='modal-title'>{editable ? 'Edit Stock Item' : 'New Stock Item'}</h2>
                        <button type="button" className="close-button" onClick={handleCloseModal}>
                            <img src={CloseIcon} alt='close-icon' />
                        </button>
                    </div>
                    <div className="modal-body">
                        <h3 className='section-title'>Наименование, категория и количество</h3>
                        <span className='input-title'>Наименование</span>
                        <input 
                            {...register('name')} 
                            placeholder="Введите название" 
                            className='input-field'
                        />
                        <div className="inline-input-wrapper">
                            <div className='inline-input-group'>
                                <span className='input-title'>Категория</span>
                                <select {...register('category')} className='input-field'>
                                    <option value="">Выберите категорию</option>
                                    <option value="finishedGoods">Готовая продукция</option>
                                    <option value="rawMaterials">Сырье</option>
                                </select>
                            </div>
                            <div className='inline-input-group amount-unit-group'>
                                <div className='amount-input-wrapper'>
                                    <span className='input-title'>Кол-во (в гр, мл, л, кг)</span>
                                    <input 
                                        {...register('amount', 
                                        { valueAsNumber: true })} 
                                        placeholder="Количество" 
                                        type="number" 
                                        className='input-field'
                                    />
                                </div>
                                <div className='unit-input-wrapper'>
                                    <select {...register('unit')} className='input-field'>
                                        <option value="г">г</option>
                                        <option value="мл">мл</option>
                                        <option value="шт">шт</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="inline-input-wrapper">
                            <div className='inline-input-group'>
                                <span className='input-title'>Минимальный лимит</span>
                                <input 
                                    {...register('minLimit', 
                                    { valueAsNumber: true })} 
                                    placeholder="Например: 2кг" 
                                    type="number" 
                                    className='input-field'
                                />
                            </div>
                            <div className='inline-input-group'>
                                <span className='input-title'>Дата прихода</span>
                                <input 
                                    {...register('arrivalDate')} 
                                    type="date" 
                                    placeholder="Arrival Date" 
                                    className='input-field' 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-actions">
                    <button type="button" className="cancel-button button" onClick={handleCloseModal}>Отмена</button>
                    <button type="submit" className="save-button button">{editable ? 'Save' : 'Create'}</button>                    </div>
                </div>
            </form>
        </div>
    );
};

export default StockItemModal;
