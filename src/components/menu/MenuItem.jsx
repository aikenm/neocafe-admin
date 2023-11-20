import React, { useState, useRef, useEffect } from 'react';
import '../../styles/components/menu/menu_item.css';
import MoreIcon from '../../images/more-icon.svg';

const MenuItem = ({ item, index, onEdit, onDelete }) => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const handleMoreClick = (e) => {
        e.stopPropagation(); 
        setShowOptions(!showOptions);
    };

    const handleEdit = () => {
        onEdit(item);
        setShowOptions(false);
    };

    const handleDelete = () => {
        onDelete(item);
        setShowOptions(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionsRef]);

    return (
        <div className="menu-item">
            <span className='menu-item-card id'>№{index + 1}</span>
            <span className='menu-item-card name'>{item.name}</span>
            <span className='menu-item-card category'>{item.category}</span>
            <span className='menu-item-card ingredients'>
                {item.ingredients.map((ing, i) => (
                    <span key={i}>{`${ing.name} (${ing.amount}${ing.unit}), `}</span>
                ))}
            </span>
            <span className='menu-item-card price'>{item.price} сом</span>
            <span className='menu-item-card branch'>Главный филиал</span>
            <button onClick={handleMoreClick} className='more-button'><img src={MoreIcon} alt='more-icon' /></button>
            {showOptions && (
                <div className="options-window" ref={optionsRef}>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default MenuItem;
