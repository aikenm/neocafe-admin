import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { addBranch, editBranch } from "../../store/branchSlice";
import CloseIcon from "../../images/close-icon.svg";
import ImageIcon from "../../images/image-input.svg";
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

const BranchItemModal = ({ isOpen, toggleModal, editable }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const isEditMode = editable != null;
  const daysOfWeek = Object.keys(defaultWorkingHours);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: isEditMode
      ? editable
      : {
          name: "",
          address: "",
          phone: "",
          link: "",
          image: null,
          workingHours: defaultWorkingHours,
        },
  });

  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  const [selectedImage, setSelectedImage] = useState(
    isEditMode ? editable.image : null
  );

  const workingHours = watch("workingHours");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file); // Set file object for upload

      // Read the file as a data URL to use as the image source
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Update the state with the image data URL
      };
      reader.readAsDataURL(file);
    }
  };

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

  const onSubmit = (data) => {
    const accessToken = localStorage.getItem("token");
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone);
    formData.append("map_link", data.link);

    // Append working hours
    daysOfWeek.forEach((day) => {
      const dayLowerCase = day.toLowerCase();
      formData.append(`${dayLowerCase}`, data.workingHours[day].enabled);
      formData.append(
        `${dayLowerCase}_start_time`,
        data.workingHours[day].from
      );
      formData.append(`${dayLowerCase}_end_time`, data.workingHours[day].to);
    });

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const url = `https://neo-cafe.org.kg/api-admin/branches/${
      isEditMode ? `${editable.id}/` : ""
    }`;
    const method = isEditMode ? "put" : "post";
    const headers = {
      accept: "application/json",
      "X-CSRFToken":
        "o8Y7VxZuP0yLg0cu3nfFR3UBxa0hsqCyVtNeMnSl7M6OCcij2OZl8rqoJ5j0a70Q",
      Authorization: `Bearer ${accessToken}`,
    };

    axios({ url, method, headers, data: formData })
      .then((response) => {
        if (isEditMode) {
          dispatch(editBranch({ ...response.data, id: editable.id }));
        } else {
          dispatch(addBranch({ ...response.data, id: Date.now() }));
        }

        toggleModal();
        reset();
        setSelectedImage(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  useEffect(() => {
    if (isOpen && editable) {
      setSelectedImage(editable.image);
      setValue("image", editable.image);
      setValue("name", editable.name);
      setValue("address", editable.address);
      setValue("phone", editable.phone);
      setValue("link", editable.link);

      Object.keys(defaultWorkingHours).forEach((day) => {
        setValue(
          `workingHours.${day}.enabled`,
          editable.workingHours[day].enabled
        );
        setValue(`workingHours.${day}.from`, editable.workingHours[day].from);
        setValue(`workingHours.${day}.to`, editable.workingHours[day].to);
      });
    } else {
      setSelectedImage(null);
      setValue("image", null);

      reset({
        name: "",
        address: "",
        phone: "",
        link: "",
        image: null,
        workingHours: defaultWorkingHours,
      });
    }
  }, [isOpen, editable, setValue, reset]);

  if (!isOpen) return null;

  return (
    <div className="branches-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="branches-uploaded-image"
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
                        {...register(`workingHours.${day}.from`)}
                        className="working-hours"
                        disabled={!watch(`workingHours.${day}.enabled`)}
                      />
                      <span> - </span>
                      <input
                        type="text"
                        {...register(`workingHours.${day}.to`)}
                        className="working-hours"
                        disabled={!watch(`workingHours.${day}.enabled`)}
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
