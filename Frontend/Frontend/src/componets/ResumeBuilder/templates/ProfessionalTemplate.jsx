// Professional ATS-Friendly Template
// Clean professional design with accent color bar

function ProfessionalTemplate({ resume }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, awards } = resume || {};

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="font-sans text-gray-800 text-sm">
            {/* Header with accent bar */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] p-6 text-white">
                <h1 className="text-2xl font-bold mb-1">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.jobTitle && (
                    <p className="text-blue-100 text-base">{personalInfo.jobTitle}</p>
                )}
            </div>

            {/* Contact Bar */}
            <div className="bg-gray-100 px-6 py-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-gray-600 border-b">
                {personalInfo?.email && (
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {personalInfo.email}
                    </span>
                )}
                {personalInfo?.phone && (
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {personalInfo.phone}
                    </span>
                )}
                {personalInfo?.location && (
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {personalInfo.location}
                    </span>
                )}
                {personalInfo?.linkedin && (
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#3B82F6]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        {personalInfo.linkedin}
                    </span>
                )}
                {personalInfo?.website && (
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        {personalInfo.website}
                    </span>
                )}
            </div>

            {/* Main Content */}
            <div className="p-6">
                {/* Summary */}
                {personalInfo?.summary && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#3B82F6] uppercase tracking-wide mb-2 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#3B82F6]"></span>
                            Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed pl-10">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#3B82F6] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#3B82F6]"></span>
                            Professional Experience
                        </h2>
                        <div className="pl-10 space-y-4">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-10 top-0 w-6 h-6 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#3B82F6] rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                            <p className="text-[#3B82F6] font-medium text-xs">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                                        </div>
                                        <span className="text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-gray-700 text-xs mt-1">{exp.description}</p>
                                    )}
                                    {exp.highlights && exp.highlights.length > 0 && (
                                        <ul className="mt-2 space-y-1">
                                            {exp.highlights.filter(h => h).map((highlight, hIndex) => (
                                                <li key={hIndex} className="text-xs text-gray-700 flex items-start gap-2">
                                                    <span className="text-[#3B82F6] mt-1">▸</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Layout for Education & Skills */}
                <div className="grid grid-cols-2 gap-6 mb-5">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-[#3B82F6] uppercase tracking-wide mb-3 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[#3B82F6]"></span>
                                Education
                            </h2>
                            <div className="pl-10 space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900 text-xs">
                                            {edu.degree}{edu.field && ` in ${edu.field}`}
                                        </h3>
                                        <p className="text-[#3B82F6] text-xs">{edu.institution}</p>
                                        <p className="text-gray-500 text-xs">
                                            {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                                        </p>
                                        {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold text-[#3B82F6] uppercase tracking-wide mb-3 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-[#3B82F6]"></span>
                                Skills
                            </h2>
                            <div className="pl-10 space-y-2">
                                {skills.map((skillGroup, index) => (
                                    skillGroup.items && skillGroup.items.length > 0 && (
                                        <div key={index}>
                                            <h3 className="text-xs font-semibold text-gray-700">{skillGroup.category}</h3>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {skillGroup.items.map((skill, sIndex) => (
                                                    <span key={sIndex} className="text-xs bg-[#3B82F6]/10 text-[#3B82F6] px-2 py-0.5 rounded">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#3B82F6] uppercase tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-[#3B82F6]"></span>
                            Projects
                        </h2>
                        <div className="pl-10 grid grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <h3 className="font-bold text-gray-900 text-xs">{project.name}</h3>
                                    {project.description && (
                                        <p className="text-gray-600 text-xs mt-1 line-clamp-2">{project.description}</p>
                                    )}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <p className="text-[#3B82F6] text-xs mt-2">
                                            {project.technologies.slice(0, 4).join(' • ')}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Row - Certifications, Languages, Awards */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#3B82F6] uppercase tracking-wide mb-2">Certifications</h2>
                            <div className="space-y-1">
                                {certifications.slice(0, 3).map((cert, index) => (
                                    <p key={index} className="text-xs text-gray-700">{cert.name}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#3B82F6] uppercase tracking-wide mb-2">Languages</h2>
                            <div className="space-y-1">
                                {languages.map((lang, index) => (
                                    <p key={index} className="text-xs text-gray-700">
                                        {lang.language} - {lang.proficiency}
                                    </p>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Awards */}
                    {awards && awards.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold text-[#3B82F6] uppercase tracking-wide mb-2">Awards</h2>
                            <div className="space-y-1">
                                {awards.slice(0, 3).map((award, index) => (
                                    <p key={index} className="text-xs text-gray-700">{award.title}</p>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfessionalTemplate;
