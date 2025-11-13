import React, { useState } from 'react';
import type { User, View } from '../types';

interface NavbarProps {
  currentUser: User | null;
  currentView: View;
  onNavigate: (view: View) => void;
  onSellClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, currentView, onNavigate, onSellClick, onLoginClick, onLogoutClick, searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showSearchBar = currentView === 'browse';

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigate('browse')} className="flex items-center space-x-2 text-brand-primary">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
               </svg>
              <span className="text-2xl font-display font-bold text-slate-800">Hiils Market</span>
            </button>
          </div>
          {showSearchBar && (
            <div className="hidden md:flex flex-1 max-w-xl items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for textbooks, furniture..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-300 text-slate-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {currentUser ? (
              <>
                <button onClick={onSellClick} className="hidden sm:flex items-center space-x-2 bg-brand-secondary text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow hover:shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Sell</span>
                </button>
                <button onClick={() => onNavigate('messages')} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <div className="relative">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)} onBlur={() => setIsMenuOpen(false)} className="flex items-center space-x-2">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-10 w-10 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-brand-primary transition-all duration-300" />
                  </button>
                  <div 
                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out transform ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                    style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
                  >
                      <div className="px-4 py-2 text-sm text-slate-700 border-b border-slate-100">
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.university}</p>
                      </div>
                      <a href="#" onMouseDown={(e) => { e.preventDefault(); onNavigate('dashboard'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Dashboard</a>
                      <a href="#" onMouseDown={(e) => { e.preventDefault(); onNavigate('settings'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Settings</a>
                      <a href="#" onMouseDown={(e) => { e.preventDefault(); onLogoutClick(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</a>
                    </div>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                 <button onClick={onLoginClick} className="font-semibold text-slate-600 hover:text-brand-primary transition px-4 py-2">
                  Login
                </button>
                <button onClick={onLoginClick} className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-sky-600 transition font-semibold shadow hover:shadow-md transform hover:scale-105">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;