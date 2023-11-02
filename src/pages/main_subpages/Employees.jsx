import React from 'react';
import ContentHeader from '../../components/ContentHeader';

const Employees = () => {
    const handleEmployeesSearch = (searchTerm) => {
       
    };

  return (
    <div className="employees-container">
      <ContentHeader title="Сотрудники" onSearch={handleEmployeesSearch} />
      <div className="employees-content">

      </div>
    </div>
  );
};

export default Employees;