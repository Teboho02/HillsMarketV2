import React from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in-up overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-xl font-display font-bold text-slate-800">Login or Sign Up</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleLoginClick}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">University Email</label>
              <input type="email" id="email" defaultValue="student@uct.ac.za" className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary text-slate-900" required />
            </div>
            <div>
              <label htmlFor="password-login" className="block text-sm font-medium text-slate-700">Password</label>
              <input type="password" id="password-login" defaultValue="password" className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary text-slate-900" required />
            </div>
             <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-sky-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-brand-primary hover:text-sky-600">Forgot password?</a>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 space-y-3">
             <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-sky-600 transition transform hover:scale-105">
              Login
            </button>
             <p className="text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <button type="button" onClick={handleLoginClick} className="font-medium text-brand-primary hover:text-sky-600">
                    Create one
                </button>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;