import React, { useState } from 'react';
import type { Product, User } from '../types';

interface ProductDetailProps {
  product: Product;
  seller: User;
  onBack: () => void;
  onMessageSeller: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, seller, onBack, onMessageSeller }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === product.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 hover:text-brand-primary font-semibold mb-6 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>Back to listings</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="p-4 sm:p-6">
            <div className="relative group aspect-w-1 aspect-h-1">
              <img key={currentIndex} src={product.imageUrls[currentIndex]} alt={`${product.title} image ${currentIndex + 1}`} className="w-full h-full object-cover rounded-xl shadow-md animate-fade-in" style={{animationDuration: '0.3s'}} />
              
              {product.imageUrls.length > 1 && (
                <>
                  <button 
                    onClick={goToPrevious} 
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 backdrop-blur-sm hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={goToNext} 
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 backdrop-blur-sm hover:bg-white text-slate-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.imageUrls.map((url, index) => (
                  <button key={index} onClick={() => setCurrentIndex(index)} className={`w-20 h-20 rounded-lg overflow-hidden ring-2 ring-offset-2 transition-all duration-200 ${currentIndex === index ? 'ring-brand-primary' : 'ring-transparent'}`}>
                    <img src={url} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">{product.category}</span>
                <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">{product.condition}</span>
              </div>
              <h1 className="text-4xl font-display font-bold text-slate-800 break-words">{product.title}</h1>
              <p className="text-4xl font-display font-extrabold text-brand-primary my-4">R{product.price}</p>
              <div className="text-slate-600 space-y-4 leading-relaxed">
                <p className="break-words">{product.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl">
                <h3 className="font-semibold text-slate-700 mb-3">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <img src={seller.avatarUrl} alt={seller.name} className="h-14 w-14 rounded-full" />
                  <div>
                    <p className="font-bold text-slate-800">{seller.name}</p>
                    <p className="text-sm text-slate-500">{seller.university}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={onMessageSeller}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-secondary text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold text-lg shadow hover:shadow-md transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Message Seller</span>
                </button>
                {seller.phoneNumber && (
                   <a
                    href={`https://wa.me/${seller.phoneNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-3 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow hover:shadow-md transform hover:scale-105"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.383 1.803 6.246l-.422 1.545 1.582-.41z"/>
                     </svg>
                    <span>Contact on WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;