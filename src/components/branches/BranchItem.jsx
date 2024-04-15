import React, { useState, useEffect, useRef } from "react";
import "../../styles/components/branches/branch_item.css";
import moreIcon from "../../images/more-icon.svg";
import editIcon from "../../images/edit-icon.svg";
import deleteIcon from "../../images/delete-icon.svg";

const BranchItem = ({ branch, index, onEdit, onDeleteInitiated }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleEditClick = () => {
    onEdit(branch);
    setShowOptions(false);
  };

  const handleDeleteClick = () => {
    onDeleteInitiated(branch.id);
    setShowOptions(false);
  };

  const formatWorkingHours = (branch) => {
    const daysOfWeek = [
      { day: "Понедельник", label: "Пн" },
      { day: "Вторник", label: "Вт" },
      { day: "Среда", label: "Ср" },
      { day: "Четверг", label: "Чт" },
      { day: "Пятница", label: "Пт" },
      { day: "Суббота", label: "Сб" },
      { day: "Воскресенье", label: "Вс" },
    ];

    let groups = [];

    daysOfWeek.forEach((dayInfo, index) => {
      const hours = branch.workingHours[dayInfo.day];
      if (hours) {
        const lastGroup = groups[groups.length - 1];
        const { enabled, from, to } = hours;

        if (enabled) {
          const range = `${from}-${to}`;
          if (lastGroup && lastGroup.range === range) {
            lastGroup.days.push(dayInfo.label);
            lastGroup.consecutive = lastGroup.consecutive !== false;
          } else {
            groups.push({ range, days: [dayInfo.label], consecutive: false });
          }
        } else {
          if (lastGroup && lastGroup.range === "Выходной") {
            lastGroup.days.push(dayInfo.label);
            lastGroup.consecutive = lastGroup.consecutive !== false;
          } else {
            groups.push({
              range: "Выходной",
              days: [dayInfo.label],
              consecutive: false,
            });
          }
        }
      }
    });

    const formattedHours = groups
      .map((group) => {
        if (group.range === "Выходной") {
          if (group.days.length === 7) {
            return `Каждый день выходной`;
          }
          const daysFormatted =
            group.consecutive && group.days.length > 2
              ? `${group.days[0]} - ${group.days[group.days.length - 1]}`
              : group.days.join(", ");
          return `${daysFormatted} - Выходной`;
        }
        if (group.days.length === 7) {
          return `Каждый день с ${group.range}`;
        }
        const daysFormatted =
          group.consecutive && group.days.length > 2
            ? `${group.days[0]} - ${group.days[group.days.length - 1]}`
            : group.days.join(", ");
        return `${daysFormatted} с ${group.range}`;
      })
      .join("; ");

    return formattedHours || "Нет рабочих часов";
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

  return (
    <div className="branch-item">
      <span className="branch-item-card branch-id">№{index + 1}</span>
      <span className="branch-item-card branch-name">{branch.name}</span>
      <span className="branch-item-card branch-adress">{branch.address}</span>
      <span className="branch-item-card branch-schedule">
        {formatWorkingHours(branch)}
      </span>
      <button
        onClick={handleMoreClick}
        className="branch-more-button branch-edit"
      >
        <img src={moreIcon} alt="more-icon" />
      </button>
      {showOptions && (
        <div className="options-window" ref={optionsRef}>
          <button onClick={handleEditClick} className="option-button">
            <img src={editIcon} alt="edit-icon" className="option-icon" />{" "}
            Редактировать
          </button>
          <button onClick={handleDeleteClick} className="option-button">
            <img src={deleteIcon} alt="delete-icon" className="option-icon" />{" "}
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default BranchItem;
