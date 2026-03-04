import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling helper
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || error.response.statusText;
    throw new Error(`API Error: ${message}`);
  } else if (error.request) {
    // Request made but no response
    throw new Error('Network Error: No response from server');
  } else {
    // Something else happened
    throw new Error(`Error: ${error.message}`);
  }
};

// API Methods
export const todoApi = {
  /**
   * Get all todos
   * @param {string} filter - 'all', 'active', or 'completed'
   * @returns {Promise<Array>}
   */
  getTodos: async (filter = 'all') => {
    try {
      const params = {};
      if (filter === 'active') params.completed = false;
      if (filter === 'completed') params.completed = true;
      
      const response = await apiClient.get('/todos', { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Get a single todo by ID
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  getTodoById: async (id) => {
    try {
      const response = await apiClient.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Create a new todo
   * @param {Object} todoData - { title: string, description?: string }
   * @returns {Promise<Object>}
   */
  createTodo: async (todoData) => {
    try {
      const response = await apiClient.post('/todos', todoData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Update a todo
   * @param {string|number} id
   * @param {Object} updates - { title?: string, description?: string, completed?: boolean }
   * @returns {Promise<Object>}
   */
  updateTodo: async (id, updates) => {
    try {
      const response = await apiClient.put(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Toggle todo completion status
   * @param {string|number} id
   * @returns {Promise<Object>}
   */
  toggleTodo: async (id) => {
    try {
      const response = await apiClient.patch(`/todos/${id}/toggle`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  /**
   * Delete a todo
   * @param {string|number} id
   * @returns {Promise<void>}
   */
  deleteTodo: async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`);
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default todoApi;
