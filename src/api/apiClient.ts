import axios from 'axios';
import { configs } from '../configs';

const apiClient = axios.create({
  baseURL: configs.BASE_URL,
  timeout: 5000,  // Timeout for requests
  headers: {
    'Content-Type': 'application/json', 
   
  }
});




export default apiClient;
