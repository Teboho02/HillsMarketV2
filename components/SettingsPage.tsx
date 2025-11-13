import React, { useState } from 'react';
import type { User } from '../types';

interface SettingsPageProps {
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentUser, onUpdateUser }) => {
  const [phone, setPhone] = useState(currentUser.phoneNumber || '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // E.164 format regex: starts with '+', followed by digits.
    const e164Regex = /^\+\d{10,14}$/;

    if (phone && !e164Regex.test(phone)) {
      setError('Please use E.164 format (e.g., +27821234567).');
      setSaved(false);
      return;
    }

    setError(null);
    onUpdateUser({ ...currentUser, phoneNumber: phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">Account Information</h2>
            <form onSubmit={handleSave}>
                <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    <input 
                    type="text" 
                    id="name" 
                    value={currentUser.name}
                    className="mt-1 block w-full max-w-sm border-slate-300 rounded-lg shadow-sm bg-slate-100 p-2.5 text-slate-500 cursor-not-allowed" 
                    disabled
                    />
                </div>
                <div>
                    <label htmlFor="university" className="block text-sm font-medium text-slate-700">University</label>
                    <input 
                    type="text" 
                    id="university" 
                    value={currentUser.university}
                    className="mt-1 block w-full max-w-sm border-slate-300 rounded-lg shadow-sm bg-slate-100 p-2.5 text-slate-500 cursor-not-allowed" 
                    disabled
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <input 
                    type="tel" 
                    id="phone" 
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        if (error) setError(null);
                    }}
                    className="mt-1 block w-full max-w-sm border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" 
                    placeholder="+27821234567"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                    Use international format for WhatsApp contact (e.g., +27 for South Africa).
                    </p>
                    {error && (
                      <p className="mt-2 text-xs text-red-600">{error}</p>
                    )}
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-brand-primary hover:bg-sky-600 transition">
                    Save Changes
                    </button>
                    <span className={`text-sm font-medium text-green-600 transition-opacity duration-300 ${saved ? 'opacity-100' : 'opacity-0'}`}>
                        Saved successfully!
                    </span>
                </div>
                </div>
            </form>
        </div>
    </div>
  );
}

export default SettingsPage;