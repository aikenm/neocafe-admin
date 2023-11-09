import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/menuSlice';
import CloseIcon from '../images/close-icon.svg';
import '../styles/pages/subpages/menu/menu_modal.css'

const IngredientInput = ({ ingredient, onChange, onRemove, index }) => {
  return (
    <div className="inline-input-wrapper">
        <div className='inline-input-group name-input'>
            <span className='input-title'>Наименование</span>
            <input
                type="text"
                placeholder="Ингредиент"
                value={ingredient.name}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                className='input-field'
            />
        </div>
        <div className='inline-input-group amount-input'>
            <span className='input-title'>Количество</span>
            <input
                type="number"
                placeholder="Количество"
                value={ingredient.amount}
                onChange={(e) => onChange(index, 'amount', e.target.value)}
                className='input-field'
            />
            <select
                value={ingredient.unit}
                onChange={(e) => onChange(index, 'unit', e.target.value)}
                className='input-field'
            >
                <option value="г">г</option>
                <option value="мл">мл</option>
                <option value="шт">шт</option>
            </select>
        </div>
        {/* Optionally add a button for removing the ingredient */}
    </div>
  );
};

const MenuItemModal = ({ isOpen, toggleModal }) => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    ingredients: [],
  });
  const dispatch = useDispatch();

  const handleAddIngredient = () => {
    setMenuItem({
      ...menuItem,
      ingredients: [
        ...menuItem.ingredients,
        { name: '', amount: '', unit: 'г' },
      ],
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...menuItem.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setMenuItem({ ...menuItem, ingredients: newIngredients });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...menuItem.ingredients];
    newIngredients.splice(index, 1);
    setMenuItem({ ...menuItem, ingredients: newIngredients });
  };

  const handleFieldChange = (field, value) => {
    setMenuItem({ ...menuItem, [field]: value });
  };

  const handleSave = () => {
    dispatch(addItem(menuItem));
    toggleModal();
    setMenuItem({
      name: '',
      description: '',
      category: '',
      price: '',
      ingredients: [],
    });
  };

  if (!isOpen) return null;

  return (  
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className='modal-title'>Новая позиция</h2>
                    <button className="close-button" onClick={toggleModal}>
                        <img src={CloseIcon} alt='close-icon' />
                    </button>
                </div>
                <div className="modal-body">
                    <h3 className='section-title'>Добавьте фотографию к позиции</h3>
                    <div className="image-input-wrapper">
                        <div className='image-input-block'>
                            <input type="file" id="image-upload" className='image-input'/>
                            <span className='image-input-text'>Перетащите изображение для добавления или <label htmlFor="image-upload">обзор</label></span>
                        </div>
                    </div>
                    <h3 className='section-title'>Наименование, категория и стоимость</h3>
                    <span className='input-title'>Наименование</span>
                    <input
                        type="text"
                        placeholder="Наименование"
                        value={menuItem.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className='input-field'
                    />
                    <span className='input-title'>Описание</span>
                    <textarea
                        placeholder="Описание"
                        value={menuItem.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        className='input-field description-field'
                    />
                    <div className="inline-input-wrapper">
                        <div className='inline-input-group'>
                            <span className='input-title'>Категория</span>
                            <select
                            value={menuItem.category}
                            onChange={(e) => handleFieldChange('category', e.target.value)}
                            className='input-field'
                            >
                                <option value="Закуска">Закуска</option>
                                <option value="Основное блюдо">Основное блюдо</option>
                                <option value="Десерт">Десерт</option>
                            </select>
                        </div>
                        <div className='inline-input-group'>
                            <span className='input-title'>Стоймость</span>
                            <input
                                type="number"
                                placeholder="Цена"
                                value={menuItem.price}
                                onChange={(e) => handleFieldChange('price', e.target.value)}
                                className='input-field'
                            />
                        </div>
                    </div>
                    <h3 className='section-title'>Состав блюда и граммовка</h3>
                    {menuItem.ingredients.map((ingredient, index) => (
                        <IngredientInput
                        key={index}
                        ingredient={ingredient}
                        onChange={handleIngredientChange}
                        onRemove={handleRemoveIngredient}
                        index={index}
                        />
                    ))}
                    <button onClick={handleAddIngredient}>Добавить еще +</button>
                </div>
                <div className="modal-actions">
                    <button className="cancel-button" onClick={toggleModal}>Отмена</button>
                    <button className="save-button" onClick={handleSave}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemModal;
