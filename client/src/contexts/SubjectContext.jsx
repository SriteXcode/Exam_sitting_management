
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import API from '../services/api';

// const SubjectContext = createContext(null);

// export const SubjectProvider = ({ children }) => {
//   const [subjects, setSubjects] = useState([]);

//   const fetchSubjects = async () => {
//     const response = await API.get('/subjects');
//     setSubjects(response.data);
//   };

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const addSubject = async (subject) => {
//     await API.post('/subjects/add', subject);
//     fetchSubjects();
//   };

//   const updateSubject = async (id, subject) => {
//     await API.put(`/subjects/${id}`, subject);
//     fetchSubjects();
//   };

//   const deleteSubject = async (id) => {
//     await API.delete(`/subjects/${id}`);
//     fetchSubjects();
//   };

//   return (
//     <SubjectContext.Provider
//       value={{
//         subjects,
//         fetchSubjects,
//         addSubject,
//         updateSubject,
//         deleteSubject,
//       }}
//     >
//       {children}
//     </SubjectContext.Provider>
//   );
// };

// export const useSubject = () => useContext(SubjectContext);










import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const SubjectContext = createContext(null);

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const response = await API.get('/subjects');
      setSubjects(response.data);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add new subject
  const addSubject = async (subject) => {
    try {
      await API.post('/subjects/add', subject);
      fetchSubjects();
    } catch (error) {
      console.error('Error adding subject:', error);
      throw error;
    }
  };

  // Update existing subject
  const updateSubject = async (id, subject) => {
    try {
      await API.put(`/subjects/${id}`, subject);
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
      throw error;
    }
  };

  // Delete subject
  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
      throw error;
    }
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

// Custom hook to use the Subject context
export const useSubject = () => useContext(SubjectContext);
