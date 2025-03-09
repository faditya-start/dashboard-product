import React from 'react';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold text-gray-900">Welcome to Dashboard Product</h1>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg p-6">
                    <div className="flex justify-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 