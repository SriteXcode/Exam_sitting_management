
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await API.get('/students');
    setStudents(response.data);
  };

  const addStudent = async (student) => {
    const response = await API.post('/students/add', student);
    setStudents([...students, response.data]);
  };

  // The backend does not have update and delete for students, so I will not implement them here.

  return (
    <StudentContext.Provider
      value={{
        students,
        fetchStudents,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => useContext(StudentContext);
