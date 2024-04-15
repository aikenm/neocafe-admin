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
    const numericBranchId = Number(branchId);
    const branch = branches.find((b) => b.id === numericBranchId);
    return branch ? branch.name : "Филиал не выбран";
  };

  const branchName = getBranchName(employee.branch);

  const formatWorkingDays = () => {
    const dayAbbreviations = {
      Понедельник: "Пн",
      Вторник: "Вт",
      Среда: "Ср",
      Четверг: "Чт",
      Пятница: "Пт",
      Суббота: "Сб",
      Воскресенье: "Вс",
    };

    const workingDays = Object.entries(employee.workingHours || {}).reduce(
      (acc, [day, { enabled }]) => {
        if (enabled) {
          acc.push(dayAbbreviations[day]);
        }
        return acc;
      },
      []
    );

    return workingDays.length > 0 ? workingDays.join(", ") : "Не указан";
  };

  const positionMapping = {
    waiter: "Официант",
    barista: "Бариста",
  };

  const getPositionTranslation = (positionKey) => {
    return positionMapping[positionKey] || "Не указана";
  };

  const displayName = employee.first_name || "";
  const displaySurname = employee.last_name || "";

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
      <span className="employee-item-card employee-name">
        {displayName} {displaySurname}
      </span>
      <span className="employee-item-card employee-position">
        {getPositionTranslation(employee.position)}
      </span>
      <span className="employee-item-card employee-branch">{branchName}</span>
      <span className="employee-item-card employee-phone">
        {employee.phone || "Не указан"}
      </span>
      <span className="employee-item-card employee-schedule">
        {formatWorkingDays()}
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
