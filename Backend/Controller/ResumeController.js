const Resume = require("../Models/ResumeModel");

// Create a new resume
const createResume = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, templateId } = req.body;

        const resume = await Resume.create({
            userId,
            title: title || 'Untitled Resume',
            templateId: templateId || 'classic'
        });

        return res.status(201).json({
            message: "Resume created successfully",
            resume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get all resumes for a user
const getAllResumes = async (req, res) => {
    try {
        const userId = req.user.id;

        const resumes = await Resume.find({ userId })
            .select('title templateId createdAt updatedAt personalInfo.fullName personalInfo.jobTitle')
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            message: "Resumes fetched successfully",
            resumes
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Get a single resume by ID
const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOne({ _id: id, userId });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Resume fetched successfully",
            resume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Update a resume
const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;

        const resume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Resume updated successfully",
            resume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Update specific section of resume
const updateResumeSection = async (req, res) => {
    try {
        const { id, section } = req.params;
        const userId = req.user.id;
        const sectionData = req.body;

        const validSections = [
            'personalInfo', 'experience', 'education', 'skills',
            'projects', 'certifications', 'languages', 'awards',
            'volunteer', 'references', 'customSections', 'sectionOrder', 'visibleSections'
        ];

        if (!validSections.includes(section)) {
            return res.status(400).json({
                message: "Invalid section name"
            });
        }

        const updateObject = {};
        updateObject[section] = sectionData;

        const resume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { $set: updateObject },
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: `${section} updated successfully`,
            resume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Delete a resume
const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const resume = await Resume.findOneAndDelete({ _id: id, userId });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Resume deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Duplicate a resume
const duplicateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const originalResume = await Resume.findOne({ _id: id, userId });

        if (!originalResume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        const resumeData = originalResume.toObject();
        delete resumeData._id;
        delete resumeData.createdAt;
        delete resumeData.updatedAt;
        resumeData.title = `${originalResume.title} (Copy)`;

        const newResume = await Resume.create(resumeData);

        return res.status(201).json({
            message: "Resume duplicated successfully",
            resume: newResume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

// Update template
const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { templateId } = req.body;

        const resume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { $set: { templateId } },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }

        return res.status(200).json({
            message: "Template updated successfully",
            resume
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    updateResumeSection,
    deleteResume,
    duplicateResume,
    updateTemplate
};
