import React, { useState } from 'react';

const CategoryCreateModal = ({ isOpen, toggleModal, onCreate }) => {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ 
            id: Date.now(), 
            name: categoryName, 
            image: image 
        });
        setCategoryName('');
        setImage(null);
        toggleModal();
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleModal}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <h2>Создать новую категорию</h2>
                    <div className="form-group">
                        <label htmlFor="category-name">Название категории:</label>
                        <input 
                            type="text" 
                            id="category-name" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category-image">Изображение категории:</label>
                        <input 
                            type="file" 
                            id="category-image" 
                            onChange={handleImageChange} 
                            required 
                        />
                    </div>
                    <button type="submit">Создать</button>
                    <button type="button" onClick={toggleModal}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default CategoryCreateModal;
