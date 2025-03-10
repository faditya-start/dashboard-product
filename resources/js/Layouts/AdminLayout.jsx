import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )},
        { name: 'Products', href: '/products', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        )},
        { name: 'Orders', href: '/orders', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        )},
        { name: 'Reports', href: '/reports', icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )},
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar for mobile */}
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`} role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
                
 i                <div className="relative flex flex-col max-w-xs w-[280px] h-full bg-indigo-900 transition ease-in-out duration-300">
                    <div className="absolute top-0 right-0 -mr-12 pt-4">
                        <button
                            type="button"
                            className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex-shrink-0">
                                <span className="text-xl font-bold text-white">Dashboard</span>
                            </div>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center px-3 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-800 transition-colors duration-150"
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className={`hidden lg:flex ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'} lg:flex-col lg:fixed lg:inset-y-0 transition-all duration-300`}>
                <div className="flex-1 flex flex-col min-h-0 bg-indigo-700">
                    <div className="flex items-center justify-between h-16 px-4 bg-indigo-900">
                        <div className={`flex-shrink-0 ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                            <span className="text-xl font-bold text-white">Dashboard</span>
                        </div>
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-1 rounded-lg text-indigo-200 hover:bg-indigo-800 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2 text-sm font-medium rounded-md text-white hover:bg-indigo-800`}
                                >
                                    <div className="flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className={`flex flex-col flex-1 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} transition-all duration-300`}>
                {/* Top navigation */}
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex items-center">
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 truncate">{title}</h1>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="max-w-xs bg-gray-100 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500">
                                        <span className="text-sm font-medium leading-none text-white">U</span>
                                    </span>
                                </button>

                                {/* Dropdown menu */}
                                {profileDropdownOpen && (
                                    <div 
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Your Profile
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Settings
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 overflow-x-hidden">
                    <div className="py-4 sm:py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 