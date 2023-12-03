import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { addEmployee, editEmployee } from "../../store/employeeSlice";
import CloseIcon from "../../images/close-icon.svg";
import "../../styles/components/employees/employee_modal.css";

const defaultWorkingHours = {
  Понедельник: { enabled: false, from: "11:00", to: "22:00" },
  Вторник: { enabled: false, from: "11:00", to: "22:00" },
  Среда: { enabled: false, from: "11:00", to: "22:00" },
  Четверг: { enabled: false, from: "11:00", to: "22:00" },
  Пятница: { enabled: false, from: "11:00", to: "22:00" },
  Суббота: { enabled: false, from: "08:00", to: "17:00" },
  Воскресенье: { enabled: false, from: "08:00", to: "17:00" },
};

const EmployeeItemModal = ({ isOpen, toggleModal, editable }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);
  const employees = useSelector((state) => state.employee.employees);
  const isEditMode = editable != null;
  const daysOfWeek = Object.keys(defaultWorkingHours);

  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: isEditMode
      ? editable
      : {
          login: "",
          password: "",
          name: "",
          role: "",
          dob: "",
          phone: "",
          branch: "",
          workingHours: defaultWorkingHours,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workingHours",
  });

  const workingHours = watch("workingHours");

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(editEmployee({ ...data, id: editable.id }));
      const updatedEmployees = employees.map((emp) =>
        emp.id === editable.id ? { ...data, id: editable.id } : emp
      );
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    } else {
      const newEmployee = { ...data, id: Date.now() };
      dispatch(addEmployee(newEmployee));
      const updatedEmployees = [...employees, newEmployee];
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }
    toggleModal();
    reset();
  };

  const handleCloseModal = () => {
    reset();
    toggleModal();
  };

  useEffect(() => {
    if (isOpen && editable) {
      setValue("login", editable.login);
      setValue("password", editable.password);
      setValue("name", editable.name);
      setValue("role", editable.role);
      setValue("dob", editable.dob);
      setValue("phone", editable.phone);
      setValue("branch", editable.branch);

      Object.keys(defaultWorkingHours).forEach((day) => {
        setValue(
          `workingHours.${day}.enabled`,
          editable.workingHours[day].enabled
        );
        setValue(`workingHours.${day}.from`, editable.workingHours[day].from);
        setValue(`workingHours.${day}.to`, editable.workingHours[day].to);
      });
    } else {
      reset({
        login: "",
        password: "",
        name: "",
        role: "",
        dob: "",
        phone: "",
        branch: "",
        workingHours: defaultWorkingHours,
      });
    }
  }, [isOpen, editable, setValue, reset]);

  if (!isOpen) return null;

  return (
    <div className="employee-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="employee-modal-content">
          <div className="modal-header">
            <h2 className="modal-title">
              {editable ? "Редактирование сотрудника" : "Новый сотрудник"}
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
            <div className="employee-info">
              <h3 className="employee-section-title">Личные данные</h3>
              <span className="input-title">Логин</span>
              <input
                {...register("login")}
                placeholder="Придумайте логин"
                className="input-field"
              />
              <span className="input-title">Пароль</span>
              <input
                {...register("password")}
                placeholder="Придумайте пароль"
                className="input-field"
                type="password"
              />
              <span className="input-title">Имя</span>
              <input
                {...register("name")}
                placeholder="Как зовут сотрудника"
                className="input-field"
              />
              <span className="input-title">Должность</span>
              <select {...register("role")} className="input-field">
                <option value="" disabled selected>
                  Выберите должность
                </option>
                <option value="Бариста">Бариста</option>
                <option value="Официант">Официант</option>
              </select>
              <span className="input-title">Дата рождения</span>
              <input {...register("dob")} type="date" className="input-field" />
              <span className="input-title">Номер телефона</span>
              <input
                {...register("phone")}
                placeholder="Введите номер телефона"
                className="input-field"
              />
              <span className="input-title">Филиал</span>
              <select {...register("branch")} className="input-field">
                <option value="" disabled selected>
                  Выберите филиал
                </option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
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
                        disabled={!watch(`workingHours.${day}`)?.enabled}
                        className="working-hours"
                      />
                      <span> - </span>
                      <input
                        type="text"
                        defaultValue="22:00"
                        {...register(`workingHours.${day}.to`)}
                        disabled={!watch(`workingHours.${day}`)?.enabled}
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

export default EmployeeItemModal;
