
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const SeatingPlanContext = createContext(null);

export const SeatingPlanProvider = ({ children }) => {
  const [seatingPlans, setSeatingPlans] = useState([]);

  const fetchSeatingPlans = async () => {
    const response = await API.get('/seating');
    setSeatingPlans(response.data);
  };

  const generateSeatingPlan = async (scheduleId) => {
    const response = await API.post(`/seating/generate/${scheduleId}`);
    return response.data;
  };

  const getSeatingPlanByHall = async (hallId) => {
    const response = await API.get(`/seating/hall/${hallId}`);
    return response.data;
  };

  return (
    <SeatingPlanContext.Provider
      value={{
        seatingPlans,
        fetchSeatingPlans,
        generateSeatingPlan,
        getSeatingPlanByHall,
      }}
    >
      {children}
    </SeatingPlanContext.Provider>
  );
};

export const useSeatingPlans = () => useContext(SeatingPlanContext);
