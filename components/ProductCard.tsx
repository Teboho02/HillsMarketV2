import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <button onClick={() => onSelect(product)} className="text-left w-full bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-slate-200/80">
      <div className="relative">
        <img src={product.imageUrls[0]} alt={product.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        <div className="absolute bottom-2 left-3 bg-brand-primary/90 backdrop-blur-sm text-white font-bold px-3 py-1 rounded-full text-sm shadow-md">
          R{product.price}
        </div>
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-slate-700 font-medium px-2.5 py-1 rounded-full text-xs">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 truncate transition-colors duration-300 group-hover:text-brand-primary">{product.title}</h3>
        <div className="flex items-center mt-2 text-xs text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          <span className="truncate">{product.university}</span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;