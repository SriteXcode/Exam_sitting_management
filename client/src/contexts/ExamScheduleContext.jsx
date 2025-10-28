
import React, { createContext, useState, useContext } from 'react';
import API from '../services/api';

const ExamScheduleContext = createContext(null);

export const ExamScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    const response = await API.get('/schedules');
    setSchedules(response.data);
  };

  const addSchedule = async (schedule) => {
    const response = await API.post('/schedules/add', schedule);
    setSchedules([...schedules, response.data]);
  };

  const updateSchedule = async (id, schedule) => {
    const response = await API.put(`/schedules/${id}`, schedule);
    setSchedules(schedules.map((s) => (s._id === id ? response.data : s)));
  };

  const deleteSchedule = async (id) => {
    await API.delete(`/schedules/${id}`);
    setSchedules(schedules.filter((s) => s._id !== id));
  };

  return (
    <ExamScheduleContext.Provider
      value={{
        schedules,
        fetchSchedules,
        addSchedule,
        updateSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </ExamScheduleContext.Provider>
  );
};

export const useExamSchedules = () => useContext(ExamScheduleContext);
