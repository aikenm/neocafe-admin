import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/branches/branch_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const BranchItem = ({ branch, index, onEdit, onDeleteInitiated }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [optionsRef]);

  const formatWorkingHours = (workingHours) => {
    const daysEnabled = Object.entries(workingHours)
      .filter(([_, data]) => data.enabled)
      .map(
        ([day, data]) => `${day.substring(0, 2)} с ${data.from} до ${data.to}`
      );

    if (daysEnabled.length === 7) {
      return "Каждый день " + daysEnabled[0].slice(3);
    }
    return daysEnabled.join(", ") || "";
  };

  return (
    <div className="branch-item">
      <span className="branch-item-card branch-id">№{index + 1}</span>
      <span className="branch-item-card branch-name">{branch.name}</span>
      <span className="branch-item-card branch-adress">{branch.address}</span>
      <span className="branch-item-card branch-schedule">
        {formatWorkingHours(branch.workingHours)}
      </span>
      <button
        onClick={handleMoreClick}
        className="branch-more-button branch-edit"
      >
        <img src={moreIcon} alt="more-icon" />
      </button>
      {showOptions && (
        <div className="options-window" ref={optionsRef}>
          <button onClick={() => onEdit(branch)} className="option-button">
            <img src={editIcon} alt="edit-icon" /> Редактировать
          </button>
          <button
            onClick={() => onDeleteInitiated(branch.id)}
            className="option-button"
          >
            <img src={deleteIcon} alt="delete-icon" /> Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default BranchItem;
