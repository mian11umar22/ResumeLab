import { useState } from 'react';

function ExperienceForm({ data, onChange }) {
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : -1);

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            highlights: []
        };
        onChange([...data, newExperience]);
        setExpandedIndex(data.length);
    };

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? 0 : -1);
        } else if (expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    const addHighlight = (index) => {
        const updated = [...data];
        updated[index].highlights = [...(updated[index].highlights || []), ''];
        onChange(updated);
    };

    const updateHighlight = (expIndex, highlightIndex, value) => {
        const updated = [...data];
        updated[expIndex].highlights[highlightIndex] = value;
        onChange(updated);
    };

    const removeHighlight = (expIndex, highlightIndex) => {
        const updated = [...data];
        updated[expIndex].highlights = updated[expIndex].highlights.filter((_, i) => i !== highlightIndex);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Work Experience</h2>
                    <p className="text-gray-600 text-sm">Add your work history, most recent first</p>
                </div>
                <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">💼</span>
                    </div>
                    <h3 className="font-medium text-[#111827] mb-2">No experience added yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Add your work experience to showcase your career</p>
                    <button
                        onClick={addExperience}
                        className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-sm"
                    >
                        + Add your first experience
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((exp, index) => (
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
                                        <span className="text-lg">💼</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#111827]">
                                            {exp.position || 'Job Title'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {exp.company || 'Company Name'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeExperience(index);
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
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                value={exp.position}
                                                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                                                placeholder="Software Engineer"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                placeholder="Google Inc."
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={exp.location}
                                                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                                placeholder="Mountain View, CA"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                            <input
                                                type="month"
                                                value={exp.startDate}
                                                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                            <input
                                                type="month"
                                                value={exp.endDate}
                                                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                                disabled={exp.current}
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`current-${index}`}
                                            checked={exp.current}
                                            onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                            className="w-4 h-4 text-[#3B82F6] border-gray-300 rounded focus:ring-[#3B82F6]"
                                        />
                                        <label htmlFor={`current-${index}`} className="text-sm text-gray-700">
                                            I currently work here
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={exp.description}
                                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                            placeholder="Describe your role and responsibilities..."
                                            rows={3}
                                            className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all resize-none"
                                        />
                                    </div>

                                    {/* Key Achievements */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
                                            <button
                                                onClick={() => addHighlight(index)}
                                                className="text-[#3B82F6] hover:text-[#2563EB] text-sm font-medium"
                                            >
                                                + Add Achievement
                                            </button>
                                        </div>
                                        {(exp.highlights || []).map((highlight, hIndex) => (
                                            <div key={hIndex} className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={highlight}
                                                    onChange={(e) => updateHighlight(index, hIndex, e.target.value)}
                                                    placeholder="• Increased sales by 20% through..."
                                                    className="flex-1 px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                                />
                                                <button
                                                    onClick={() => removeHighlight(index, hIndex)}
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

export default ExperienceForm;
