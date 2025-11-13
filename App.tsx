import React, { useState, useMemo } from 'react';
import type { Product, User, View } from './types';
import { MOCK_PRODUCTS, UNIVERSITIES, CATEGORIES, CURRENT_USER_ID, MOCK_USERS } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import FilterSidebar, { type SortOption } from './components/FilterSidebar';
import Dashboard from './components/Dashboard';
import ListingFormPage from './components/NewListingModal'; // Repurposed from NewListingModal
import MessagesView from './components/MessagesView';
import LoginModal from './components/LoginModal';
import ProductDetail from './components/ProductDetail';
import LandingPage from './components/LandingPage';
import SettingsPage from './components/SettingsPage';
import { ToastContainer, type ToastType } from './components/Toast';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(null);

  const [universityFilter, setUniversityFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: ToastType }>>([]);
  const [toastIdCounter, setToastIdCounter] = useState(0);

  const showToast = (message: string, type: ToastType) => {
    const id = toastIdCounter;
    setToastIdCounter(prev => prev + 1);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleResetFilters = () => {
    setUniversityFilter('All');
    setCategoryFilter('All');
    setPriceRange(2000);
    setSearchTerm('');
    showToast('Filters reset successfully', 'info');
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const universityMatch = universityFilter === 'All' || product.university === universityFilter;
      const categoryMatch = categoryFilter === 'All' || product.category === categoryFilter;
      const priceMatch = product.price <= priceRange;
      const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return universityMatch && categoryMatch && priceMatch && searchMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'oldest':
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, universityFilter, categoryFilter, priceRange, searchTerm, sortBy]);
  
  const handleLogin = () => {
    const userToLogin = users.find(u => u.id === CURRENT_USER_ID)!;
    setCurrentUser(userToLogin);
    setShowLoginModal(false);
    showToast(`Welcome back, ${userToLogin.name}!`, 'success');
    if (postLoginAction) {
      postLoginAction();
      setPostLoginAction(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('browse');
    setSelectedProduct(null);
    setProductToEdit(null);
    showToast('Logged out successfully', 'info');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    setCurrentUser(updatedUser);
    showToast('Profile updated successfully', 'success');
  };

  const handleNavigate = (targetView: View) => {
    if (targetView === 'browse') {
      setSelectedProduct(null);
      setProductToEdit(null);
    }
    if ((targetView === 'dashboard' || targetView === 'messages' || targetView === 'createListing' || targetView === 'settings') && !currentUser) {
      setPostLoginAction(() => () => setView(targetView));
      setShowLoginModal(true);
    } else {
      setView(targetView);
    }
  };
  
  const handleSaveListing = (productData: Omit<Product, 'id' | 'sellerId'>, editingProductId: number | null) => {
    if (!currentUser) return;

    if (editingProductId) {
      // Update existing product
      setProducts(prev => prev.map(p =>
        p.id === editingProductId
          ? { ...p, ...productData, imageUrls: productData.imageUrls.length > 0 ? productData.imageUrls : p.imageUrls }
          : p
      ));
      showToast('Listing updated successfully!', 'success');
    } else {
      // Create new product
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [
        {
          ...productData,
          id: newId,
          sellerId: currentUser.id,
          isSold: false,
          createdAt: new Date().toISOString(),
        },
        ...prev
      ]);
      showToast('Listing created successfully!', 'success');
    }

    setView('dashboard');
    setProductToEdit(null);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('productDetail');
  };

  const handleEditListing = (product: Product) => {
    setProductToEdit(product);
    setView('editListing');
  };

  const renderContent = () => {
    switch (view) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} products={products.slice(0, 4)} onProductSelect={handleProductSelect} />;
      case 'dashboard':
        return currentUser ? <Dashboard currentUser={currentUser} products={products} setProducts={setProducts} onEditListing={handleEditListing} /> : null;
      case 'messages':
        return currentUser ? <MessagesView currentUser={currentUser} /> : null;
       case 'settings':
        return currentUser ? <SettingsPage currentUser={currentUser} onUpdateUser={handleUpdateUser} /> : null;
      case 'createListing':
        return <ListingFormPage onCancel={() => handleNavigate('browse')} onSubmit={handleSaveListing} currentUser={currentUser} />;
      case 'editListing':
        return <ListingFormPage onCancel={() => handleNavigate('dashboard')} onSubmit={handleSaveListing} productToEdit={productToEdit} currentUser={currentUser} />;
      case 'productDetail': {
        if (!selectedProduct) return null;
        const seller = users.find(u => u.id === selectedProduct.sellerId);
        if (!seller) return <p>Seller not found</p>;
        return (
          <ProductDetail
            product={selectedProduct}
            seller={seller}
            onBack={() => handleNavigate('browse')}
            onMessageSeller={() => handleNavigate('messages')}
          />
        );
      }
      case 'browse':
      default:
        return (
          <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <FilterSidebar
              universities={UNIVERSITIES}
              categories={CATEGORIES}
              universityFilter={universityFilter}
              setUniversityFilter={setUniversityFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onResetFilters={handleResetFilters}
            />
            <main className="flex-1">
              <h1 className="text-4xl font-display font-bold text-slate-800 mb-6">For Sale</h1>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onSelect={handleProductSelect} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <svg className="mx-auto h-16 w-16 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <h2 className="mt-4 text-xl font-semibold text-slate-700">No products found</h2>
                    <p className="text-slate-500 mt-2">Try adjusting your filters or search term!</p>
                </div>
              )}
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar
        currentUser={currentUser}
        currentView={view}
        onNavigate={handleNavigate}
        onSellClick={() => handleNavigate('createListing')}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div key={view} className="animate-fade-in">
        {renderContent()}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

export default App;