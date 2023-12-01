import React from "react";
import "../styles/components/delete_modal.css";
import CloseIcon from "../images/close-icon.svg";

const DeleteModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleCloseModal = () => {
    onCancel();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <button
          type="button"
          className="delete-close-button"
          onClick={handleCloseModal}
        >
          <img src={CloseIcon} alt="close-icon" />
        </button>
        <h3 className="delete-title">Удаление</h3>
        <p className="delete-message">{message}</p>
        <div className="delete-actions">
          <button onClick={onCancel} className="cancel-btn button">
            Нет
          </button>
          <button onClick={onConfirm} className="confirm-btn button">
            Да
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
