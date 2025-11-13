import React from 'react';
import type { View, Product } from '../types';
import ProductCard from './ProductCard';

// Fix: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode, delay: number }> = ({ icon, title, children, delay }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-light mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{children}</p>
  </div>
);

// Fix: Defined the missing LandingPageProps interface.
interface LandingPageProps {
  onNavigate: (view: View) => void;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, products, onProductSelect }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-light/50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight">
            The <span className="text-brand-primary">Student</span> Marketplace
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
            Buy and sell textbooks, electronics, furniture, and more—right here at your university.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('browse')}
              className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-sky-600 transition font-semibold text-lg shadow hover:shadow-lg transform hover:scale-105"
            >
              Start Browsing
            </button>
            <button
              onClick={() => onNavigate('createListing')}
              className="bg-white text-slate-700 px-8 py-3 rounded-full hover:bg-slate-100 transition font-semibold text-lg shadow hover:shadow-lg transform hover:scale-105 border border-slate-300"
            >
              Sell Your Stuff
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-slate-800 text-center mb-10">Latest Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
               <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} onSelect={onProductSelect} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 sm:py-20 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-slate-800">Why Hiils Market?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-md text-slate-600">
              A simple, safe, and smart way to trade within your campus community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              delay={0}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>}
              title="Sell with Ease"
            >
              Got stuff you don't need? List it in minutes and turn your clutter into cash. It's free and simple to advertise your products.
            </FeatureCard>
            <FeatureCard
              delay={150}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
              title="Shop Smart"
            >
              Find great deals on essentials from fellow students. From textbooks to mini-fridges, discover what you need without breaking the bank.
            </FeatureCard>
            <FeatureCard
              delay={300}
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
              title="Connect Safely"
            >
              Connect with students from your university. Arrange safe, on-campus meetups to exchange your items.
            </FeatureCard>
          </div>
        </div>
      </section>
      
       <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Hiils Market. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;