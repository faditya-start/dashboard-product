import React from 'react';

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator">
            <div className="loading-bar">
                <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-loading-bar"></div>
            </div>
            <div className="loading-spinner">
                <div className="flex items-center justify-center">
                    <div className="spinner"></div>
                    <span className="ml-2 text-sm font-medium text-gray-700">Loading...</span>
                </div>
            </div>
        </div>
    );
} 