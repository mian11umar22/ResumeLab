import { useState } from 'react';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import LanguagesForm from './forms/LanguagesForm';
import AwardsForm from './forms/AwardsForm';

const sections = [
    { id: 'personalInfo', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'languages', label: 'Languages', icon: '🌐' },
    { id: 'awards', label: 'Awards', icon: '🏆' },
];

function ResumeForm({ resume, onChange, activeSection, onSectionChange }) {
    const updateField = (section, data) => {
        onChange({ [section]: data });
    };

    const renderForm = () => {
        switch (activeSection) {
            case 'personalInfo':
                return (
                    <PersonalInfoForm
                        data={resume.personalInfo}
                        onChange={(data) => updateField('personalInfo', data)}
                    />
                );
            case 'experience':
                return (
                    <ExperienceForm
                        data={resume.experience || []}
                        onChange={(data) => updateField('experience', data)}
                    />
                );
            case 'education':
                return (
                    <EducationForm
                        data={resume.education || []}
                        onChange={(data) => updateField('education', data)}
                    />
                );
            case 'skills':
                return (
                    <SkillsForm
                        data={resume.skills || []}
                        onChange={(data) => updateField('skills', data)}
                    />
                );
            case 'projects':
                return (
                    <ProjectsForm
                        data={resume.projects || []}
                        onChange={(data) => updateField('projects', data)}
                    />
                );
            case 'certifications':
                return (
                    <CertificationsForm
                        data={resume.certifications || []}
                        onChange={(data) => updateField('certifications', data)}
                    />
                );
            case 'languages':
                return (
                    <LanguagesForm
                        data={resume.languages || []}
                        onChange={(data) => updateField('languages', data)}
                    />
                );
            case 'awards':
                return (
                    <AwardsForm
                        data={resume.awards || []}
                        onChange={(data) => updateField('awards', data)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 lg:p-6">
            {/* Section Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => onSectionChange(section.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                            activeSection === section.id
                                ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-[#E5E7EB]'
                        }`}
                    >
                        <span>{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
                {renderForm()}
            </div>
        </div>
    );
}

export default ResumeForm;
