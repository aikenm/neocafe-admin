import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const defaultWorkingHours = {
  'Понедельник': { enabled: false, from: '11:00', to: '22:00' },
  'Вторник': { enabled: false, from: '11:00', to: '22:00' },
  'Среда': { enabled: false, from: '11:00', to: '22:00' },
  'Четверг': { enabled: false, from: '11:00', to: '22:00' },
  'Пятница': { enabled: false, from: '11:00', to: '22:00' },
  'Суббота': { enabled: false, from: '08:00', to: '17:00' },
  'Воскресенье': { enabled: false, from: '08:00', to: '17:00' },
};

const BranchItemModal = ({ isOpen, toggleModal, editable, onSubmit }) => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: defaultWorkingHours
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const daysOfWeek = Object.keys(defaultWorkingHours);

  useEffect(() => {
    if (editable) {
      reset(editable);
      setSelectedImage(editable.imageUrl);
    } else {
      reset(defaultWorkingHours);
      setSelectedImage(null);
    }
  }, [editable, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toggleModal();
  };

  if (!isOpen) return null;

    return (
        <div className="branches-modal">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="branches-modal-content">
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
                            <div key={day} className="day-time-input">
                                <label>
                                    <input type="checkbox" {...register(`workingHours.${day}.enabled`)} />
                                    {day}
                                </label>
                                <input type="time" defaultValue="11:00" {...register(`workingHours.${day}.from`)} disabled={!watch(`workingHours.${day}.enabled`)} />
                                <span> - </span>
                                <input type="time" defaultValue="22:00" {...register(`workingHours.${day}.to`)} disabled={!watch(`workingHours.${day}.enabled`)} />
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
