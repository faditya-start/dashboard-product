import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const stats = [
        { name: 'Total Products', stat: '71,897', icon: '📦' },
        { name: 'Total Sales', stat: '$12,423', icon: '💰' },
        { name: 'Active Users', stat: '891', icon: '👥' },
        { name: 'Conversion Rate', stat: '24.57%', icon: '📈' }
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            
            <div className="mt-4">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-3xl">{item.icon}</span>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                {item.name}
                                            </dt>
                                            <dd className="flex items-baseline">
                                                <div className="text-2xl font-semibold text-gray-900">
                                                    {item.stat}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity & Charts */}
                <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Recent Activity
                            </h3>
                            <div className="mt-5">
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        <li className="relative pb-8">
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div>
                                                        <div className="text-sm text-gray-500">
                                                            <a href="#" className="font-medium text-gray-900">New order</a> received from <a href="#" className="font-medium text-gray-900">John Doe</a>
                                                        </div>
                                                        <p className="mt-0.5 text-sm text-gray-500">
                                                            2 minutes ago
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Add more activity items here */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Quick Actions
                            </h3>
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Add New Product
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                                    Create Invoice
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
                                    View Reports
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
                                    Manage Users
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 