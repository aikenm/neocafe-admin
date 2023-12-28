import React, { useState, useEffect } from "react";
import axios from "axios";
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
  initializeEmployees,
} from "../../store/employeeSlice";
import { initializeBranches } from "../../store/branchSlice";
import dropClosed from "../../images/down-closed.svg";
import dropOpen from "../../images/drop-down-open.svg";
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

  const [searchTerm, setSearchTerm] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [displayedBranchName, setDisplayedBranchName] =
    useState("Выберите филиал");

  const handleEmployeesSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBranchSelect = (branchName) => {
    const selectedBranch = branches.find((b) => b.name === branchName);
    if (selectedBranch) {
      setSelectedBranch(String(selectedBranch.id));
      setDisplayedBranchName(selectedBranch.name);
    } else {
      setSelectedBranch("all");
      setDisplayedBranchName("Выберите филиал");
    }
    setIsDropdownOpen(false);
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

  const filteredEmployees = employees.filter((employee) => {
    const matchesName = searchTerm
      ? employee.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      : true;
    const matchesBranch =
      selectedBranch === "all" ? true : employee.branch === selectedBranch;
    return matchesName && matchesBranch;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const url = "https://neo-cafe.org.kg/api-admin/staff/profile/";

    axios
      .get(url, {
        headers: {
          accept: "application/json",
          "X-CSRFToken":
            "6Yw1nXu0fhgyfM1tWUdSBvRIktAGGbMFF4f3QuXDgzSedNsGZryhlDXmzmoBgVAH",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(initializeEmployees(response.data));
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [dispatch]);

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
          <span
            className={`employees-content-header-subtitle employee-branch ${
              isDropdownOpen ? "branch-open" : "branch-closed"
            }`}
            onClick={toggleDropdown}
          >
            {displayedBranchName}
            <img
              src={isDropdownOpen ? dropOpen : dropClosed}
              alt="drop-down"
              className="drop-down-icon"
            />
            {isDropdownOpen && (
              <div
                className={`branch-dropdown ${
                  branches.length > 6 ? "branch-dropdown-scrollable" : ""
                }`}
              >
                <div className="branches-wrapper">
                  <span
                    onClick={() => handleBranchSelect("all")}
                    className="branch-option"
                  >
                    Все
                  </span>
                </div>
                {branches.map((branch) => (
                  <div key={branch.id} className="branches-wrapper">
                    <span
                      onClick={() => handleBranchSelect(branch.name)}
                      className="branch-option"
                    >
                      {branch.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
        {currentEmployees.length > 0 ? (
          currentEmployees.map((employee, index) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              branches={branches}
              index={index + indexOfFirstEmployee}
              onEdit={() => handleEditEmployee(employee)}
              onDelete={() => handleDeleteInitiated(employee.id)}
            />
          ))
        ) : (
          <div className="no-results-message">Нет сотрудников</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
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
