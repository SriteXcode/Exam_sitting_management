
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const ExamHallContext = createContext(null);

export const ExamHallProvider = ({ children }) => {
  const [examHalls, setExamHalls] = useState([]);

  const fetchExamHalls = async () => {
    const response = await API.get('/halls');
    setExamHalls(response.data);
  };

  const addExamHall = async (hall) => {
    const response = await API.post('/halls/add', hall);
    setExamHalls([...examHalls, response.data]);
  };

  const updateExamHall = async (id, hall) => {
    const response = await API.put(`/halls/${id}`, hall);
    setExamHalls(examHalls.map((h) => (h._id === id ? response.data : h)));
  };

  const deleteExamHall = async (id) => {
    await API.delete(`/halls/${id}`);
    setExamHalls(examHalls.filter((h) => h._id !== id));
  };

  return (
    <ExamHallContext.Provider
      value={{
        examHalls,
        fetchExamHalls,
        addExamHall,
        updateExamHall,
        deleteExamHall,
      }}
    >
      {children}
    </ExamHallContext.Provider>
  );
};

export const useExamHalls = () => useContext(ExamHallContext);
