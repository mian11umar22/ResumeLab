import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    signup: (data) => api.post('/auth/signup', data),
    getProfile: () => api.get('/profile')
};

// Resume APIs
export const resumeAPI = {
    // Get all resumes
    getAll: () => api.get('/resumes'),

    // Get single resume
    getById: (id) => api.get(`/resumes/${id}`),

    // Create new resume
    create: (data) => api.post('/resumes', data),

    // Update resume
    update: (id, data) => api.put(`/resumes/${id}`, data),

    // Update specific section
    updateSection: (id, section, data) => api.put(`/resumes/${id}/section/${section}`, data),

    // Update template
    updateTemplate: (id, templateId) => api.put(`/resumes/${id}/template`, { templateId }),

    // Duplicate resume
    duplicate: (id) => api.post(`/resumes/${id}/duplicate`),

    // Delete resume
    delete: (id) => api.delete(`/resumes/${id}`)
};

export default api;
