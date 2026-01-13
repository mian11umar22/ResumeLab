import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signup(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="text-2xl sm:text-3xl font-bold text-[#3B82F6] group-hover:text-[#2563EB] transition-colors">ResumeLab</div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] animate-pulse"></div>
          </Link>
        </div>

        {/* Sign up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#E5E7EB] transform hover:shadow-2xl transition-all duration-300">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-2">Sign up</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">Please register to continue</p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm mb-4 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all duration-300 text-[#111827] placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email id"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all duration-300 text-[#111827] placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:border-[#3B82F6] focus:outline-none transition-all duration-300 text-[#111827] placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Forget Password Link */}
            <div className="text-left animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/forgot-password" className="text-[#3B82F6] hover:text-[#2563EB] transition-colors text-sm font-medium">
                Forget password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-lg hover:from-[#2563EB] hover:to-[#4F46E5] hover:shadow-lg transition-all duration-300 font-semibold text-base sm:text-lg transform hover:scale-105 active:scale-95 animate-slide-up disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              style={{ animationDelay: '0.5s' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </button>

            {/* Already have account */}
            <div className="text-center text-gray-600 text-sm sm:text-base animate-slide-up" style={{ animationDelay: '0.6s' }}>
              Already have an account?{' '}
              <Link to="/login" className="text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors">
                click here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
