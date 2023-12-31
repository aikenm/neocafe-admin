import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { addStockItem, editStockItem } from "../../store/stockSlice";
import CloseIcon from "../../images/close-icon.svg";
import "../../styles/components/stock/stock_modal.css";

const unitMapping = {
  г: "g",
  кг: "kg",
  мл: "ml",
  л: "l",
  шт: "unit",
};

const StockItemModal = ({ isOpen, toggleModal, editable, selectedStock }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const accessToken = localStorage.getItem("token");
    let apiURL;
    let method;

    const productData = {
      name: data.name,
      quantity: data.amount,
      quantity_unit: unitMapping[data.unit],
      limit: data.minLimit,
      arrival_date: data.arrivalDate,
      category: data.category,
      is_running_out: false,
      branch: selectedStock,
    };

    if (editable) {
      apiURL = `https://neo-cafe.org.kg/api-warehouse/branches/${selectedStock}/inventory/${editable.id}/`;
      method = "put";
    } else {
      apiURL = `https://neo-cafe.org.kg/api-warehouse/branches/${selectedStock}/inventory/`;
      method = "post";
    }

    try {
      const response = await axios({
        url: apiURL,
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken":
            "ygaH6CEm6tTWguqyoThAD00REjRVbV7R7mTJz97Z7LvCevRLrqCZn86vTcFQLFVT",
          Authorization: `Bearer ${accessToken}`,
        },
        data: JSON.stringify(productData),
      });

      if (editable) {
        dispatch(editStockItem({ ...response.data, id: editable.id }));
      } else {
        dispatch(addStockItem(response.data));
      }

      toggleModal();
    } catch (error) {
      console.error("Error in operation:", error);
    }
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
        minLimit: "",
        arrivalDate: "",
        stockId: selectedStock,
      });
    }
  }, [editable, isOpen, reset, selectedStock]);

  useEffect(() => {
    if (editable && isOpen) {
      reset({
        ...editable,
        // Assuming 'editable' contains the correct category
        category: editable.category,
        amount: editable.quantity,
        unit:
          Object.keys(unitMapping).find(
            (key) => unitMapping[key] === editable.quantity_unit
          ) || "",
        minLimit: editable.limit,
        arrivalDate: editable.arrival_date,
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
                    <option value="г">кг</option>
                    <option value="мл">мл</option>
                    <option value="мл">л</option>
                    <option value="шт">шт</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="inline-input-wrapper">
              <div className="inline-input-group">
                <span className="input-title">Минимальный лимит</span>
                <input
                  {...register("minLimit", { valueAsNumber: true })}
                  placeholder="Например: 2кг"
                  type="number"
                  className="input-field"
                />
              </div>
              <div className="inline-input-group">
                <span className="input-title">Дата прихода</span>
                <input
                  {...register("arrivalDate")}
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
