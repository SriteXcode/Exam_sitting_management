
import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

// const ExamScheduleContext = createContext(null);

// export const ExamScheduleProvider = ({ children }) => {
//   const [schedules, setSchedules] = useState([]);

//   const fetchSchedules = async () => {
//     const response = await API.get('/schedules');
//     setSchedules(response.data);
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   const addSchedule = async (schedule) => {
//     await API.post('/schedules/add', schedule);
//     fetchSchedules();
//   };

//   const updateSchedule = async (id, schedule) => {
//     await API.put(`/schedules/${id}`, schedule);
//     fetchSchedules();
//   };

//   const deleteSchedule = async (id) => {
//     await API.delete(`/schedules/${id}`);
//     fetchSchedules();
//   };

//   return (
//     <ExamScheduleContext.Provider
//       value={{
//         schedules,
//         fetchSchedules,
//         addSchedule,
//         updateSchedule,
//         deleteSchedule,
//       }}
//     >
//       {children}
//     </ExamScheduleContext.Provider>
//   );
// };

// export const useExamSchedule = () => useContext(ExamScheduleContext);




















// You need to define the context object before using it
const ExamScheduleContext = React.createContext(); // <-- ADDED CONTEXT CREATION

export const ExamScheduleProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);

    const fetchSchedules = async () => {
        // Mock data structure to avoid immediate errors if API is not available
        try {
            const response = await API.get('/schedules');
            setSchedules(response.data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            // Example of mock data to display something:
            // setSchedules([{ _id: 'mock1', subject: { _id: 's1', name: 'Math' }, date: '2025-12-10', time: '10:00', semester: '3' }]);
        }
    };

    useEffect(() => { // <-- Now correctly imported from React
        fetchSchedules();
    }, []);

    const addSchedule = async (schedule) => {
        await API.post('/schedules/add', schedule);
        fetchSchedules();
    };

    const updateSchedule = async (id, schedule) => {
        await API.put(`/schedules/${id}`, schedule);
        fetchSchedules();
    };

    const deleteSchedule = async (id) => {
        await API.delete(`/schedules/${id}`);
        fetchSchedules();
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

export const useExamSchedule = () => useContext(ExamScheduleContext);