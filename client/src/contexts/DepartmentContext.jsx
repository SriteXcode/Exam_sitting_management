
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const DepartmentContext = createContext(null);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    const response = await API.get('/departments');
    setDepartments(response.data);
  };

  const addDepartment = async (name) => {
    const response = await API.post('/departments', { name });
    setDepartments([...departments, response.data]);
  };

  const updateDepartment = async (id, name) => {
    const response = await API.put(`/departments/${id}`, { name });
    setDepartments(
      departments.map((d) => (d._id === id ? response.data : d))
    );
  };

  const deleteDepartment = async (id) => {
    await API.delete(`/departments/${id}`);
    setDepartments(departments.filter((d) => d._id !== id));
  };

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        fetchDepartments,
        addDepartment,
        updateDepartment,
        deleteDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartments = () => useContext(DepartmentContext);
