import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Dashboard API
export const getDashboardData = async () => {
  return api.get('/dashboard')
}

// Analytics API
export const getAnalyticsData = async (params = {}) => {
  return api.get('/analytics', { params })
}

// Reports API
export const getReports = async (params = {}) => {
  return api.get('/reports', { params })
}

// Generate Report API
export const generateReport = async (reportData) => {
  return api.post('/reports/generate', reportData)
}

// Export API
export const exportData = async (format, data) => {
  return api.post('/export', { format, data })
}

// Settings API
export const getSettings = async () => {
  return api.get('/settings')
}

export const updateSettings = async (settings) => {
  return api.put('/settings', settings)
}

export default api 