
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const SubjectContext = createContext(null);

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    const response = await API.get('/subjects');
    setSubjects(response.data);
  };

  const addSubject = async (subject) => {
    const response = await API.post('/subjects/add', subject);
    setSubjects([...subjects, response.data]);
  };

  const updateSubject = async (id, subject) => {
    const response = await API.put(`/subjects/${id}`, subject);
    setSubjects(subjects.map((s) => (s._id === id ? response.data : s)));
  };

  const deleteSubject = async (id) => {
    await API.delete(`/subjects/${id}`);
    setSubjects(subjects.filter((s) => s._id !== id));
  };

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        fetchSubjects,
        addSubject,
        updateSubject,
        deleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectContext);
