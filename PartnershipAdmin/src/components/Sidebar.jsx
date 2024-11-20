import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100';
    };

    return (
        <div className="w-64 fixed top-0 left-0 h-screen bg-white border-r flex flex-col z-10">
            <div className="p-4">
                <h1 className="text-xl font-bold text-gray-800">Domain Manager</h1>
            </div>
            <nav className="mt-4 flex-grow">
                <Link
                    to="/add-domain"
                    className={`flex items-center px-4 py-2 ${isActive('/add-domain')}`}
                >
                    <span className="ml-2">Add Domain</span>
                </Link>
                <Link
                    to="/domains"
                    className={`flex items-center px-4 py-2 ${isActive('/domains')}`}
                >
                    <span className="ml-2">Domain List</span>
                </Link>
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;