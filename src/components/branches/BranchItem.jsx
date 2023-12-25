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
      { day: "monday", label: "Пн" },
      { day: "tuesday", label: "Вт" },
      { day: "wednesday", label: "Ср" },
      { day: "thursday", label: "Чт" },
      { day: "friday", label: "Пт" },
      { day: "saturday", label: "Сб" },
      { day: "sunday", label: "Вс" },
    ];

    const schedule = daysOfWeek.reduce((acc, { day, label }) => {
      const isOpen = branch[day];
      const startTime = branch[`${day}_start_time`]?.slice(0, 5);
      const endTime = branch[`${day}_end_time`]?.slice(0, 5);

      if (isOpen) {
        acc[label] = `${startTime} до ${endTime}`;
      } else {
        acc[label] = "Выходной";
      }

      return acc;
    }, {});

    let summary = [];
    daysOfWeek.forEach(({ label }, index) => {
      if (
        schedule[label] !== "Выходной" &&
        (!summary.length ||
          summary[summary.length - 1].hours !== schedule[label])
      ) {
        summary.push({ days: [label], hours: schedule[label] });
      } else if (schedule[label] !== "Выходной") {
        summary[summary.length - 1].days.push(label);
      }
    });

    let formattedHours = summary
      .map((item) => {
        const days = item.days.join("-");
        return `${days} с ${item.hours}`;
      })
      .join(", ");

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
