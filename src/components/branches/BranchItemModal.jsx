import React, { useState, useEffect } from "react";
import CloseIcon from "../../images/close-icon.svg";
import ImageIcon from "../../images/image-input.svg";
import { useForm } from "react-hook-form";
import "../../styles/components/branches/branches_modal.css";

const defaultWorkingHours = {
  Понедельник: { enabled: false, from: "11:00", to: "22:00" },
  Вторник: { enabled: false, from: "11:00", to: "22:00" },
  Среда: { enabled: false, from: "11:00", to: "22:00" },
  Четверг: { enabled: false, from: "11:00", to: "22:00" },
  Пятница: { enabled: false, from: "11:00", to: "22:00" },
  Суббота: { enabled: false, from: "08:00", to: "17:00" },
  Воскресенье: { enabled: false, from: "08:00", to: "17:00" },
};

const BranchItemModal = ({ isOpen, toggleModal, editable, onSubmit }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: defaultWorkingHours,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const daysOfWeek = Object.keys(defaultWorkingHours);

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toggleModal();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setValue("image", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  //localstorage temp
  const onDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setValue("image", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editable) {
      reset(editable);
      setSelectedImage(editable.imageUrl);
    } else {
      reset(defaultWorkingHours);
      setSelectedImage(null);
    }
  }, [editable, reset]);

  if (!isOpen) return null;

  return (
    <div className="branches-modal">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="branches-modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {editable ? "Редактирование" : "Новая позиция"}
            </h2>
            <button
              type="button"
              className="close-button"
              onClick={handleCloseModal}
            >
              <img src={CloseIcon} alt="close-icon" />
            </button>
          </div>
          <div className="modal-body">
            <h3 className="section-title">Добавьте фотографию филиала</h3>
            <div
              className="image-input-wrapper"
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="image-input-block">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="uploaded-image"
                  />
                ) : (
                  <img
                    src={ImageIcon}
                    alt="upload-icon"
                    className="image-input-icon"
                  />
                )}
                <input
                  type="file"
                  id="image-upload"
                  className="image-input"
                  {...register("image")}
                  onChange={handleImageChange}
                />
                <span className="image-input-text">
                  Перетащите изображение для добавления или{" "}
                  <label htmlFor="image-upload" className="view-button">
                    обзор
                  </label>
                </span>
              </div>
            </div>
            <div className="branch-info">
              <h3 className="branches-section-title">Название и адрес</h3>
              <span className="input-title">Название кофейни</span>
              <input
                {...register("name")}
                placeholder="Название филиала"
                className="input-field"
              />
              <span className="input-title">Адрес</span>
              <input
                {...register("address")}
                placeholder="Адрес нового филиала"
                className="input-field"
              />
              <span className="input-title">Номер телефона</span>
              <input
                {...register("phone")}
                placeholder="Введите номер телефона"
                className="input-field"
              />
              <span className="input-title">Ссылка на 2ГИС</span>
              <input
                {...register("link")}
                placeholder="Вставьте ссылку на 2ГИС"
                className="input-field"
              />
            </div>
            <div className="schedule-info">
              <h3 className="branches-section-title">
                Заполните график работы
              </h3>
              <div className="schedule-title-wrapper">
                <span className="schedule-title">День недели</span>
                <span className="schedule-title">Время работы</span>
              </div>
              <div className="schedule-wrapper">
                {daysOfWeek.map((day) => (
                  <div key={day} className="day-time-input">
                    <div className="schedule-days">
                      <input
                        type="checkbox"
                        {...register(`workingHours.${day}.enabled`)}
                        className="working-hours-checkbox"
                        id={`checkbox-${day}`}
                      />
                      <label
                        htmlFor={`checkbox-${day}`}
                        className="working-days"
                      >
                        {day}
                      </label>
                    </div>
                    <div className="schedule-hours">
                      <input
                        type="text"
                        defaultValue="11:00"
                        {...register(`workingHours.${day}.from`)}
                        disabled={!watch(`workingHours.${day}.enabled`)}
                        className="working-hours"
                      />
                      <span> - </span>
                      <input
                        type="text"
                        defaultValue="22:00"
                        {...register(`workingHours.${day}.to`)}
                        disabled={!watch(`workingHours.${day}.enabled`)}
                        className="working-hours"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button button"
              onClick={handleCloseModal}
            >
              Отмена
            </button>
            <button type="submit" className="save-button button">
              {editable ? "Сохранить" : "Создать"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BranchItemModal;
