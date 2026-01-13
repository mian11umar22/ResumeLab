import { useState } from 'react';

function SkillsForm({ data, onChange }) {
    const [newSkill, setNewSkill] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);

    const addCategory = () => {
        onChange([...data, { category: 'New Category', items: [] }]);
        setActiveCategory(data.length);
    };

    const updateCategory = (index, name) => {
        const updated = [...data];
        updated[index].category = name;
        onChange(updated);
    };

    const removeCategory = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
        if (activeCategory >= updated.length) {
            setActiveCategory(Math.max(0, updated.length - 1));
        }
    };

    const addSkill = (categoryIndex) => {
        if (!newSkill.trim()) return;
        const updated = [...data];
        updated[categoryIndex].items = [...(updated[categoryIndex].items || []), newSkill.trim()];
        onChange(updated);
        setNewSkill('');
    };

    const removeSkill = (categoryIndex, skillIndex) => {
        const updated = [...data];
        updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== skillIndex);
        onChange(updated);
    };

    const suggestedCategories = [
        { name: 'Technical Skills', suggestions: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git'] },
        { name: 'Soft Skills', suggestions: ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management'] },
        { name: 'Tools', suggestions: ['VS Code', 'Figma', 'Jira', 'Slack', 'Notion', 'Postman'] },
        { name: 'Languages', suggestions: ['English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic'] },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#111827]">Skills</h2>
                    <p className="text-gray-600 text-sm">Highlight your key skills and competencies</p>
                </div>
                <button
                    onClick={addCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-[#E5E7EB]">
                    <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="font-medium text-[#111827] mb-2">No skills added yet</h3>
                    <p className="text-gray-500 text-sm mb-4">Add skill categories to showcase your expertise</p>
                    
                    {/* Quick Add Categories */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {suggestedCategories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => {
                                    onChange([...data, { category: cat.name, items: [] }]);
                                    setActiveCategory(data.length);
                                }}
                                className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-full text-sm text-gray-600 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all"
                            >
                                + {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {data.map((cat, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(index)}
                                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                                    activeCategory === index
                                        ? 'bg-[#3B82F6] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat.category}
                            </button>
                        ))}
                    </div>

                    {/* Active Category */}
                    {data[activeCategory] && (
                        <div className="border border-[#E5E7EB] rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <input
                                    type="text"
                                    value={data[activeCategory].category}
                                    onChange={(e) => updateCategory(activeCategory, e.target.value)}
                                    className="text-lg font-medium text-[#111827] bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                                    placeholder="Category Name"
                                />
                                <button
                                    onClick={() => removeCategory(activeCategory)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Skills List */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(data[activeCategory].items || []).map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-sm"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => removeSkill(activeCategory, skillIndex)}
                                            className="ml-1 hover:text-red-500"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>

                            {/* Add Skill */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill(activeCategory)}
                                    placeholder="Type a skill and press Enter"
                                    className="flex-1 px-4 py-2.5 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all"
                                />
                                <button
                                    onClick={() => addSkill(activeCategory)}
                                    className="px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-all"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Suggested Skills */}
                            {suggestedCategories.find(c => c.name.toLowerCase() === data[activeCategory].category.toLowerCase()) && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 mb-2">Suggestions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedCategories
                                            .find(c => c.name.toLowerCase() === data[activeCategory].category.toLowerCase())
                                            ?.suggestions
                                            .filter(s => !(data[activeCategory].items || []).includes(s))
                                            .slice(0, 6)
                                            .map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    onClick={() => {
                                                        const updated = [...data];
                                                        updated[activeCategory].items = [...(updated[activeCategory].items || []), suggestion];
                                                        onChange(updated);
                                                    }}
                                                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-[#3B82F6]/10 hover:text-[#3B82F6] transition-all"
                                                >
                                                    + {suggestion}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SkillsForm;
