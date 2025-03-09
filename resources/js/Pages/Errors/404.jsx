import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function NotFound() {
    return (
        <>
            <Head title="404 - Not Found" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-xl w-full text-center">
                    <div className="text-6xl font-bold text-indigo-600">404</div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
                    <p className="mt-4 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
                    <div className="mt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Go back home
                        </Link>
                    </div>
                    <div className="mt-12">
                        <img
                            src="https://illustrations.popsy.co/gray/crashed-error.svg"
                            alt="404 illustration"
                            className="mx-auto h-64"
                        />
                    </div>
                </div>
            </div>
        </>
    );
} 