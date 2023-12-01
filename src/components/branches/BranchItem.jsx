import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/branches/branch_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const BranchItem = ({
  branch,
  index,
  onEdit,
  onDeleteInitiated,
  moreOptionsVisible,
  setMoreOptionsVisible,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
    setMoreOptionsVisible(!showOptions);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
        setMoreOptionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [optionsRef, setMoreOptionsVisible]);

  const formatWorkingHours = (workingHours) => {
    const dayAbbreviations = {
      Понедельник: "Пн",
      Вторник: "Вт",
      Среда: "Ср",
      Четверг: "Чт",
      Пятница: "Пт",
      Суббота: "Сб",
      Воскресенье: "Вс",
    };

    const daysEnabled = Object.entries(workingHours)
      .filter(([_, data]) => data.enabled)
      .map(
        ([day, data]) => dayAbbreviations[day] + ` с ${data.from} до ${data.to}`
      );

    if (daysEnabled.length === 7) {
      return "Каждый день " + daysEnabled[0].slice(3);
    } else if (
      daysEnabled.length === 5 &&
      !workingHours["Суббота"].enabled &&
      !workingHours["Воскресенье"].enabled
    ) {
      return "Пн-Пт с 11:00 до 22:00";
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
          <button
            onClick={() => {
              onEdit(branch);
              setShowOptions(false);
              setMoreOptionsVisible(false);
            }}
            className="option-button"
          >
            <img src={editIcon} alt="edit-icon" /> Редактировать
          </button>
          <button
            onClick={() => {
              onDeleteInitiated(branch.id);
              setShowOptions(false);
              setMoreOptionsVisible(false);
            }}
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
