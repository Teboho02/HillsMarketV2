import React, { useState, useEffect } from 'react';
import type { Product, User, ItemCondition } from '../types';
import { CATEGORIES, UNIVERSITIES, CONDITIONS } from '../constants';

interface ListingFormPageProps {
  onCancel: () => void;
  onSubmit: (newProduct: Omit<Product, 'id' | 'sellerId'>, editingProductId: number | null) => void;
  productToEdit?: Product | null;
  currentUser: User | null;
}

const ListingFormPage: React.FC<ListingFormPageProps> = ({ onCancel, onSubmit, productToEdit, currentUser }) => {
  const isEditing = !!productToEdit;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [condition, setCondition] = useState<ItemCondition>(CONDITIONS[0]);
  const [university, setUniversity] = useState(currentUser?.university || UNIVERSITIES[0]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && productToEdit) {
      setTitle(productToEdit.title);
      setDescription(productToEdit.description);
      setPrice(String(productToEdit.price));
      setCategory(productToEdit.category);
      setCondition(productToEdit.condition);
      setUniversity(productToEdit.university);
      setImagePreview(productToEdit.imageUrls[0]);
    }
  }, [isEditing, productToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category || !university || !condition) return;
    
    // In a real app, you'd handle file uploads properly.
    // Here we just use the preview or a placeholder.
    const imageUrls = [imagePreview || `https://picsum.photos/seed/${Math.random()}/600/400`];

    onSubmit({
      title,
      description,
      price: Number(price),
      category,
      condition,
      university,
      imageUrls,
    }, isEditing ? productToEdit.id : null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
        <h1 className="text-4xl font-display font-bold text-slate-800 mb-6">
            {isEditing ? 'Edit Your Listing' : 'Create a New Listing'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary text-lg p-2.5 text-slate-900" required placeholder="e.g. Advanced Calculus Textbook" />
            </div>
             <div>
              <label htmlFor="image" className="block text-sm font-medium text-slate-700">Image</label>
              <div className="mt-1 flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {imagePreview ? (
                     <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg shadow-sm border border-slate-200"/>
                  ) : (
                    <div className="h-32 w-32 bg-slate-100 rounded-lg flex items-center justify-center">
                        <svg className="h-16 w-16 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>
                  )}
                </div>
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white py-2 px-3 border border-slate-300 rounded-lg shadow-sm text-sm leading-4 font-medium text-slate-700 hover:bg-slate-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary">
                  <span>Change image</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" placeholder="Tell buyers about your item..."></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price</label>
                <div className="mt-1 relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">R</span>
                  </div>
                  <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="pl-7 block w-full border-slate-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" placeholder="0.00" required />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" required>
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="condition" className="block text-sm font-medium text-slate-700">Condition</label>
                <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value as ItemCondition)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" required>
                  {CONDITIONS.map(cond => <option key={cond}>{cond}</option>)}
                </select>
              </div>
            </div>
            <div>
                <label htmlFor="university" className="block text-sm font-medium text-slate-700">University</label>
                <select id="university" value={university} onChange={(e) => setUniversity(e.target.value)} className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary p-2.5 text-slate-900" required>
                  {UNIVERSITIES.map(uni => <option key={uni}>{uni}</option>)}
                </select>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t border-slate-200 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-brand-primary hover:bg-sky-600 transition">
                {isEditing ? 'Save Changes' : 'Post Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingFormPage;