import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

function Dashboard() {
    const navigate = useNavigate();
    const { resumes, loading, fetchResumes, createResume, deleteResume, duplicateResume } = useResume();
    const [showDeleteModal, setShowDeleteModal] = useState(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleCreateResume = async () => {
        setCreating(true);
        const resume = await createResume({ title: 'Untitled Resume' });
        if (resume) {
            navigate(`/builder/${resume._id}`);
        }
        setCreating(false);
    };

    const handleDelete = async (id) => {
        await deleteResume(id);
        setShowDeleteModal(null);
    };

    const handleDuplicate = async (id) => {
        const resume = await duplicateResume(id);
        if (resume) {
            navigate(`/builder/${resume._id}`);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="text-2xl font-bold text-[#3B82F6] group-hover:text-[#2563EB] transition-colors">ResumeLab</div>
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] animate-pulse"></div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleCreateResume}
                                disabled={creating}
                                className="px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50"
                            >
                                {creating ? (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                )}
                                Create Resume
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/login');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-[#3B82F6] transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#111827] mb-2">My Resumes</h1>
                    <p className="text-gray-600">Create, edit, and manage your professional resumes</p>
                </div>

                {loading && resumes.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin h-12 w-12 border-4 border-[#3B82F6] border-t-transparent rounded-full"></div>
                    </div>
                ) : resumes.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#3B82F6]/20 to-[#6366F1]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-[#111827] mb-2">No resumes yet</h2>
                        <p className="text-gray-600 mb-6">Create your first professional resume in minutes</p>
                        <button
                            onClick={handleCreateResume}
                            disabled={creating}
                            className="px-8 py-3 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-lg transition-all duration-300 font-semibold"
                        >
                            Create Your First Resume
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Create New Card */}
                        <button
                            onClick={handleCreateResume}
                            disabled={creating}
                            className="h-72 border-2 border-dashed border-[#E5E7EB] rounded-xl hover:border-[#3B82F6] hover:bg-[#3B82F6]/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3B82F6]/20 to-[#6366F1]/20 flex items-center justify-center group-hover:from-[#3B82F6]/30 group-hover:to-[#6366F1]/30 transition-all">
                                <svg className="w-8 h-8 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-[#3B82F6] font-medium">Create New Resume</span>
                        </button>

                        {/* Resume Cards */}
                        {resumes.map((resume) => (
                            <div
                                key={resume._id}
                                className="h-72 bg-white rounded-xl border border-[#E5E7EB] hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Preview */}
                                <Link
                                    to={`/builder/${resume._id}`}
                                    className="block h-44 bg-gradient-to-br from-[#F8FAFC] to-white p-4 border-b border-[#E5E7EB] relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {/* Mini Resume Preview */}
                                    <div className="relative z-10 space-y-2 transform scale-75 origin-top-left">
                                        <div className="h-3 w-32 bg-[#3B82F6]/30 rounded"></div>
                                        <div className="h-2 w-24 bg-gray-200 rounded"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded mt-3"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                        <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                                        <div className="h-2 w-20 bg-[#3B82F6]/20 rounded mt-3"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded"></div>
                                    </div>
                                </Link>

                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-[#111827] truncate mb-1">
                                        {resume.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Updated {formatDate(resume.updatedAt)}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            to={`/builder/${resume._id}`}
                                            className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium"
                                        >
                                            Edit
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDuplicate(resume._id)}
                                                className="p-2 text-gray-400 hover:text-[#3B82F6] transition-colors"
                                                title="Duplicate"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteModal(resume._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-[#111827] mb-2">Delete Resume?</h3>
                        <p className="text-gray-600 mb-6">This action cannot be undone. Are you sure you want to delete this resume?</p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="px-4 py-2 text-gray-600 hover:text-[#111827] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteModal)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
