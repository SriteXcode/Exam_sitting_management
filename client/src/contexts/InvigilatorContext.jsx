
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const InvigilatorContext = createContext(null);

export const InvigilatorProvider = ({ children }) => {
  const [invigilators, setInvigilators] = useState([]);

  const fetchInvigilators = async () => {
    const response = await API.get('/invigilators');
    setInvigilators(response.data);
  };

  const addInvigilator = async (invigilator) => {
    const response = await API.post('/invigilators/add', invigilator);
    setInvigilators([...invigilators, response.data]);
  };

  const updateInvigilator = async (id, invigilator) => {
    const response = await API.put(`/invigilators/${id}`, invigilator);
    setInvigilators(
      invigilators.map((i) => (i._id === id ? response.data : i))
    );
  };

  const deleteInvigilator = async (id) => {
    await API.delete(`/invigilators/${id}`);
    setInvigilators(invigilators.filter((i) => i._id !== id));
  };

  const updateInvigilatorAvailability = async (id, isAvailable) => {
    const response = await API.put(`/invigilators/availability/${id}`, { isAvailable });
    setInvigilators(
      invigilators.map((i) => (i._id === id ? response.data : i))
    );
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

export const useInvigilators = () => useContext(InvigilatorContext);
