import axios from 'axios';

const BASE_URL = 'https://www.gelostory.com/'

const ENDPOINTS = {
   // keys here can be used as arguments in the fetchData call
   banners: 'dd-images.php?endpoint=banners'
}

// create Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// keyof typeof x serves as a type guard only allowing valid fields
export const fetchData = async (endpointKey: keyof typeof ENDPOINTS) => {
   try {
      const response = await api.get(String(ENDPOINTS[endpointKey]));
      return response.data; 
   } catch(error) {
      console.error('Error fetching data: ', error);
      throw error;
   }
};
 
export default api;