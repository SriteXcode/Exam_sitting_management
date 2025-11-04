import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import API from '../services/api';

const ProfilePage = () => {
  const { user, setUser } = useAuthContext();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await API.put('/auth/update-password', { password });
      alert(response.data.message);
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password update failed', error);
      alert('Password update failed');
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">Username: {user.username}</Typography>
        <Typography variant="h6">Role: {user.role}</Typography>

        <form onSubmit={handlePasswordChange} style={{ marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
