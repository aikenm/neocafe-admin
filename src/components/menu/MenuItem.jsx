import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/menu/menu_item.css';
import moreIcon from '../../images/more-icon.svg';
import editIcon from '../../images/edit-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';

const MenuItem = ({ item, index, onMoreClick, onEdit, onDelete }) => {
    const [showOptions, setShowOptions] = useState(false);
    const optionsRef = useRef(null);

    const handleMoreClick = (e) => {
        e.stopPropagation(); 
        setShowOptions(!showOptions);
        onMoreClick(item);
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
            <button onClick={handleMoreClick} className='more-button'><img src={moreIcon} alt='more-icon' /></button>
            {showOptions && (
                <div className="options-window" ref={optionsRef}>
                    <div className="options-window" ref={optionsRef}>
                    <button onClick={() => { onEdit(item); setShowOptions(false); }} className='option-button'><img src={editIcon} alt='edit-icon' className='option-icon' /> Редактировать</button>
                    <button onClick={() => { onDelete(item); setShowOptions(false); }} className='option-button'><img src={deleteIcon} alt='delete-icon' className='option-icon' /> Удалить</button>
                </div>
                </div>
            )}
        </div>
    );
};

export default MenuItem;
