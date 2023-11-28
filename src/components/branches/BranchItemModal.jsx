import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const BranchItemModal = ({ isOpen, toggleModal, editable }) => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  // Handle image upload
  const handleImageChange = (e) => {
    // Implement the image change logic
  };

  const onSubmit = (data) => {
    // Handle form submission
    toggleModal();
    reset();
  };

  useEffect(() => {
    if (editable) {
      // Set form values for editing
      reset(editable);
      setSelectedImage(editable.imageUrl);
    } else {
      reset();
      setSelectedImage(null);
    }
  }, [editable, reset]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <h2 className='modal-title'>{editable ? 'Редактирование' : 'Новый филиал'}</h2>
          <h3 className='section-title'>Информация о филиале</h3>
          <div className="branch-info">
            <div className="image-upload">
            </div>
            <input {...register('name')} placeholder="Название кофейни" />
            <input {...register('address')} placeholder="Адрес" />
            <input {...register('phone')} placeholder="Телефон" />
            <input {...register('link')} placeholder="Ссылка на 2GIS" />
          </div>
          <h3 className='section-title'>График работы</h3>
          <div className="working-hours">
            {daysOfWeek.map(day => (
              <div key={day}>
                <label>
                  <input type="checkbox" {...register(`workingHours.${day}.enabled`)} />
                  {day}
                </label>
                <input type="time" {...register(`workingHours.${day}.from`)} />
                <input type="time" {...register(`workingHours.${day}.to`)} />
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={toggleModal}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BranchItemModal;
