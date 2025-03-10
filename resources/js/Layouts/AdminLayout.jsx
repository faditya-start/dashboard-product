import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const isCurrentRoute = (path) => {
        return url.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0">
                <div className={`flex flex-col h-full ${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-500 ease-in-out bg-[#6366f1]`}>
                    <div className="flex flex-col h-full">
                        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                            {/* Logo and Toggle in Nav */}
                            <div className="flex items-center h-16 mb-6">
                                <div className="flex items-center min-w-0">
                                    <svg className="h-8 w-8 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13.5 2C13.5 2.27614 13.2761 2.5 13 2.5L11 2.5C10.7239 2.5 10.5 2.27614 10.5 2C10.5 1.72386 10.7239 1.5 11 1.5L13 1.5C13.2761 1.5 13.5 1.72386 13.5 2ZM9.73438 3.24219C9.89062 3.08594 10.1094 3 10.3438 3L13.6562 3C13.8906 3 14.1094 3.08594 14.2656 3.24219L15.7578 4.73438C15.9141 4.89062 16 5.10938 16 5.34375L16 7L8 7L8 5.34375C8 5.10938 8.08594 4.89062 8.24219 4.73438L9.73438 3.24219ZM3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V8Z"/>
                                    </svg>
                                    {!isSidebarCollapsed && (
                                        <span className="ml-3 text-lg font-semibold text-white truncate">Dashboard</span>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Items */}
                            {[
                                {
                                    name: 'Dashboard',
                                    href: '/dashboard',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Products',
                                    href: '/products',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Orders',
                                    href: '/orders',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Customers',
                                    href: '/customers',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    name: 'Reports',
                                    href: '/reports',
                                    icon: (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    )
                                }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isCurrentRoute(item.href)
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                                    }`}
                                >
                                    <span className={`flex items-center justify-center w-5 h-5 mr-3 ${
                                        isCurrentRoute(item.href) 
                                            ? 'text-white' 
                                            : 'text-indigo-100 group-hover:text-white'
                                    }`}>
                                        {item.icon}
                                    </span>
                                    {!isSidebarCollapsed && (
                                        <span className="truncate">{item.name}</span>
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>

                <div className={`fixed inset-y-0 left-0 flex flex-col w-64 h-full bg-[#6366f1] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between h-16 px-4 bg-[#6366f1] border-b border-indigo-700">
                        <div className="flex items-center">
                            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.5 2C13.5 2.27614 13.2761 2.5 13 2.5L11 2.5C10.7239 2.5 10.5 2.27614 10.5 2C10.5 1.72386 10.7239 1.5 11 1.5L13 1.5C13.2761 1.5 13.5 1.72386 13.5 2ZM9.73438 3.24219C9.89062 3.08594 10.1094 3 10.3438 3L13.6562 3C13.8906 3 14.1094 3.08594 14.2656 3.24219L15.7578 4.73438C15.9141 4.89062 16 5.10938 16 5.34375L16 7L8 7L8 5.34375C8 5.10938 8.08594 4.89062 8.24219 4.73438L9.73438 3.24219ZM3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V8Z"/>
                            </svg>
                            <span className="ml-3 text-lg font-semibold text-white">Dashboard</span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-md text-indigo-100 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {[
                            {
                                name: 'Dashboard',
                                href: '/dashboard',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                )
                            },
                            {
                                name: 'Products',
                                href: '/products',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                )
                            },
                            {
                                name: 'Orders',
                                href: '/orders',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                )
                            },
                            {
                                name: 'Customers',
                                href: '/customers',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                name: 'Reports',
                                href: '/reports',
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                                    isCurrentRoute(item.href)
                                        ? 'bg-indigo-700 text-white'
                                        : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
                                }`}
                            >
                                <span className={`flex items-center justify-center w-5 h-5 mr-3 ${
                                    isCurrentRoute(item.href) 
                                        ? 'text-white' 
                                        : 'text-indigo-100 group-hover:text-white'
                                }`}>
                                    {item.icon}
                                </span>
                                <span className="truncate">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className={`flex flex-col transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
                {/* Top navigation */}
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
                    <button
                        type="button"
                        className="px-4 text-gray-500 focus:outline-none lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex-1 px-4 flex items-center justify-between">
                        <button
                            type="button"
                            className="hidden lg:flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none transition-all duration-500 ease-in-out"
                            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        >
                            <span className="sr-only">Toggle sidebar</span>
                            <svg className={`h-6 w-6 transform transition-transform duration-500 ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Profile dropdown */}
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    type="button"
                                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    id="user-menu-button"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                            </div>

                            {/* Profile dropdown menu */}
                            <div
                                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                                    isProfileOpen ? 'block' : 'hidden'
                                }`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    role="menuitem"
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    role="menuitem"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    role="menuitem"
                                >
                                    Sign out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
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