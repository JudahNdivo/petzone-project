// Create this file: frontend/src/services/api.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for making requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Pets API
  async getPets(filters = {}) {
    const params = new URLSearchParams(filters);
    const queryString = params.toString();
    return this.makeRequest(`/pets/${queryString ? `?${queryString}` : ''}`);
  }

  async getPetDetail(petId) {
    return this.makeRequest(`/pets/${petId}/`);
  }

  async createPet(petData) {
    return this.makeRequest('/pets/', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  }

  // Test connection method
  async testConnection() {
    try {
      const data = await this.getPets();
      console.log('✅ API Connection successful!', data);
      return data;
    } catch (error) {
      console.error('❌ API Connection failed:', error);
      throw error;
    }
  }
}

// Export a single instance
const apiService = new ApiService();
export default apiService;