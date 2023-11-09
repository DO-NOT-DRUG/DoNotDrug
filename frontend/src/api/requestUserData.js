import axios from 'axios';

export const requestUserData = async () => {
  try {
    const response = await axios.get('/api/probation/list');
    return response.data;
    
  } catch {
    alert('Error: ', error);
    return [];
  }
};
