// Minimal ATS-Friendly Template  
// Ultra clean, simple design focused on content

function MinimalTemplate({ resume }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, awards } = resume || {};

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="p-10 font-sans text-gray-700 text-sm leading-relaxed">
            {/* Header - Simple and Clean */}
            <header className="mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-1">
                    {personalInfo?.fullName || 'Your Name'}
                </h1>
                {personalInfo?.jobTitle && (
                    <p className="text-gray-500 text-lg font-light">{personalInfo.jobTitle}</p>
                )}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo?.location && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {personalInfo.location}
                        </span>
                    )}
                    {personalInfo?.linkedin && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            {personalInfo.linkedin}
                        </span>
                    )}
                    {personalInfo?.website && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            {personalInfo.website}
                        </span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {personalInfo?.summary && (
                <section className="mb-6">
                    <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                        Experience
                    </h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-5">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                                <span className="text-xs text-gray-400">
                                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs mb-2">{exp.company}{exp.location && `, ${exp.location}`}</p>
                            {exp.description && (
                                <p className="text-gray-600 text-xs">{exp.description}</p>
                            )}
                            {exp.highlights && exp.highlights.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                    {exp.highlights.filter(h => h).map((highlight, hIndex) => (
                                        <li key={hIndex} className="text-xs text-gray-600 pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                        Education
                    </h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-medium text-gray-900 text-sm">
                                    {edu.degree}{edu.field && `, ${edu.field}`}
                                </h3>
                                <span className="text-xs text-gray-400">
                                    {formatDate(edu.endDate) || 'Present'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs">{edu.institution}</p>
                            {edu.gpa && <p className="text-gray-400 text-xs">GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Skills - Simple inline */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Skills
                    </h2>
                    <div className="space-y-2">
                        {skills.map((skillGroup, index) => (
                            skillGroup.items && skillGroup.items.length > 0 && (
                                <p key={index} className="text-xs">
                                    <span className="text-gray-500">{skillGroup.category}:</span>{' '}
                                    <span className="text-gray-700">{skillGroup.items.join(', ')}</span>
                                </p>
                            )
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                        Projects
                    </h2>
                    {projects.map((project, index) => (
                        <div key={index} className="mb-3">
                            <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                            {project.description && (
                                <p className="text-gray-600 text-xs mt-1">{project.description}</p>
                            )}
                            {project.technologies && project.technologies.length > 0 && (
                                <p className="text-gray-400 text-xs mt-1">{project.technologies.join(', ')}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Additional Info Row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Certifications
                        </h2>
                        <div className="space-y-1">
                            {certifications.map((cert, index) => (
                                <p key={index} className="text-xs text-gray-600">{cert.name}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Languages */}
                {languages && languages.length > 0 && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Languages
                        </h2>
                        <div className="space-y-1">
                            {languages.map((lang, index) => (
                                <p key={index} className="text-xs text-gray-600">
                                    {lang.language} <span className="text-gray-400">({lang.proficiency})</span>
                                </p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {awards && awards.length > 0 && (
                    <section>
                        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                            Awards
                        </h2>
                        <div className="space-y-1">
                            {awards.map((award, index) => (
                                <p key={index} className="text-xs text-gray-600">{award.title}</p>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MinimalTemplate;
