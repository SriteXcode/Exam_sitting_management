
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import API from '../services/api';

// const DepartmentContext = createContext(null);

// export const DepartmentProvider = ({ children }) => {
//   const [departments, setDepartments] = useState([]);

//   const fetchDepartments = async () => {
//     const response = await API.get('/departments');
//     setDepartments(response.data);
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const addDepartment = async (name) => {
//     await API.post('/departments', { name });
//     fetchDepartments();
//   };

//   const updateDepartment = async (id, name) => {
//     await API.put(`/departments/${id}`, { name });
//     fetchDepartments();
//   };

//   const deleteDepartment = async (id) => {
//     await API.delete(`/departments/${id}`);
//     fetchDepartments();
//   };

//   return (
//     <DepartmentContext.Provider
//       value={{
//         departments,
//         fetchDepartments,
//         addDepartment,
//         updateDepartment,
//         deleteDepartment,
//       }}
//     >
//       {children}
//     </DepartmentContext.Provider>
//   );
// };

// export const useDepartment = () => useContext(DepartmentContext);










import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const DepartmentContext = createContext(null);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await API.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add a new department
  const addDepartment = async (department) => {
    try {
      await API.post('/departments', department);
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
      throw error;
    }
  };

  // Update an existing department
  const updateDepartment = async (id, department) => {
    try {
      await API.put(`/departments/${id}`, department);
      fetchDepartments();
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  };

  // Delete a department
  const deleteDepartment = async (id) => {
    try {
      await API.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
      throw error;
    }
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

export const useDepartment = () => useContext(DepartmentContext);
