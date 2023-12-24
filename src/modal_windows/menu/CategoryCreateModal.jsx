import React, { useState } from "react";
import ImageIcon from "../../images/image-input.svg";
import { useDispatch } from "react-redux";
import "../../styles/modal_windows/category_create.css";
import CloseIcon from "../../images/close-icon.svg";
import { addCategory } from "../../store/menuSlice";
import axios from "axios";

const CategoryCreateModal = ({ isOpen, toggleModal, onCreate }) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const accessToken = localStorage.getItem("token");

    axios
      .post("https://neo-cafe.org.kg/api-admin/category/", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // Assuming response.data contains the new category
        const newCategory = response.data;

        // Dispatch an action to update the Redux state
        dispatch(addCategory(newCategory));

        // Reset the form and close the modal
        setCategoryName("");
        setSelectedImage(null);
        setImageFile(null);
        toggleModal();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="category-modal">
      <div className="category-modal-content">
        <button
          type="button"
          className="delete-close-button"
          onClick={toggleModal}
        >
          <img src={CloseIcon} alt="close-icon" />
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="category-title">Новая категория</h2>
          <div className="form-group">
            <h3 className="category-subtitle">
              Добавьте изображение к категории
            </h3>
            <div
              className="image-input-wrapper"
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="image-input-block">
                {/* <img src={selectedImage || ImageIcon} alt='Uploaded' className='uploaded-image' /> */}
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
                  onChange={handleImageChange}
                  aria-required
                />
                <span className="image-input-text">
                  Перетащите изображение для добавления или{" "}
                  <label
                    htmlFor="image-upload"
                    className="category-view-button"
                  >
                    обзор
                  </label>
                </span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <h3 className="category-subtitle">Наименование</h3>
            <span className="input-title">Наименование</span>
            <input
              type="text"
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="input-field"
              placeholder="Введите название категории"
            />
          </div>
          <div className="category-actions">
            <button
              type="button"
              onClick={toggleModal}
              className="cancel-btn button"
            >
              Отмена
            </button>
            <button type="submit" className="confirm-btn button">
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryCreateModal;
