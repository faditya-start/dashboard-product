import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        image: null,
        status: 'In Stock'
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products', {
            onSuccess: () => {
                reset();
                setImagePreview(null);
            }
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AdminLayout title="Add New Product">
            <Head title="Add New Product" />

            <div className="py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Add New Product</h2>
                            <p className="mt-1 text-sm text-gray-500">Fill in the details below to create a new product.</p>
                        </div>
                        <button
                            onClick={() => window.history.back()}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Products
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Basic Information Section */}
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-6">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                                                Product Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                    errors.name 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                }`}
                                                required
                                            />
                                            {errors.name && (
                                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="sku" className="block text-base font-medium text-gray-700 mb-2">
                                                SKU <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="sku"
                                                value={data.sku}
                                                onChange={e => setData('sku', e.target.value)}
                                                className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                    errors.sku 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                }`}
                                                required
                                            />
                                            {errors.sku && (
                                                <p className="mt-2 text-sm text-red-600">{errors.sku}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="category" className="block text-base font-medium text-gray-700 mb-2">
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="category"
                                                value={data.category}
                                                onChange={e => setData('category', e.target.value)}
                                                className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                    errors.category 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                }`}
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Books">Books</option>
                                                <option value="Home & Garden">Home & Garden</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Beauty">Beauty</option>
                                                <option value="Food">Food</option>
                                            </select>
                                            {errors.category && (
                                                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-base font-medium text-gray-700 mb-2">
                                                Status <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                                className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                    errors.status 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                }`}
                                                required
                                            >
                                                <option value="In Stock">In Stock</option>
                                                <option value="Out of Stock">Out of Stock</option>
                                            </select>
                                            {errors.status && (
                                                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing and Stock Section */}
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-6">Pricing & Stock</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label htmlFor="price" className="block text-base font-medium text-gray-700 mb-2">
                                                Price <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 text-base">$</span>
                                                </div>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    value={data.price}
                                                    onChange={e => setData('price', e.target.value)}
                                                    className={`block w-full pl-8 rounded-md text-base py-3 px-4 ${
                                                        errors.price 
                                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                    }`}
                                                    required
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </div>
                                            {errors.price && (
                                                <p className="mt-2 text-sm text-red-600">{errors.price}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="stock" className="block text-base font-medium text-gray-700 mb-2">
                                                Stock <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                id="stock"
                                                value={data.stock}
                                                onChange={e => setData('stock', e.target.value)}
                                                className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                    errors.stock 
                                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                                }`}
                                                required
                                                min="0"
                                            />
                                            {errors.stock && (
                                                <p className="mt-2 text-sm text-red-600">{errors.stock}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Product Image Section */}
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-6">Product Image</h3>
                                    <div className="mt-2 flex justify-center px-8 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-4 text-center">
                                            <div
                                                className={`relative h-40 w-40 mx-auto rounded-lg overflow-hidden ${
                                                    isDragging ? 'border-2 border-indigo-500' : ''
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                {imagePreview ? (
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-gray-50">
                                                        <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex text-base text-gray-600">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="image-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="pl-2">or drag and drop</p>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                PNG, JPG, GIF up to 2MB
                                            </p>
                                        </div>
                                    </div>
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600">{errors.image}</p>
                                    )}
                                </div>

                                {/* Description Section */}
                                <div>
                                    <h3 className="text-xl font-medium text-gray-900 mb-6">Description</h3>
                                    <div>
                                        <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-2">
                                            Product Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={6}
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            className={`block w-full rounded-md shadow-sm text-base py-3 px-4 ${
                                                errors.description 
                                                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                            }`}
                                        />
                                        {errors.description && (
                                            <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Product'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 