
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import API from '../services/api';

// const StudentContext = createContext(null);

// export const StudentProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);

//   const fetchStudents = async () => {
//     const response = await API.get('/students');
//     setStudents(response.data);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const addStudent = async (student) => {
//     await API.post('/students/add', student);
//     fetchStudents();
//   };

//   // The backend does not have update and delete for students, so I will not implement them here.

//   return (
//     <StudentContext.Provider
//       value={{
//         students,
//         fetchStudents,
//         addStudent,
//       }}
//     >
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export const useStudent = () => useContext(StudentContext);










// import React, { createContext, useState, useContext, useEffect } from 'react';
// import API from '../services/api';

// const StudentContext = createContext(null);

// export const StudentProvider = ({ children }) => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await API.get('/students');
//       setStudents(response.data);
//     } catch (err) {
//       console.error('Error fetching students:', err);
//       setError('Failed to fetch students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const addStudent = async (student) => {
//     try {
//       setLoading(true);
//       setError(null);
//       await API.post('/students/add', student);
//       await fetchStudents();
//     } catch (err) {
//       console.error('Error adding student:', err);
//       setError('Failed to add student');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // The backend does not have update and delete for students, so I will not implement them here.

//   return (
//     <StudentContext.Provider
//       value={{
//         students,
//         fetchStudents,
//         addStudent,
//         loading,
//         error,
//       }}
//     >
//       {children}
//     </StudentContext.Provider>
//   );
// };

// export const useStudent = () => useContext(StudentContext);










import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../services/api';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get('/students');
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      setLoading(true);
      await API.post('/students/add', student);
      fetchStudents();
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        fetchStudents,
        addStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
