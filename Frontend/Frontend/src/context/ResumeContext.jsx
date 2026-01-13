import { createContext, useContext, useState, useEffect } from 'react';
import { resumeAPI } from '../services/api';

const ResumeContext = createContext(null);

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

export const ResumeProvider = ({ children }) => {
    const [resumes, setResumes] = useState([]);
    const [currentResume, setCurrentResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [autoSaving, setAutoSaving] = useState(false);

    // Fetch all resumes
    const fetchResumes = async () => {
        setLoading(true);
        try {
            const response = await resumeAPI.getAll();
            setResumes(response.data.resumes);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch resumes');
        } finally {
            setLoading(false);
        }
    };

    // Fetch single resume
    const fetchResume = async (id) => {
        setLoading(true);
        try {
            const response = await resumeAPI.getById(id);
            setCurrentResume(response.data.resume);
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch resume');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Create new resume
    const createResume = async (data = {}) => {
        setLoading(true);
        try {
            const response = await resumeAPI.create(data);
            setResumes(prev => [response.data.resume, ...prev]);
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create resume');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Update resume
    const updateResume = async (id, data) => {
        setAutoSaving(true);
        try {
            const response = await resumeAPI.update(id, data);
            setCurrentResume(response.data.resume);
            setResumes(prev => prev.map(r => r._id === id ? response.data.resume : r));
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update resume');
            return null;
        } finally {
            setAutoSaving(false);
        }
    };

    // Update section
    const updateSection = async (id, section, data) => {
        setAutoSaving(true);
        try {
            const response = await resumeAPI.updateSection(id, section, data);
            setCurrentResume(response.data.resume);
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update section');
            return null;
        } finally {
            setAutoSaving(false);
        }
    };

    // Update template
    const updateTemplate = async (id, templateId) => {
        try {
            const response = await resumeAPI.updateTemplate(id, templateId);
            setCurrentResume(response.data.resume);
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update template');
            return null;
        }
    };

    // Duplicate resume
    const duplicateResume = async (id) => {
        setLoading(true);
        try {
            const response = await resumeAPI.duplicate(id);
            setResumes(prev => [response.data.resume, ...prev]);
            setError(null);
            return response.data.resume;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to duplicate resume');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Delete resume
    const deleteResume = async (id) => {
        setLoading(true);
        try {
            await resumeAPI.delete(id);
            setResumes(prev => prev.filter(r => r._id !== id));
            if (currentResume?._id === id) {
                setCurrentResume(null);
            }
            setError(null);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete resume');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update local state (for real-time editing)
    const updateLocalResume = (data) => {
        setCurrentResume(prev => ({ ...prev, ...data }));
    };

    const value = {
        resumes,
        currentResume,
        loading,
        error,
        autoSaving,
        fetchResumes,
        fetchResume,
        createResume,
        updateResume,
        updateSection,
        updateTemplate,
        duplicateResume,
        deleteResume,
        updateLocalResume,
        setCurrentResume
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};

export default ResumeContext;
