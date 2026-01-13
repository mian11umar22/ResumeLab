import { useState } from 'react';

function EducationForm({ data, onChange }) {
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : -1);

    const addEducation = () => {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            gpa: '',
            achievements: []
        };
        onChange([...data, newEducation]);
        setExpandedIndex(data.length);
    };

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? 0 : -1);
        } else if (expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    const addAchievement = (index) => {
        const updated = [...data];
        updated[index].achievements = [...(updated[index].achievements || []), ''];
        onChange(updated);
    };

    const updateAchievement = (eduIndex, achievementIndex, value) => {
        const updated = [...data];
        updated[eduIndex].achievements[achievementIndex] = value;
        onChange(updated);
    };

    const removeAchievement = (eduIndex, achievementIndex) => {
        const updated = [...data];
        updated[eduIndex].achievements = updated[eduIndex].achievements.filter((_, i) => i !== achievementIndex);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Education</h2>
                    <p className="text-gray-600 text-sm">Add your educational background</p>
                </div>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎓</span>
                    </div>
                    <h3 className="font-medium text-[#111827] mb-2">No education added yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Add your educational background</p>
                    <button
                        onClick={addEducation}
                        className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-sm"
                    >
                        + Add your first education
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((edu, index) => (
                        <div
                            key={index}
                            className="border border-[#E5E7EB] rounded-lg overflow-hidden"
                        >
                            {/* Header */}
                            <div
                                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                                        <span className="text-lg">🎓</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#111827]">
                                            {edu.degree || 'Degree'} {edu.field ? `in ${edu.field}` : ''}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {edu.institution || 'Institution Name'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeEducation(index);
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Form Fields */}
                            {expandedIndex === index && (
                                <div className="p-4 space-y-4 border-t border-[#E5E7EB]">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                            <input
                                                type="text"
                                                value={edu.institution}
                                                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                                placeholder="Stanford University"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                                placeholder="Bachelor of Science"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                                            <input
                                                type="text"
                                                value={edu.field}
                                                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                                placeholder="Computer Science"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={edu.location}
                                                onChange={(e) => updateEducation(index, 'location', e.target.value)}
                                                placeholder="Stanford, CA"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                                            <input
                                                type="text"
                                                value={edu.gpa}
                                                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                                                placeholder="3.8/4.0"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                                <input
                                                    type="month"
                                                    value={edu.startDate}
                                                    onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                                                    className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                                <input
                                                    type="month"
                                                    value={edu.endDate}
                                                    onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                                                    disabled={edu.current}
                                                    className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`current-edu-${index}`}
                                            checked={edu.current}
                                            onChange={(e) => updateEducation(index, 'current', e.target.checked)}
                                            className="w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
                                        />
                                        <label htmlFor={`current-edu-${index}`} className="text-sm text-gray-700">
                                            Currently studying here
                                        </label>
                                    </div>

                                    {/* Achievements */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Achievements & Activities</label>
                                            <button
                                                onClick={() => addAchievement(index)}
                                                className="text-[#3B82F6] hover:text-[#2563EB] text-sm font-medium"
                                            >
                                                + Add Achievement
                                            </button>
                                        </div>
                                        {(edu.achievements || []).map((achievement, aIndex) => (
                                            <div key={aIndex} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={achievement}
                                                    onChange={(e) => updateAchievement(index, aIndex, e.target.value)}
                                                    placeholder="• Dean's List, President of CS Club..."
                                                    className="flex-1 px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                                />
                                                <button
                                                    onClick={() => removeAchievement(index, aIndex)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EducationForm;
