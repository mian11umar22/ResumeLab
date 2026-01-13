function LanguagesForm({ data, onChange }) {
    const proficiencyLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

    const addLanguage = () => {
        onChange([...data, { language: '', proficiency: 'Intermediate' }]);
    };

    const updateLanguage = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    const removeLanguage = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Languages</h2>
                    <p className="text-gray-600 text-sm">Add languages you speak</p>
                </div>
                <button
                    onClick={addLanguage}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Language
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌐</span>
                    </div>
                    <h3 className="font-medium text-[#111827] mb-2">No languages added yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Add the languages you speak</p>
                    <button
                        onClick={addLanguage}
                        className="text-[#3B82F6] hover:text-[#2563EB] font-medium text-sm"
                    >
                        + Add your first language
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {data.map((lang, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 border border-[#E5E7EB] rounded-lg bg-white"
                        >
                            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-lg">🌐</span>
                            </div>
                            <div className="flex-1 grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                    <input
                                        type="text"
                                        value={lang.language}
                                        onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                                        placeholder="English"
                                        className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
                                    <select
                                        value={lang.proficiency}
                                        onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                        className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all bg-white"
                                    >
                                        {proficiencyLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button
                                onClick={() => removeLanguage(index)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LanguagesForm;
