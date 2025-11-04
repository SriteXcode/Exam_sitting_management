import React, { useState } from 'react';
import { Button, Typography, Input, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, Alert } from '@mui/material';
import * as XLSX from 'xlsx';
import API from '../services/api';

const REQUIRED_COLUMNS = {
  students: ["Name", "Student ID", "Enrollment No", "Roll No", "Department", "Username", "Semester", "Subjects"],
  subjects: ["Name", "Code", "Department"],
  departments: ["Department Name"]
};

const DataImport = () => {
  const [file, setFile] = useState(null);
  const [importType, setImportType] = useState('students');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setData([]);
  };

  const handlePreview = async () => {
    if (!file) return alert('Please select a file first.');

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const requiredCols = REQUIRED_COLUMNS[importType];
      const missingCols = requiredCols.filter(col => !Object.keys(sheetData[0] || {}).includes(col));

      if (missingCols.length > 0) {
        setError(`Missing columns: ${missingCols.join(', ')}`);
        setData([]);
        return;
      }

      setData(sheetData);
      setError('');
    };
    reader.readAsBinaryString(file);
  };

  const handleImport = async () => {
    if (!data.length) return alert('Preview data before importing.');

    try {
      const response = await API.post(`/import/${importType}`, data);
      alert(response.data.message || 'Data imported successfully!');
      setFile(null);
      setData([]);
    } catch (err) {
      console.error('Import failed:', err);
      alert('Import failed. Check console for details.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Import Data
      </Typography>

      <FormControl fullWidth margin="dense">
        <InputLabel>Import Type</InputLabel>
        <Select
          value={importType}
          onChange={(e) => setImportType(e.target.value)}
        >
          <MenuItem value="students">Students</MenuItem>
          <MenuItem value="subjects">Subjects</MenuItem>
          <MenuItem value="departments">Departments</MenuItem>
        </Select>
      </FormControl>

      <Input type="file" onChange={handleFileChange} sx={{ mt: 2 }} />
      <Button variant="contained" color="secondary" onClick={handlePreview} sx={{ mt: 2, mr: 2 }}>
        Preview
      </Button>
      <Button variant="contained" color="primary" onClick={handleImport} sx={{ mt: 2 }}>
        Import
      </Button>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {data.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>Preview ({data.length} rows)</Typography>
          <Table size="small" sx={{ mt: 1, maxHeight: 400, overflowY: 'scroll' }}>
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((key) => (
                  <TableCell key={key}><b>{key}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0, 10).map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(row).map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Showing first 10 rows for preview.
          </Typography>
        </>
      )}
    </div>
  );
};

export default DataImport;
