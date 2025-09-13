import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex-shrink-0">
        <h2 className="text-2xl font-semibold text-gray-800">System Administration</h2>
      </div>

      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-lg">
          <input
            aria-label="Search admin functions"
            type="search"
            placeholder="Search users, integrations, etc."
            className="w-full pl-10 pr-4 py-2 border rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green-light"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-shrink-0">
        {user ? (
          <>
            <div className="relative">
              <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                <img className="object-cover w-full h-full" src={`https://picsum.photos/seed/${user.id}/100`} alt="Admin avatar" />
              </button>
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-700">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="ml-6 text-sm font-semibold text-gray-500 hover:text-brand-green-dark focus:outline-none transition-colors"
              aria-label="Logout"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
