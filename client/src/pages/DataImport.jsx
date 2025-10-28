
import React, { useState } from 'react';
import { Button, Typography, Input } from '@mui/material';
import API from '../services/api';

const DataImport = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await API.post('/import', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(response.data.message);
      } catch (error) {
        console.error('File import failed', error);
        alert('File import failed');
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Import Students
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleImport} sx={{ mt: 1 }}>
        Import
      </Button>
    </div>
  );
};

export default DataImport;
