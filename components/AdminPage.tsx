import React, { useState, useEffect } from 'react';
import type { User } from '../types';

interface AdminUser extends User {
  email?: string;
  created_at?: string;
}

interface AdminProduct {
  id: number;
  title: string;
  price: number;
  seller_name: string;
  seller_email: string;
  university: string;
  created_at: string;
}

interface Statistics {
  total_users: number;
  total_products: number;
  total_conversations: number;
  total_messages: number;
  admin_count: number;
  avg_product_price: number;
  recent_users: number;
  recent_products: number;
}

interface AdminPageProps {
  currentUser: User;
  onBack: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ currentUser, onBack }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'products'>('stats');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock API calls - replace with actual API calls later
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'stats') {
        setStatistics({
          total_users: 45,
          total_products: 123,
          total_conversations: 78,
          total_messages: 456,
          admin_count: 2,
          avg_product_price: 245.50,
          recent_users: 12,
          recent_products: 34,
        });
      } else if (activeTab === 'users') {
        // Mock users data
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', university: 'UCT', avatarUrl: '', role: 'user', created_at: '2024-01-15' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', university: 'Wits', avatarUrl: '', role: 'admin', created_at: '2024-01-10' },
        ]);
      } else if (activeTab === 'products') {
        // Mock products data
        setProducts([
          { id: 1, title: 'Laptop', price: 500, seller_name: 'John Doe', seller_email: 'john@example.com', university: 'UCT', created_at: '2024-02-20' },
          { id: 2, title: 'Textbook', price: 50, seller_name: 'Jane Smith', seller_email: 'jane@example.com', university: 'Wits', created_at: '2024-02-18' },
        ]);
      }
      setLoading(false);
    }, 500);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
      // TODO: Call API to delete user
    }
  };

  const handleToggleUserRole = (userId: number) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'admin' ? 'user' : 'admin' };
      }
      return u;
    }));
    // TODO: Call API to update user role
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      // TODO: Call API to delete product
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-4xl font-display font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage users, products, and view statistics</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Products
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'stats' && statistics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={statistics.total_users} icon="👥" />
                <StatCard title="Total Products" value={statistics.total_products} icon="📦" />
                <StatCard title="Conversations" value={statistics.total_conversations} icon="💬" />
                <StatCard title="Messages" value={statistics.total_messages} icon="📨" />
                <StatCard title="Admins" value={statistics.admin_count} icon="🔐" />
                <StatCard title="Avg Product Price" value={`R ${statistics.avg_product_price.toFixed(2)}`} icon="💰" />
                <StatCard title="New Users (7d)" value={statistics.recent_users} icon="✨" />
                <StatCard title="New Products (7d)" value={statistics.recent_products} icon="🆕" />
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{user.university}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {user.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleToggleUserRole(user.id)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Toggle Role
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={user.id === currentUser.id}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Seller</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">University</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">{product.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">R {product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{product.seller_name}</div>
                          <div className="text-xs text-slate-500">{product.seller_email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">{product.university}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {product.created_at}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default AdminPage;
