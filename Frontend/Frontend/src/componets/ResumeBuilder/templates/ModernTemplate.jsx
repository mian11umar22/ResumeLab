// Modern ATS-Friendly Template
// Two-column layout with a sidebar for contact info and skills

function ModernTemplate({ resume }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, awards } = resume || {};

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="flex min-h-full">
            {/* Sidebar */}
            <div className="w-1/3 bg-[#1e3a5f] text-white p-6">
                {/* Name & Title */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold mb-1">
                        {personalInfo?.fullName || 'Your Name'}
                    </h1>
                    {personalInfo?.jobTitle && (
                        <p className="text-blue-200 text-sm">{personalInfo.jobTitle}</p>
                    )}
                </div>

                {/* Contact */}
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 border-b border-blue-300/30 pb-1">
                        Contact
                    </h2>
                    <div className="space-y-2 text-xs">
                        {personalInfo?.email && (
                            <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 text-blue-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="break-all">{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo?.phone && (
                            <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 text-blue-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo?.location && (
                            <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 text-blue-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                        {personalInfo?.linkedin && (
                            <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span className="break-all">{personalInfo.linkedin}</span>
                            </div>
                        )}
                        {personalInfo?.website && (
                            <div className="flex items-start gap-2">
                                <svg className="w-3 h-3 text-blue-200 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="break-all">{personalInfo.website}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 border-b border-blue-300/30 pb-1">
                            Skills
                        </h2>
                        <div className="space-y-3">
                            {skills.map((skillGroup, index) => (
                                skillGroup.items && skillGroup.items.length > 0 && (
                                    <div key={index}>
                                        <h3 className="text-xs font-semibold text-blue-200 mb-1">{skillGroup.category}</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {skillGroup.items.map((skill, sIndex) => (
                                                <span key={sIndex} className="text-xs bg-white/10 px-2 py-0.5 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 border-b border-blue-300/30 pb-1">
                            Languages
                        </h2>
                        <div className="space-y-1 text-xs">
                            {languages.map((lang, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{lang.language}</span>
                                    <span className="text-blue-200">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 border-b border-blue-300/30 pb-1">
                            Certifications
                        </h2>
                        <div className="space-y-2 text-xs">
                            {certifications.map((cert, index) => (
                                <div key={index}>
                                    <p className="font-semibold">{cert.name}</p>
                                    <p className="text-blue-200">{cert.issuer}</p>
                                    {cert.date && <p className="text-blue-300/70">{formatDate(cert.date)}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="w-2/3 p-6 text-gray-800">
                {/* Summary */}
                {personalInfo?.summary && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide border-b-2 border-[#1e3a5f] pb-1 mb-3">
                            Professional Summary
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {experience && experience.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide border-b-2 border-[#1e3a5f] pb-1 mb-3">
                            Work Experience
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                                        <p className="text-[#1e3a5f] text-xs font-medium">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-500 text-xs whitespace-nowrap">
                                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="text-gray-700 text-xs mt-1">{exp.description}</p>
                                )}
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <ul className="list-disc list-inside mt-1 text-gray-700 text-xs">
                                        {exp.highlights.filter(h => h).map((highlight, hIndex) => (
                                            <li key={hIndex}>{highlight}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide border-b-2 border-[#1e3a5f] pb-1 mb-3">
                            Education
                        </h2>
                        {education.map((edu, index) => (
                            <div key={index} className="mb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">
                                            {edu.degree}{edu.field && ` in ${edu.field}`}
                                        </h3>
                                        <p className="text-[#1e3a5f] text-xs font-medium">{edu.institution}</p>
                                    </div>
                                    <span className="text-gray-500 text-xs whitespace-nowrap">
                                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                                    </span>
                                </div>
                                {edu.gpa && <p className="text-gray-600 text-xs">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide border-b-2 border-[#1e3a5f] pb-1 mb-3">
                            Projects
                        </h2>
                        {projects.map((project, index) => (
                            <div key={index} className="mb-3">
                                <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                                {project.description && (
                                    <p className="text-gray-700 text-xs mt-1">{project.description}</p>
                                )}
                                {project.technologies && project.technologies.length > 0 && (
                                    <p className="text-[#1e3a5f] text-xs mt-1">
                                        {project.technologies.join(' • ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide border-b-2 border-[#1e3a5f] pb-1 mb-3">
                            Awards
                        </h2>
                        {awards.map((award, index) => (
                            <div key={index} className="mb-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-sm">{award.title}</span>
                                    {award.date && <span className="text-gray-500 text-xs">{formatDate(award.date)}</span>}
                                </div>
                                {award.issuer && <p className="text-gray-600 text-xs">{award.issuer}</p>}
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
}

export default ModernTemplate;
