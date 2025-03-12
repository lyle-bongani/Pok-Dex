import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
                <div className="animate-spin-slow w-20 h-20 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                        <circle cx="50" cy="50" r="45" fill="white" />
                        <path d="M5 50h90" stroke="black" strokeWidth="10" />
                        <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="10" />
                        <circle cx="50" cy="50" r="8" fill="white" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner; 