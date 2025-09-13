import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AffiliateHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-gray-200">
      <div className="flex items-center">
        {/* Can be dynamic later */}
      </div>
      <div className="flex items-center">
        {user ? (
          <>
            <div className="relative">
              <button className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                <img className="object-cover w-full h-full" src={`https://picsum.photos/seed/${user.id}/100`} alt="Affiliate avatar" />
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

export default AffiliateHeader;