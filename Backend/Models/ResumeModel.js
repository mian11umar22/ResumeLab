const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    templateId: {
        type: String,
        default: 'classic'
    },
    title: {
        type: String,
        default: 'Untitled Resume'
    },
    // Personal Information
    personalInfo: {
        fullName: { type: String, default: '' },
        jobTitle: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
        summary: { type: String, default: '' }
    },
    // Work Experience
    experience: [{
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
        highlights: [{ type: String }]
    }],
    // Education
    education: [{
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        field: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        gpa: { type: String, default: '' },
        achievements: [{ type: String }]
    }],
    // Skills
    skills: [{
        category: { type: String, default: '' },
        items: [{ type: String }]
    }],
    // Projects
    projects: [{
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: [{ type: String }],
        link: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' }
    }],
    // Certifications
    certifications: [{
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        expiryDate: { type: String, default: '' },
        credentialId: { type: String, default: '' },
        link: { type: String, default: '' }
    }],
    // Languages
    languages: [{
        language: { type: String, default: '' },
        proficiency: { type: String, default: '' }
    }],
    // Awards & Achievements
    awards: [{
        title: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    // Volunteer Experience
    volunteer: [{
        organization: { type: String, default: '' },
        role: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    // References
    references: [{
        name: { type: String, default: '' },
        position: { type: String, default: '' },
        company: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        relationship: { type: String, default: '' }
    }],
    // Custom Sections
    customSections: [{
        title: { type: String, default: '' },
        items: [{
            title: { type: String, default: '' },
            subtitle: { type: String, default: '' },
            date: { type: String, default: '' },
            description: { type: String, default: '' }
        }]
    }],
    // Section Order (for customization)
    sectionOrder: {
        type: [String],
        default: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards', 'volunteer', 'references']
    },
    // Visibility settings
    visibleSections: {
        type: Map,
        of: Boolean,
        default: {
            personalInfo: true,
            summary: true,
            experience: true,
            education: true,
            skills: true,
            projects: true,
            certifications: true,
            languages: true,
            awards: false,
            volunteer: false,
            references: false
        }
    }
}, {
    timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
