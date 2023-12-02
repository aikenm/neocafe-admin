import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/stock/stock_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const EmployeeItem = ({ employee, index, onEdit, onDelete }) => {
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

  // Function to format working days
  const formatWorkingDays = (workingHours) => {
    const dayAbbreviations = {
      Понедельник: "Пн",
      Вторник: "Вт",
      Среда: "Ср",
      Четверг: "Чт",
      Пятница: "Пт",
      Суббота: "Сб",
      Воскресенье: "Вс",
    };

    return Object.entries(workingHours)
      .filter(([_, data]) => data.enabled)
      .map(([day, _]) => dayAbbreviations[day])
      .join(", ");
  };

  return (
    <div className="employee-item">
      <span className="employee-item-card employee-id">№{index + 1}</span>
      <span className="employee-item-card employee-name">{employee.name}</span>
      <span className="employee-item-card employee-position">
        {employee.position}
      </span>
      <span className="employee-item-card employee-branch">
        {employee.branch}
      </span>
      <span className="employee-item-card employee-phone">
        {employee.phone}
      </span>
      <span className="employee-item-card employee-schedule">
        {formatWorkingDays(employee.workingHours)}
      </span>
      <button onClick={handleMoreClick} className="employee-more-button">
        <img src={moreIcon} alt="more-icon" />
      </button>
      {showOptions && (
        <div className="options-window" ref={optionsRef}>
          <button
            onClick={() => {
              onEdit(employee);
              setShowOptions(false);
            }}
            className="option-button"
          >
            <img src={editIcon} alt="edit-icon" className="option-icon" />
            Редактировать
          </button>
          <button
            onClick={() => {
              onDelete(employee);
              setShowOptions(false);
            }}
            className="option-button"
          >
            <img src={deleteIcon} alt="delete-icon" className="option-icon" />
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeItem;
