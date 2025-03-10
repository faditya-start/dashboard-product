import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 overflow-y-auto transition duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-center mt-8">
                    <div className="flex items-center">
                        <span className="text-white text-2xl mx-2 font-semibold">Dashboard</span>
                    </div>
                </div>

                <nav className="mt-10">
                    <Link
                        className="flex items-center px-6 py-2 mt-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="/dashboard"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                        </svg>
                        <span className="mx-3">Dashboard</span>
                    </Link>

                    <Link
                        className="flex items-center px-6 py-2 mt-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="/products"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                        </svg>
                        <span className="mx-3">Products</span>
                    </Link>

                    <Link
                        className="flex items-center px-6 py-2 mt-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="/users"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <span className="mx-3">Users</span>
                    </Link>

                    <Link
                        className="flex items-center px-6 py-2 mt-4 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="/settings"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="mx-3">Settings</span>
                    </Link>
                </nav>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col lg:pl-64">
                {/* Top navbar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <h1 className="text-2xl font-semibold text-gray-900 my-auto">{title}</h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 