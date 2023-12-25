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

  //FIX IT
  const [imageBlob, setImageBlob] = useState(null);

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
      setSelectedImageFile(file);

      //FIX IT
      setImageBlob(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
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

  const dayMappings = {
    Понедельник: "monday",
    Вторник: "tuesday",
    Среда: "wednesday",
    Четверг: "thursday",
    Пятница: "friday",
    Суббота: "saturday",
    Воскресенье: "sunday",
  };

  //FIX it

  useEffect(() => {
    if (
      isOpen &&
      editable &&
      editable.image &&
      !selectedImageFile &&
      !imageBlob
    ) {
      fetch(editable.image)
        .then((response) => response.blob())
        .then((blob) => {
          setImageBlob(blob); // Store the fetched Blob
          setSelectedImage(URL.createObjectURL(blob));
        })
        .catch((error) => console.error("Error fetching image:", error));
    }
  }, [isOpen, editable, selectedImageFile, imageBlob]);

  const onSubmit = async (data) => {
    const accessToken = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone);
    formData.append("map_link", data.link);

    Object.entries(data.workingHours).forEach(([day, values]) => {
      const dayEnglish = dayMappings[day];
      formData.append(dayEnglish, values.enabled);
      if (values.enabled) {
        formData.append(`${dayEnglish}_start_time`, values.from);
        formData.append(`${dayEnglish}_end_time`, values.to);
      }
    });

    //FIX IT

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    } else if (imageBlob) {
      formData.append("image", imageBlob, "image.jpg");
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
      setSelectedImage(editable.image || null);
      setSelectedImageFile(null);
      setValue("name", editable.name || "");
      setValue("address", editable.address || "");
      setValue("phone", editable.phone_number || "");
      setValue("link", editable.map_link || "");

      Object.keys(dayMappings).forEach((russianDay) => {
        const englishDay = dayMappings[russianDay];
        const isEnabled = editable[englishDay];
        const fromTime =
          isEnabled && editable[`${englishDay}_start_time`]
            ? editable[`${englishDay}_start_time`].substring(0, 5)
            : defaultWorkingHours[russianDay].from;
        const toTime =
          isEnabled && editable[`${englishDay}_end_time`]
            ? editable[`${englishDay}_end_time`].substring(0, 5)
            : defaultWorkingHours[russianDay].to;

        setValue(`workingHours.${russianDay}.enabled`, isEnabled);
        setValue(`workingHours.${russianDay}.from`, fromTime);
        setValue(`workingHours.${russianDay}.to`, toTime);
      });
    } else {
      reset({
        name: "",
        address: "",
        phone: "",
        link: "",
        image: null,
        workingHours: defaultWorkingHours,
      });
      setSelectedImage(null);
      setSelectedImageFile(null);
    }
  }, [isOpen, editable, reset, setValue]);

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
