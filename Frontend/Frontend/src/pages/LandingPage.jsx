import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Smooth scroll handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const setSectionRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] scroll-smooth">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#E5E7EB] shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="text-2xl font-bold text-[#3B82F6] group-hover:text-[#2563EB] transition-colors">ResumeLab</div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] animate-pulse"></div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-gray-700 hover:text-[#3B82F6] transition-all duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-gray-700 hover:text-[#3B82F6] transition-all duration-300 relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleNavClick(e, 'testimonials')}
                className="text-gray-700 hover:text-[#3B82F6] transition-all duration-300 relative group"
              >
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] group-hover:w-full transition-all duration-300"></span>
              </a>
            
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#3B82F6] transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <Link 
              to="/register" 
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden mt-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <nav className="flex flex-col gap-4 pb-4">
              <a 
                href="#home" 
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-gray-700 hover:text-[#3B82F6] transition-colors py-2"
              >
                Home
              </a>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-gray-700 hover:text-[#3B82F6] transition-colors py-2"
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => handleNavClick(e, 'testimonials')}
                className="text-gray-700 hover:text-[#3B82F6] transition-colors py-2"
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-gray-700 hover:text-[#3B82F6] transition-colors py-2"
              >
                Contact
              </a>
              <Link 
                to="/register" 
                className="px-6 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] transition-all duration-300 font-medium text-center"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        ref={setSectionRef('home')}
        className={`relative py-12 sm:py-20 px-4 overflow-hidden transition-all duration-1000 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-[#6366F1]/5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social Proof */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 transition-all duration-1000 delay-200 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] border-2 border-white flex items-center justify-center text-white font-bold text-xs sm:text-sm animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">Used by 10,000+ users</span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#111827] transition-all duration-1000 delay-300 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Land your dream job with{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] bg-clip-text text-transparent animate-gradient">
                AI-powered resumes.
              </span>
            </h1>
            
            <p className={`text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Create, edit and download professional resumes with AI-powered assistance.
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-700 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <Link 
                to="/register"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-xl transition-all duration-300 font-semibold text-lg transform hover:scale-105 active:scale-95"
              >
                Get started →
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#E5E7EB] text-gray-700 rounded-lg hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Try demo
              </button>
            </div>

            <div className={`text-gray-500 mb-4 text-sm sm:text-base transition-all duration-1000 delay-900 ${visibleSections.has('home') ? 'opacity-100' : 'opacity-0'}`}>
              Trusted by leading brands, including
            </div>
            <div className={`flex items-center justify-center gap-4 sm:gap-8 flex-wrap transition-all duration-1000 delay-1000 ${visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-20 h-10 sm:w-24 sm:h-12 bg-gradient-to-br from-[#3B82F6]/20 to-[#6366F1]/20 rounded-lg flex items-center justify-center text-[#3B82F6] font-bold text-xs sm:text-sm hover:from-[#3B82F6]/30 hover:to-[#6366F1]/30 transition-all duration-300 transform hover:scale-110"
                >
                  Brand {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build Your Resume Section */}
      <section 
        id="features" 
        ref={setSectionRef('features')}
        className={`py-12 sm:py-20 px-4 bg-white transition-all duration-1000 ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-[#3B82F6]/10 to-[#6366F1]/10 text-[#3B82F6] rounded-full text-sm font-medium">
              ← Simple Process
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[#111827]">Build your resume</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 px-4">
            Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Creative visual representation */}
            <div className="relative order-2 md:order-1">
              <div className="relative h-64 sm:h-80 md:h-96">
                {/* Gradient circles as visual elements */}
                <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-[#3B82F6]/30 to-[#6366F1]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-[#6366F1]/30 to-[#3B82F6]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Geometric shapes representing resume building */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-[#E5E7EB] transform rotate-3 hover:rotate-0 transition-all duration-300 hover:shadow-xl">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-lg mb-3"></div>
                      <div className="h-2 bg-gray-200 rounded w-16 sm:w-20 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-12 sm:w-16"></div>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-[#E5E7EB] transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:shadow-xl mt-6 sm:mt-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6366F1] to-[#3B82F6] rounded-lg mb-3"></div>
                      <div className="h-2 bg-gray-200 rounded w-20 sm:w-24 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-14 sm:w-18"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Features */}
            <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: 'Real-Time Analytics',
                  description: 'Get instant insights into your resume performance with live dashboards and analytics.'
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Bank-Grade Security',
                  description: 'End-to-end encryption, 2FA, compliance with GDPR standards for your data protection.'
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: 'Customizable Reports',
                  description: 'Export professional, ATS-ready resumes in multiple formats for any application.'
                }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className={`p-4 sm:p-6 border-2 border-[#E5E7EB] rounded-xl hover:border-[#3B82F6] hover:shadow-lg transition-all duration-300 bg-white transform hover:scale-105 ${visibleSections.has('features') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#6366F1] rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={setSectionRef('testimonials')}
        className={`py-12 sm:py-20 px-4 bg-[#F8FAFC] transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <span className="px-4 py-1 bg-gradient-to-r from-[#3B82F6]/10 to-[#6366F1]/10 text-[#3B82F6] rounded-full text-sm font-medium">
              Testimonials
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[#111827]">Don't just take our words</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 px-4">
            Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: 'Briar Martin', handle: '@nelstellar' },
              { name: 'Avery Johnson', handle: '@averywrites' },
              { name: 'Jordan Lee', handle: '@jordantalks' },
              { name: 'Casey Smith', handle: '@caseydev' },
              { name: 'Morgan Taylor', handle: '@morgantech' },
              { name: 'Riley Brown', handle: '@rileycode' },
            ].map((user, i) => (
              <div 
                key={i} 
                className={`bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#E5E7EB] transform hover:scale-105 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-white font-bold text-sm sm:text-base">
                    {user.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#111827] text-sm sm:text-base">{user.name}</h4>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">{user.handle}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm sm:text-base">
                  "ResumeLab made creating a professional resume an absolute breeze. Landed my dream job in just 2 weeks!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#3B82F6] to-[#6366F1] text-white py-8 sm:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-xl sm:text-2xl font-bold">ResumeLab</div>
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <p className="text-white/80 text-sm sm:text-base">
                Making every customer feel valued— no matter the size of your audience.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-white transition">Home</a></li>
                <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Affiliate</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition">Company</a></li>
                <li><a href="#" className="hover:text-white transition">Blogs</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
                <li><a href="#" className="hover:text-white transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-white/20 gap-4">
            <p className="text-white/80 text-sm sm:text-base">©2025 Resume Builder</p>
            <div className="flex items-center gap-3 sm:gap-4">
              {['LinkedIn', 'Instagram', 'YouTube', 'Twitter'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-xs sm:text-sm font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
