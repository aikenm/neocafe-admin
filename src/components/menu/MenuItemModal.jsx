import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { addItem, editItem } from '../../store/menuSlice';
import CloseIcon from '../../images/close-icon.svg';
import ImageIcon from '../../images/image-input.svg';
import '../../styles/components/menu/menu_modal.css';

const MenuItemModal = ({ isOpen, toggleModal, editable }) => {
    const dispatch = useDispatch();
    const isEditMode = editable != null; 
    
    const { register, handleSubmit, control, reset, setValue } = useForm({
        defaultValues: isEditMode ? editable : {
          name: '',
          description: '',
          category: '',
          price: '',
          ingredients: [{ id: Date.now(), name: '', amount: '', unit: 'г' }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
            setValue('image', e.target.files[0]);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            setSelectedImage(URL.createObjectURL(files[0]));
            setValue('image', files[0]);
        }
    };

    const onSubmit = (data) => {
        const formData = {
            ...data,
            image: selectedImage, 
        };
    
        if (isEditMode) {
            dispatch(editItem({ ...formData, id: editable.id }));
        } else {
            dispatch(addItem({ ...formData, id: Date.now() }));
        }
        toggleModal();
        reset();
        setSelectedImage(null);
    };
       
    
    const handleCloseModal = () => {
        reset();
        toggleModal();
    };

    useEffect(() => {
        if (isOpen && editable && editable.image) {
            setSelectedImage(editable.image);
        } else {
            setSelectedImage(null);
        }
    }, [isOpen, editable]);

    if (!isOpen) return null;
    
    return (
        <div className="modal">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className='modal-title'>Новая позиция</h2>
                        <button type="button" className="close-button" onClick={handleCloseModal}>
                            <img src={CloseIcon} alt='close-icon' />
                        </button>
                    </div>
                    <div className="modal-body">
                        <h3 className='section-title'>Добавьте фотографию к позиции</h3>
                        <div className="image-input-wrapper" onDrop={onDrop} onDragOver={(e) => e.preventDefault()}>
                            <div className='image-input-block'>
                                {selectedImage ? (
                                    <img src={selectedImage} alt='Uploaded' className='uploaded-image' />
                                ) : (
                                    <img src={ImageIcon} alt='upload-icon' className='image-input-icon' />
                                )}
                                <input type="file" id="image-upload" className='image-input' {...register('image')} onChange={handleImageChange}/>
                                <span className='image-input-text'>Перетащите изображение для добавления или <label htmlFor="image-upload" className='view-button'>обзор</label></span>
                            </div>
                        </div>

                        <h3 className='section-title'>Наименование, категория и стоимость</h3>

                        <span className='input-title'>Наименование</span>
                        <input {...register('name')} placeholder="Введите название новой позиции" className='input-field'/>
                        <span className='input-title'>Описание</span>
                        <textarea {...register('description')} placeholder="Введите описание" className='input-field description-field'/>
                        
                        <div className='inline-input-wrapper'>
                            <div className='inline-input-group'>
                                <span className='input-title'>Категория</span>
                                <select {...register('category')}  className='input-field'>
                                    <option value="Закуска">Закуска</option>
                                    <option value="Основное блюдо">Основное блюдо</option>
                                    <option value="Десерт">Десерт</option>
                                </select>
                            </div>
                            <div className='inline-input-group'>
                                <span className='input-title'>Стоимость</span>
                                <input {...register('price', { valueAsNumber: true })} placeholder="Введите стоимость" type="number" className='input-field'/>
                            </div>
                        </div>

                        <h3 className='section-title'>Состав блюда и граммовка</h3>
                        
                        {fields.map((field, index) => (
                            <div key={field.id} className="inline-input-wrapper">
                                <button type="button" onClick={() => remove(index)} className='ingredients-remove-button'>
                                    <img src={CloseIcon} alt='remove-icon' className='ingredients-close-icon'/>
                                </button>
                                <div className='inline-input-group'>
                                    <span className='input-title'>Наименование</span>
                                    <input {...register(`ingredients[${index}].name`)} placeholder="Ингредиент" className='input-field'/>
                                </div>
                                <div className='inline-input-group amount-unit-group'>
                                    <div className='amount-input-wrapper'>
                                        <span className='input-title'>Кол-во (в гр, мл, л, кг)</span>
                                        <input {...register(`ingredients[${index}].amount`)} placeholder="Количество" type="number" className='input-field'/>
                                    </div>
                                    <div className='unit-input-wrapper'>
                                        <select {...register(`ingredients[${index}].unit`)} className='input-field'>
                                            <option value="г">г</option>
                                            <option value="мл">мл</option>
                                            <option value="шт">шт</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => append({ id: Date.now(), name: '', amount: '', unit: 'г' })} className='add-more-button button'>
                            Добавить еще <span className='plus-sign'>+</span>
                        </button>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-button button" onClick={handleCloseModal}>Отмена</button>
                        <button type="submit" className="save-button button">{isEditMode ? 'Сохранить' : 'Создать'}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MenuItemModal;
