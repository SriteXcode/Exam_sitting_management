
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const ExamHallContext = createContext(null);

export const ExamHallProvider = ({ children }) => {
  const [examHalls, setExamHalls] = useState([]);

  const fetchExamHalls = async () => {
    const response = await API.get('/halls');
    setExamHalls(response.data);
  };

  useEffect(() => {
    fetchExamHalls();
  }, []);

  const addExamHall = async (hall) => {
    await API.post('/halls/add', hall);
    fetchExamHalls();
  };

  const updateExamHall = async (id, hall) => {
    await API.put(`/halls/${id}`, hall);
    fetchExamHalls();
  };

  const deleteExamHall = async (id) => {
    await API.delete(`/halls/${id}`);
    fetchExamHalls();
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

export const useExamHall = () => useContext(ExamHallContext);
