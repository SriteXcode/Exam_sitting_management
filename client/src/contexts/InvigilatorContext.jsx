
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const InvigilatorContext = createContext(null);

export const InvigilatorProvider = ({ children }) => {
  const [invigilators, setInvigilators] = useState([]);

  const fetchInvigilators = async () => {
    const response = await API.get('/invigilators');
    setInvigilators(response.data);
  };

  useEffect(() => {
    fetchInvigilators();
  }, []);

  const addInvigilator = async (invigilator) => {
    await API.post('/invigilators/add', invigilator);
    fetchInvigilators();
  };

  const updateInvigilator = async (id, invigilator) => {
    await API.put(`/invigilators/${id}`, invigilator);
    fetchInvigilators();
  };

  const deleteInvigilator = async (id) => {
    await API.delete(`/invigilators/${id}`);
    fetchInvigilators();
  };

  const updateInvigilatorAvailability = async (id, isAvailable) => {
    await API.put(`/invigilators/availability/${id}`, { isAvailable });
    fetchInvigilators();
  };

  return (
    <InvigilatorContext.Provider
      value={{
        invigilators,
        fetchInvigilators,
        addInvigilator,
        updateInvigilator,
        deleteInvigilator,
        updateInvigilatorAvailability,
      }}
    >
      {children}
    </InvigilatorContext.Provider>
  );
};

export const useInvigilator = () => useContext(InvigilatorContext);
