
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Assuming the backend is running on port 5000
});

export default API;
