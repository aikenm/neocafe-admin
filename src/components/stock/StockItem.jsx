import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/stock/stock_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const StockItem = ({ item, index, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className="stock-item">
      <span className="stock-item-card stock-id">№{index + 1}</span>
      <span className="stock-item-card stock-name">{item.name}</span>
      <span className="stock-item-card stock-amount">
        {item.amount} {item.unit}
      </span>
      <span className="stock-item-card stock-limit">
        {item.minLimit} {item.unit}
      </span>
      <span className="stock-item-card stock-date">{item.arrivalDate}</span>
      <button onClick={handleMoreClick} className="stock-more-button">
        <img src={moreIcon} alt="more-icon" />
      </button>
      {showOptions && (
        <div className="options-window" ref={optionsRef}>
          <button
            onClick={() => {
              onEdit(item);
              setShowOptions(false);
            }}
            className="option-button"
          >
            <img src={editIcon} alt="edit-icon" className="option-icon" />{" "}
            Редактировать
          </button>
          <button
            onClick={() => {
              onDelete(item);
              setShowOptions(false);
            }}
            className="option-button"
          >
            <img src={deleteIcon} alt="delete-icon" className="option-icon" />{" "}
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default StockItem;
