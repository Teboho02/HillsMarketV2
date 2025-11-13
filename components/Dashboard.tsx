import React, { useState } from 'react';
import type { User, Product } from '../types';
import ConfirmModal from './ConfirmModal';

interface DashboardProps {
  currentUser: User;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onEditListing: (product: Product) => void;
}

const MyListings: React.FC<Pick<DashboardProps, 'currentUser' | 'products' | 'setProducts'> & { onEdit: (product: Product) => void; }> = ({ currentUser, products, setProducts, onEdit }) => {
  const userProducts = products.filter(p => p.sellerId === currentUser.id);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete !== null) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleToggleSold = (productId: number) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, isSold: !p.isSold } : p
    ));
  };

  return (
    <>
      <div className="space-y-4">
        {userProducts.length > 0 ? (
          userProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:border-slate-300">
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <img src={product.imageUrls[0]} alt={product.title} className={`w-20 h-20 object-cover rounded-lg ${product.isSold ? 'grayscale' : ''}`} />
                  {product.isSold && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">SOLD</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-800 truncate">{product.title}</h3>
                  <p className="text-sm text-brand-primary font-bold">R{product.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block">{product.category}</p>
                    {product.isSold && (
                      <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full inline-block font-medium">
                        Marked as Sold
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 flex-shrink-0 ml-4">
                <button
                  onClick={() => handleToggleSold(product.id)}
                  className={`p-2 rounded-lg transition ${product.isSold ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'}`}
                  aria-label={product.isSold ? 'Mark as available' : 'Mark as sold'}
                  title={product.isSold ? 'Mark as available' : 'Mark as sold'}
                >
                  {product.isSold ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button onClick={() => onEdit(product)} className="p-2 text-slate-500 hover:text-brand-primary hover:bg-slate-100 rounded-lg transition" aria-label="Edit listing">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                </button>
                <button onClick={() => handleDeleteClick(product.id)} className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition" aria-label="Delete listing">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <svg className="mx-auto h-16 w-16 text-slate-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h2 className="text-xl font-semibold text-slate-700">You have no active listings.</h2>
            <p className="text-slate-500 mt-2">Click "Sell" in the navbar to post an item!</p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
        type="danger"
      />
    </>
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
