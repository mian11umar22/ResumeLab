// Executive ATS-Friendly Template
// Premium look for senior positions

function ExecutiveTemplate({ resume }) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, awards } = resume || {};

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="font-serif text-gray-800">
            {/* Elegant Header */}
            <header className="text-center py-8 border-b-4 border-double border-gray-800">
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide mb-2">
                    {personalInfo?.fullName?.toUpperCase() || 'YOUR NAME'}
                </h1>
                {personalInfo?.jobTitle && (
                    <p className="text-gray-600 text-lg italic">{personalInfo.jobTitle}</p>
                )}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-4 text-sm text-gray-600">
                    {personalInfo?.email && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {personalInfo.email}
                        </span>
                    )}
                    {personalInfo?.phone && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {personalInfo.phone}
                        </span>
                    )}
                    {personalInfo?.location && (
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {personalInfo.location}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 mt-1 text-xs text-gray-500">
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

            <div className="px-8 py-6">
                {/* Executive Summary */}
                {personalInfo?.summary && (
                    <section className="mb-6">
                        <h2 className="text-center text-sm font-bold text-gray-800 uppercase tracking-[0.3em] mb-4">
                            Executive Summary
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed text-center max-w-3xl mx-auto italic">
                            "{personalInfo.summary}"
                        </p>
                    </section>
                )}

                {/* Core Competencies / Skills */}
                {skills && skills.length > 0 && (
                    <section className="mb-6 bg-gray-50 py-4 px-6 -mx-8">
                        <h2 className="text-center text-sm font-bold text-gray-800 uppercase tracking-[0.3em] mb-4">
                            Core Competencies
                        </h2>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                            {skills.flatMap(s => s.items || []).slice(0, 12).map((skill, index) => (
                                <span key={index} className="text-sm text-gray-700">
                                    ◆ {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Professional Experience */}
                {experience && experience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-center text-sm font-bold text-gray-800 uppercase tracking-[0.3em] mb-4 border-b border-gray-300 pb-2">
                            Professional Experience
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mb-5">
                                <div className="text-center mb-2">
                                    <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                    <p className="text-gray-700 font-medium">{exp.company}</p>
                                    <p className="text-gray-500 text-xs">
                                        {exp.location && `${exp.location} | `}
                                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </p>
                                </div>
                                {exp.description && (
                                    <p className="text-gray-600 text-sm text-center mt-2">{exp.description}</p>
                                )}
                                {exp.highlights && exp.highlights.length > 0 && (
                                    <ul className="mt-3 space-y-1 max-w-2xl mx-auto">
                                        {exp.highlights.filter(h => h).map((highlight, hIndex) => (
                                            <li key={hIndex} className="text-sm text-gray-700 text-center">
                                                • {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education & Credentials */}
                <div className="grid grid-cols-2 gap-8 mb-6">
                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-center text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-3 border-b border-gray-300 pb-2">
                                Education
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3 text-center">
                                    <h3 className="font-bold text-gray-900 text-sm">
                                        {edu.degree}{edu.field && ` in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-600 text-xs">{edu.institution}</p>
                                    <p className="text-gray-500 text-xs">
                                        {formatDate(edu.endDate) || 'Present'}
                                        {edu.gpa && ` | GPA: ${edu.gpa}`}
                                    </p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications && certifications.length > 0 && (
                        <section>
                            <h2 className="text-center text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-3 border-b border-gray-300 pb-2">
                                Certifications
                            </h2>
                            {certifications.map((cert, index) => (
                                <div key={index} className="mb-2 text-center">
                                    <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                                    <p className="text-gray-500 text-xs">{cert.issuer} | {formatDate(cert.date)}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-center text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-3 border-b border-gray-300 pb-2">
                            Key Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {projects.map((project, index) => (
                                <div key={index} className="text-center">
                                    <h3 className="font-bold text-gray-900 text-sm">{project.name}</h3>
                                    {project.description && (
                                        <p className="text-gray-600 text-xs mt-1">{project.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Bottom Section */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300">
                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-2">Languages</h2>
                            {languages.map((lang, index) => (
                                <p key={index} className="text-xs text-gray-600">{lang.language} — {lang.proficiency}</p>
                            ))}
                        </section>
                    )}

                    {/* Awards */}
                    {awards && awards.length > 0 && (
                        <section className="text-center">
                            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-2">Honors & Awards</h2>
                            {awards.slice(0, 3).map((award, index) => (
                                <p key={index} className="text-xs text-gray-600">{award.title}</p>
                            ))}
                        </section>
                    )}

                    {/* Additional Skills */}
                    {skills && skills.length > 1 && (
                        <section className="text-center">
                            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-[0.2em] mb-2">Additional Skills</h2>
                            {skills.slice(0, 2).map((group, index) => (
                                <p key={index} className="text-xs text-gray-600">{group.category}</p>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ExecutiveTemplate;
