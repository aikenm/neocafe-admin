import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addStockItem, editStockItem } from "../../store/stockSlice";
import CloseIcon from "../../images/close-icon.svg";
import "../../styles/components/stock/stock_modal.css";

const StockItemModal = ({ isOpen, toggleModal, editable, selectedStock }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (editable) {
      dispatch(
        editStockItem({ ...data, id: editable.id, stockId: selectedStock })
      );
    } else {
      dispatch(addStockItem({ ...data, stockId: selectedStock }));
    }
    toggleModal();
  };

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  useEffect(() => {
    if (!editable && isOpen) {
      reset({
        name: "",
        category: "",
        amount: "",
        unit: "г",
        limit: "",
        arrival_date: "",
        stockId: selectedStock,
      });
    } else if (editable && isOpen) {
      reset({
        name: editable.name,
        category: editable.category,
        amount: editable.amount,
        unit: editable.unit,
        limit: editable.limit,
        arrival_date: editable.arrival_date,
        stockId: editable.stockId || selectedStock,
      });
    }
  }, [editable, isOpen, reset, selectedStock]);

  if (!isOpen) return null;

  return (
    <div className="stock-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="stock-modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {editable ? "Редактирование" : "Новая продукция"}
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
            <h3 className="section-title">
              Наименование, категория и количество
            </h3>
            <span className="input-title">Наименование</span>
            <input
              {...register("name")}
              placeholder="Введите название"
              className="input-field"
            />
            <div className="inline-input-wrapper">
              <div className="inline-input-group">
                <span className="input-title">Категория</span>
                <select {...register("category")} className="input-field">
                  <option value="">Выберите категорию</option>
                  <option value="ready_products">Готовая продукция</option>
                  <option value="raw_materials">Сырье</option>
                </select>
              </div>
              <div className="inline-input-group amount-unit-group">
                <div className="amount-input-wrapper">
                  <span className="input-title">Кол-во (в гр, мл, л, кг)</span>
                  <input
                    {...register("amount", { valueAsNumber: true })}
                    placeholder="Количество"
                    type="number"
                    className="input-field"
                  />
                </div>
                <div className="unit-input-wrapper">
                  <select {...register("unit")} className="input-field">
                    <option value="г">г</option>
                    <option value="кг">кг</option>
                    <option value="мл">мл</option>
                    <option value="л">л</option>
                    <option value="шт">шт</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="inline-input-wrapper">
              <div className="inline-input-group">
                <span className="input-title">Минимальный лимит</span>
                <input
                  {...register("limit", { valueAsNumber: true })}
                  placeholder="Например: 2кг"
                  type="number"
                  className="input-field"
                />
              </div>
              <div className="inline-input-group">
                <span className="input-title">Дата прихода</span>
                <input
                  {...register("arrival_date")}
                  type="date"
                  placeholder="Arrival Date"
                  className="input-field"
                />
              </div>
            </div>
          </div>
          <div className="stock-actions">
            <button
              type="button"
              className="cancel-button button"
              onClick={handleCloseModal}
            >
              Отмена
            </button>
            <button type="submit" className="save-button button">
              {editable ? "Сохранить" : "Создать"}
            </button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockItemModal;
