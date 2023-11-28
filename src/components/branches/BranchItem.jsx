import React, { useState, useEffect, useRef } from 'react';
import moreIcon from '../../images/more-icon.svg';
import editIcon from '../../images/edit-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';

const BranchItem = ({ branch, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [optionsRef]);

  const formatWorkingHours = (hours) => {
    return hours.map((day) => `${day.day}: ${day.open} - ${day.close}`).join(', ');
  };

    return (
        <div className="branch-item">
            <span className='branch-item-card branch-id'>№{branch.id}</span>
            <span className='branch-item-card branch-name'>{branch.name}</span>
            <span className='branch-item-card branch-address'>{branch.address}</span>
            <span className='branch-item-card branch-hours'>{formatWorkingHours(branch.workingHours)}</span>
            {/* <button onClick={handleMoreClick} className='branch-more-button'>
                <img src={moreIcon} alt='more-icon' />
            </button> */}
            {showOptions && (
                <div className="options-window" ref={optionsRef}>
                    <button onClick={() => { onEdit(branch); setShowOptions(false); }} className='option-button'>
                        <img src={editIcon} alt='edit-icon' className='option-icon' /> Редактировать
                    </button>
                    <button onClick={() => { onDelete(branch.id); setShowOptions(false); }} className='option-button'>
                        <img src={deleteIcon} alt='delete-icon' className='option-icon' /> Удалить
                    </button>
                </div>
            )}
        </div>
    );
};

export default BranchItem;
