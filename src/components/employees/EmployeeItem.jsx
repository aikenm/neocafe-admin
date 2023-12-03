import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/employees/employee_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const EmployeeItem = ({ employee, branches, index, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const getBranchName = (branchId) => {
    // Convert branchId to a number for comparison
    const numericBranchId = Number(branchId);

    // Find the branch using the numeric ID
    const branch = branches.find((b) => b.id === numericBranchId);
    return branch ? branch.name : "Unknown Branch";
  };

  const branchName = getBranchName(employee.branch);

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
  console.log(employee);

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
    <div className="employee-item">
      <span className="employee-item-card employee-id">№{index + 1}</span>
      <span className="employee-item-card employee-name">{employee.name}</span>
      <span className="employee-item-card employee-position">
        {employee.role}
      </span>
      <span className="employee-item-card employee-branch">{branchName}</span>
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
