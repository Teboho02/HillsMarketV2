import React from 'react';
import type { User, Product } from '../types';

interface DashboardProps {
  currentUser: User;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onEditListing: (product: Product) => void;
}

const MyListings: React.FC<Pick<DashboardProps, 'currentUser' | 'products' | 'setProducts'> & { onEdit: (product: Product) => void; }> = ({ currentUser, products, setProducts, onEdit }) => {
  const userProducts = products.filter(p => p.sellerId === currentUser.id);

  const handleDelete = (productId: number) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="space-y-4">
      {userProducts.length > 0 ? (
        userProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:border-slate-300">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <img src={product.imageUrls[0]} alt={product.title} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{product.title}</h3>
                <p className="text-sm text-brand-primary font-bold">R{product.price}</p>
                <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-1">{product.category}</p>
              </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0 ml-4">
              <button onClick={() => onEdit(product)} className="p-2 text-slate-500 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition" aria-label="Edit listing">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition" aria-label="Delete listing">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 px-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-700">You have no active listings.</h2>
            <p className="text-slate-500 mt-2">Click "Sell" in the navbar to post an item!</p>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ currentUser, products, setProducts, onEditListing }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-6 mb-8">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-24 w-24 rounded-full border-4 border-white shadow-lg" />
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-800">{currentUser.name}</h1>
          <p className="text-slate-600 mt-1">{currentUser.university}</p>
        </div>
      </div>
       <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">My Inventory</h2>
      <MyListings currentUser={currentUser} products={products} setProducts={setProducts} onEdit={onEditListing} />
    </div>
  );
};

export default Dashboard;