const templates = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional ATS-friendly format',
        preview: 'bg-white'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Two-column with sidebar',
        preview: 'bg-gradient-to-r from-[#1e3a5f] from-33% to-white to-33%'
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Accent header design',
        preview: 'bg-gradient-to-b from-[#3B82F6] from-20% to-white to-20%'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean and simple',
        preview: 'bg-gray-50'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Premium for senior roles',
        preview: 'bg-white border-t-4 border-gray-800'
    }
];

function TemplateSelector({ currentTemplate, onSelect, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
                    <div>
                        <h2 className="text-2xl font-bold text-[#111827]">Choose Template</h2>
                        <p className="text-gray-600">All templates are ATS-friendly</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Templates Grid */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => onSelect(template.id)}
                                className={`text-left rounded-xl overflow-hidden border-2 transition-all hover:shadow-lg ${
                                    currentTemplate === template.id
                                        ? 'border-[#3B82F6] shadow-lg ring-2 ring-[#3B82F6]/20'
                                        : 'border-[#E5E7EB] hover:border-[#3B82F6]/50'
                                }`}
                            >
                                {/* Preview */}
                                <div className={`h-40 ${template.preview} relative`}>
                                    {/* Mini Resume Layout Preview */}
                                    <div className="absolute inset-4 flex">
                                        {template.id === 'modern' ? (
                                            <>
                                                <div className="w-1/3 h-full bg-[#1e3a5f] rounded-l p-2">
                                                    <div className="h-2 w-12 bg-white/30 rounded mb-2"></div>
                                                    <div className="h-1.5 w-10 bg-white/20 rounded mb-3"></div>
                                                    <div className="h-1 w-8 bg-white/10 rounded mb-1"></div>
                                                    <div className="h-1 w-10 bg-white/10 rounded mb-1"></div>
                                                    <div className="h-1 w-6 bg-white/10 rounded"></div>
                                                </div>
                                                <div className="w-2/3 bg-white rounded-r p-2">
                                                    <div className="h-2 w-20 bg-gray-200 rounded mb-2"></div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                                    <div className="h-1.5 w-3/4 bg-gray-100 rounded"></div>
                                                </div>
                                            </>
                                        ) : template.id === 'professional' ? (
                                            <div className="w-full bg-white rounded overflow-hidden">
                                                <div className="h-6 bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"></div>
                                                <div className="h-3 bg-gray-100"></div>
                                                <div className="p-2">
                                                    <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                                    <div className="h-1.5 w-3/4 bg-gray-100 rounded"></div>
                                                </div>
                                            </div>
                                        ) : template.id === 'executive' ? (
                                            <div className="w-full bg-white rounded border-t-2 border-gray-800 p-2">
                                                <div className="text-center mb-2">
                                                    <div className="h-2 w-20 bg-gray-300 rounded mx-auto mb-1"></div>
                                                    <div className="h-1.5 w-16 bg-gray-200 rounded mx-auto"></div>
                                                </div>
                                                <div className="border-b border-gray-200 mb-2"></div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                                <div className="h-1.5 w-full bg-gray-100 rounded mb-1"></div>
                                            </div>
                                        ) : template.id === 'minimal' ? (
                                            <div className="w-full bg-gray-50 rounded p-3">
                                                <div className="h-3 w-24 bg-gray-200 rounded mb-1"></div>
                                                <div className="h-1.5 w-16 bg-gray-100 rounded mb-3"></div>
                                                <div className="h-1 w-6 bg-gray-200 rounded mb-1"></div>
                                                <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                                                <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                                                <div className="h-1 w-3/4 bg-gray-100 rounded"></div>
                                            </div>
                                        ) : (
                                            <div className="w-full bg-white rounded p-2">
                                                <div className="text-center border-b border-gray-200 pb-2 mb-2">
                                                    <div className="h-2 w-20 bg-gray-300 rounded mx-auto mb-1"></div>
                                                    <div className="h-1.5 w-12 bg-gray-100 rounded mx-auto"></div>
                                                </div>
                                                <div className="h-1 w-16 bg-gray-200 rounded mb-1"></div>
                                                <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                                                <div className="h-1 w-full bg-gray-100 rounded mb-0.5"></div>
                                                <div className="h-1 w-3/4 bg-gray-100 rounded"></div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected Badge */}
                                    {currentTemplate === template.id && (
                                        <div className="absolute top-2 right-2 bg-[#3B82F6] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Active
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4 bg-white">
                                    <h3 className="font-semibold text-[#111827] mb-1">{template.name}</h3>
                                    <p className="text-sm text-gray-500">{template.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* ATS Info */}
                    <div className="mt-6 p-4 bg-[#3B82F6]/5 rounded-xl border border-[#3B82F6]/20">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#111827] mb-1">All Templates are ATS-Optimized</h4>
                                <p className="text-sm text-gray-600">
                                    Our templates use clean formatting, standard fonts, and proper heading hierarchy 
                                    to ensure maximum compatibility with Applicant Tracking Systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateSelector;
