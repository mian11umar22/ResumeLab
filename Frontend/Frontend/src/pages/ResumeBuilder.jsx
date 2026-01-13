import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumeForm from '../componets/ResumeBuilder/ResumeForm';
import ResumePreview from '../componets/ResumeBuilder/ResumePreview';
import TemplateSelector from '../componets/ResumeBuilder/TemplateSelector';

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function ResumeBuilder() {
    const { id } = useParams();
    const { currentResume, loading, autoSaving, fetchResume, updateResume, setCurrentResume } = useResume();
    const [activeSection, setActiveSection] = useState('personalInfo');
    const [showTemplates, setShowTemplates] = useState(false);
    const [mobileView, setMobileView] = useState('form');
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchResume(id);
        }
        return () => setCurrentResume(null);
    }, [id]);

    // Auto-save with debounce
    const debouncedSave = useCallback(
        debounce((data) => {
            if (id && data) {
                updateResume(id, data);
            }
        }, 1000),
        [id]
    );

    const handleResumeChange = (data) => {
        setCurrentResume(prev => ({ ...prev, ...data }));
        debouncedSave({ ...currentResume, ...data });
    };

    const handleDownloadPDF = async () => {
        const element = document.getElementById('resume-preview');
        if (!element) {
            alert('Could not find resume to download');
            return;
        }

        setDownloading(true);

        try {
            const { jsPDF } = await import('jspdf');
            
            // Clone the element
            const clone = element.cloneNode(true);
            
            // Create a hidden container
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '0';
            container.style.width = '210mm';
            container.style.background = 'white';
            container.appendChild(clone);
            document.body.appendChild(container);

            // Apply computed styles as inline styles to avoid oklch parsing
            const applyComputedStyles = (el) => {
                const computed = window.getComputedStyle(el);
                const importantProps = ['color', 'background-color', 'background', 'border-color', 'border', 'fill', 'stroke'];
                
                importantProps.forEach(prop => {
                    const value = computed.getPropertyValue(prop);
                    if (value && !value.includes('oklch')) {
                        el.style.setProperty(prop, value);
                    } else if (value && value.includes('oklch')) {
                        // Convert oklch to a fallback color
                        if (prop.includes('background')) {
                            el.style.setProperty(prop, '#3B82F6');
                        } else {
                            el.style.setProperty(prop, '#111827');
                        }
                    }
                });

                Array.from(el.children).forEach(child => applyComputedStyles(child));
            };
            
            applyComputedStyles(clone);

            // Use html2canvas with the processed clone
            const html2canvas = (await import('html2canvas')).default;
            
            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: clone.offsetWidth,
                height: clone.offsetHeight
            });

            // Remove the clone
            document.body.removeChild(container);

            // Create PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;

            pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`${currentResume?.title || 'resume'}.pdf`);

        } catch (error) {
            console.error('PDF download error:', error);
            // Fallback - open print dialog
            window.print();
        } finally {
            setDownloading(false);
        }
    };

    if (loading && !currentResume) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-4 border-[#3B82F6] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!currentResume) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#111827] mb-4">Resume not found</h2>
                    <Link to="/dashboard" className="text-[#3B82F6] hover:text-[#2563EB]">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 print:hidden">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <input
                                    type="text"
                                    value={currentResume.title}
                                    onChange={(e) => handleResumeChange({ title: e.target.value })}
                                    className="text-lg font-semibold text-[#111827] bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                                    placeholder="Resume Title"
                                />
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    {autoSaving ? (
                                        <>
                                            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>All changes saved</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowTemplates(true)}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#3B82F6] hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                                Templates
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={downloading}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {downloading ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span className="hidden sm:inline">Downloading...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        <span className="hidden sm:inline">Download PDF</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Toggle */}
            <div className="lg:hidden bg-white border-b border-[#E5E7EB] p-2 flex gap-2 print:hidden">
                <button
                    onClick={() => setMobileView('form')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        mobileView === 'form'
                            ? 'bg-[#3B82F6] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Edit
                </button>
                <button
                    onClick={() => setMobileView('preview')}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        mobileView === 'preview'
                            ? 'bg-[#3B82F6] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Preview
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Form Section */}
                <div className={`w-full lg:w-1/2 overflow-y-auto print:hidden ${
                    mobileView === 'form' ? 'block' : 'hidden lg:block'
                }`}>
                    <ResumeForm
                        resume={currentResume}
                        onChange={handleResumeChange}
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />
                </div>

                {/* Preview Section */}
                <div className={`w-full lg:w-1/2 bg-gray-200 overflow-y-auto ${
                    mobileView === 'preview' ? 'block' : 'hidden lg:block'
                } print:w-full print:bg-white`}>
                    <div className="p-4 lg:p-8 print:p-0">
                        <ResumePreview resume={currentResume} />
                    </div>
                </div>
            </div>

            {/* Template Selector Modal */}
            {showTemplates && (
                <TemplateSelector
                    currentTemplate={currentResume.templateId}
                    onSelect={(templateId) => {
                        handleResumeChange({ templateId });
                        setShowTemplates(false);
                    }}
                    onClose={() => setShowTemplates(false)}
                />
            )}
        </div>
    );
}

export default ResumeBuilder;
