import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const stats = [
        { name: 'Total Products', value: '148', change: '+12.5%', changeType: 'increase' },
        { name: 'Total Sales', value: '$12,423', change: '+15.2%', changeType: 'increase' },
        { name: 'Active Users', value: '891', change: '+3.2%', changeType: 'increase' },
        { name: 'Conversion Rate', value: '24.57%', change: '-2.3%', changeType: 'decrease' },
    ];

    const recentActivity = [
        { id: 1, type: 'sale', description: 'New order #1234 from John Doe', time: '2 minutes ago' },
        { id: 2, type: 'product', description: 'Product "iPhone 13" stock updated', time: '5 minutes ago' },
        { id: 3, type: 'user', description: 'New user registration: jane@example.com', time: '10 minutes ago' },
        { id: 4, type: 'sale', description: 'New order #1235 from Jane Smith', time: '15 minutes ago' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            
            <div className="mt-4 sm:mt-6 lg:mt-8">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {stats.map((item) => (
                        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                            <div className="p-4 sm:p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-md flex items-center justify-center ${
                                            item.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                            {item.changeType === 'increase' ? (
                                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-4 sm:ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {item.name}
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                                                    {item.value}
                                                </div>
                                                <div className={`ml-2 flex items-baseline text-xs sm:text-sm font-semibold ${
                                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {item.change}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900">
                                Recent Activity
                            </h3>
                            <div className="mt-4 sm:mt-5">
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        {recentActivity.map((item, itemIdx) => (
                                            <li key={item.id}>
                                                <div className="relative pb-8">
                                                    {itemIdx !== recentActivity.length - 1 ? (
                                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                                    ) : null}
                                                    <div className="relative flex items-start space-x-3">
                                                        <div className="relative">
                                                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                                                item.type === 'sale' ? 'bg-green-500' :
                                                                item.type === 'product' ? 'bg-blue-500' : 'bg-yellow-500'
                                                            }`}>
                                                                {item.type === 'sale' ? (
                                                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                                    </svg>
                                                                ) : item.type === 'product' ? (
                                                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-sm text-gray-500">
                                                                {item.description}
                                                                <span className="whitespace-nowrap text-gray-400 text-xs sm:text-sm ml-2">
                                                                    {item.time}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900">
                                Quick Actions
                            </h3>
                            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-150"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="whitespace-nowrap">Add Product</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-150"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="whitespace-nowrap">New Invoice</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-150"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <span className="whitespace-nowrap">Reports</span>
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors duration-150"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="whitespace-nowrap">Users</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 