import { useState } from 'react';

function AwardsForm({ data, onChange }) {
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : -1);

    const addAward = () => {
        const newAward = {
            title: '',
            issuer: '',
            date: '',
            description: ''
        };
        onChange([...data, newAward]);
        setExpandedIndex(data.length);
    };

    const updateAward = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeAward = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
        if (expandedIndex === index) {
            setExpandedIndex(updated.length > 0 ? 0 : -1);
        } else if (expandedIndex > index) {
            setExpandedIndex(expandedIndex - 1);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Awards & Achievements</h2>
                    <p className="text-gray-600 text-sm">Highlight your recognitions and achievements</p>
                </div>
                <button
                    onClick={addAward}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Award
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="font-medium text-[#111827] mb-2">No awards added yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Add your awards and achievements</p>
                    <button
                        onClick={addAward}
                        className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-sm"
                    >
                        + Add your first award
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((award, index) => (
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
                                        <span className="text-lg">🏆</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-[#111827]">
                                            {award.title || 'Award Title'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {award.issuer || 'Issuing Organization'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeAward(index);
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
                                            <input
                                                type="text"
                                                value={award.title}
                                                onChange={(e) => updateAward(index, 'title', e.target.value)}
                                                placeholder="Employee of the Year"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                                            <input
                                                type="text"
                                                value={award.issuer}
                                                onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                                                placeholder="Company Name"
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                            <input
                                                type="month"
                                                value={award.date}
                                                onChange={(e) => updateAward(index, 'date', e.target.value)}
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                                            <textarea
                                                value={award.description}
                                                onChange={(e) => updateAward(index, 'description', e.target.value)}
                                                placeholder="Brief description of the award and why you received it..."
                                                rows={2}
                                                className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all resize-none"
                                            />
                                        </div>
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

export default AwardsForm;
