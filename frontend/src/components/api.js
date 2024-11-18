import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api/buses';
const API_ROUTE_URL = 'http://localhost:8083/api/routes';


export const api = {
  getAllBuses: async () => {
    const response = await axios.get(`${API_BASE_URL}/allBuses`);
    return response.data;
  },

  getRouteById: async (routeId) => {
    const response = await axios.get(`${API_ROUTE_URL}/${routeId}`);
    return response.data;

  },

  updateBus: async (busId, busDetails) => {
    const response = await axios.put(`${API_BASE_URL}/busLocationUpdate/${busId}`, busDetails);
    return response.data;
  }
};