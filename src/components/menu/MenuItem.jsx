import React from 'react';
import '../../styles/components/menu_item.css'

const MenuItem = ({ item, index }) => {
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
    </div>
  );
};

export default MenuItem;
