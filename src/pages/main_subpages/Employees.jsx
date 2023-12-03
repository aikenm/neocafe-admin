import React, { useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import EmployeeItemModal from "../../components/employees/EmployeeItemModal";
import DeleteModal from "../../components/DeleteModal";
import EmployeeItem from "../../components/employees/EmployeeItem";
import Pagination from "../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../../store/employeeSlice";
import "../../styles/pages/subpages/employees/employees.css";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const branches = useSelector((state) => state.branch.branches);
  const [modalOpen, setModalOpen] = useState(false);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  const handleEmployeesSearch = (searchTerm) => {
    // Implement search logic
  };

  const handleCreateNewEmployee = () => {
    setEditableEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditableEmployee(employee);
    setModalOpen(true);
  };

  const handleDeleteInitiated = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteEmployee(employeeToDelete));
    setIsDeleteModalOpen(false);
  };

  const handleEmployeeSubmit = (employeeData) => {
    if (editableEmployee) {
      dispatch(editEmployee({ ...editableEmployee, ...employeeData }));
    } else {
      dispatch(addEmployee({ id: Date.now(), ...employeeData }));
    }
    setModalOpen(false);
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div className="employees-container">
      <ContentHeader
        title="Сотрудники"
        onSearch={handleEmployeesSearch}
        onCreate={handleCreateNewEmployee}
      />
      <div className="employees-content">
        <div className="employees-content-header">
          <span className="employees-content-header-subtitle employee-id">
            №
          </span>
          <span className="employees-content-header-subtitle employee-name">
            Имя
          </span>
          <span className="employees-content-header-subtitle employee-position">
            Должность
          </span>
          <span className="employees-content-header-subtitle employee-branch">
            Выберите филиал
          </span>
          <span className="employees-content-header-subtitle employee-phone">
            Телефон
          </span>
          <span className="employees-content-header-subtitle employee-schedule">
            График работы
          </span>
          <span className="employees-content-header-subtitle employee-edit">
            Ред.
          </span>
        </div>
        {currentEmployees.map((employee, index) => (
          <EmployeeItem
            key={employee.id}
            employee={employee}
            branches={branches}
            index={index + indexOfFirstEmployee}
            onEdit={() => handleEditEmployee(employee)}
            onDelete={() => handleDeleteInitiated(employee.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(employees.length / employeesPerPage)}
        paginate={setCurrentPage}
      />
      <EmployeeItemModal
        isOpen={modalOpen}
        toggleModal={() => setModalOpen(false)}
        editable={editableEmployee}
        onSubmit={handleEmployeeSubmit}
      />
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          message="Вы уверены, что хотите удалить этого сотрудника?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Employees;
